import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Toast } from 'toastify-react-native';

import AppText from '../AppText';
import AllGamesCardHeader from './AllGamesCardHeader';
import AllGamesPlayers from './AllGamesPlayers';
import colors from '../../config/colors';
import dayjs from 'dayjs';
import Icon from '../Icon';
import ListitemSeperator from '../ListitemSeperator';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';
import useAuth from '../../auth/useAuth';

const AllGamesCard = ({ game }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const editGame = () => {
    const userId = user.userId;
    const gameAdmin = game.game_manager_id;
    if (userId !== gameAdmin) {
      Toast.warn('Only game manager can edit the game');
      return;
    }
    navigation.navigate(routes.EDIT_GAME, { gameDetails: game, user });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={editGame}>
        <Icon
          name="pen"
          size={30}
          backgroundColor={colors.gold}
          iconColor={colors.AccentPurple}
        />
        <AppText style={styles.iconText}>Edit Game</AppText>
      </TouchableOpacity>

      <AppText style={styles.gameDetails}>
        {dayjs(game.created_at).format('DD/MM/YYYY')}
      </AppText>
      <AppText style={styles.gameDetails}>
        {dayjs(game.created_at).format('HH:mm')}-
        {dayjs(game.updated_at).format('HH:mm')}
      </AppText>
      <AppText style={styles.gameManager}>
        Game Manager:
        {game?.game_manager?.nickName}
      </AppText>
      {game.was_edited && (
        <AppText style={styles.edited}>
          Game was edited on {dayjs(game.updated_at).format('DD/MM/YYYY')}
        </AppText>
      )}
      {game.isOpen && <AppText style={styles.isOpen}>Live Game</AppText>}
      <FlatList
        data={game.user_games}
        keyExtractor={(item) => item.user_id.toString()}
        ListHeaderComponent={<AllGamesCardHeader />}
        renderItem={({ item }) => <AllGamesPlayers player={item} />}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: colors.AccentPurple,
  },
  edited: {
    width: '100%',
    textAlign: 'center',
    padding: 5,
    color: colors.secondary,
    fontSize: 12,
  },
  icon: {
    top: 10,
    position: 'absolute',
    zIndex: 1,
    right: 10,
  },
  iconText: {
    textAlign: 'center',
    color: colors.gold,
    fontSize: 8,
    justifyContent: 'center',
    right: 5,
  },

  isOpen: {
    width: '100%',
    textAlign: 'center',
    padding: 5,
    //flickering neon green
    color: colors.neonGReen,
    textShadowColor: colors.neonGReen,
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
  gameDetails: {
    width: '100%',
    textAlign: 'center',
    padding: 5,
    color: colors.surface,
    height: 40,
  },
  gameManager: {
    width: '100%',
    textAlign: 'center',
    color: colors.surface,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
});

export default AllGamesCard;
