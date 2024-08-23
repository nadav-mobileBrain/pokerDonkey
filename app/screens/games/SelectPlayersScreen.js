import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import gameApi from '../../api/game';
import HeaderText from '../../components/HeaderText';
import Container, { Toast } from 'toastify-react-native';
import HowToPlay from '../../components/HowToPlay';
import logger from '../../utility/logger';
import Screen from '../../components/Screen';
import PlayerInfo from '../../components/player/PlayerInfo';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import routes from '../../navigation/routes';

const SelectPlayersScreen = ({ route, navigation }) => {
  const leaguePlayers = route.params.leaguePlayers;

  const league = route.params.league;
  const { user } = useAuth();

  const gameAdminId = user.userId;
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const isFocused = useIsFocused(); // Add this line
  const [error, setError] = useState();
  const [unselectedPlayers, setUnselectedPlayers] = useState(leaguePlayers);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);
  const createNewGameApi = useApi(gameApi.newGame);

  useEffect(() => {
    if (isFocused) {
      const checkIfOpenGames = async () => {
        const result = await checkIfOpenGameExist.request(league.id);
        if (result.ok) {
          if (result.data) {
            navigation.navigate(routes.NEW_GAME, {
              game: result.data.game,
              gameDetails: result.data.gameDetails,
              league,
              userGames: result.data.userGames,
            });
          }
        }
      };
      checkIfOpenGames();
    }
  }, [isFocused]);

  const onSelectedPlayer = (player) => {
    const playerIndex = selectedPlayers.findIndex((p) => p.id === player.id);
    if (playerIndex === -1) {
      setSelectedPlayers([...selectedPlayers, player]);
      setUnselectedPlayers(unselectedPlayers.filter((p) => p.id !== player.id));
    } else {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(playerIndex, 1);
      setSelectedPlayers(updatedPlayers);
      setUnselectedPlayers([...unselectedPlayers, player]);
    }
  };

  const startNewGame = async () => {
    if (selectedPlayers.length < 3) {
      Toast.error('At least 3 players to start a game');
      return;
    }
    const result = await createNewGameApi.request({
      selectedPlayers,
      leagueId: league.id,
      gameAdminId,
    });

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occurred.');
        logger.log(result);
      }
      return;
    }

    navigation.navigate(routes.NEW_GAME, {
      game: result.data.game,
      gameDetails: result.data.gameDetails,
      league,
      userGames: result.data.userGames,
    });
  };

  return (
    <Screen style={styles.container}>
      <Container position="top" width="100%" />
      <View style={styles.selectContainer}>
        <HeaderText style={styles.title}> Select Players </HeaderText>
        <HowToPlay navigation={navigation} textColor="PrimaryBlue" />
        {error && <AppText>{error}</AppText>}
        {unselectedPlayers.length > 0 && (
          <AppText style={styles.addRemove}>
            *Press on a player to add to the game
          </AppText>
        )}

        <PlayerInfo
          leaguePlayers={unselectedPlayers}
          onPress={onSelectedPlayer}
          width={40}
          height={40}
        />
        {selectedPlayers.length > 0 && (
          <View style={styles.selectedPlayersContainer}>
            <AppText style={styles.inTheGame}> In The Game </AppText>
            <AppText style={styles.addRemove}>
              *Press on a player to remove from the game
            </AppText>
            <AppText>{selectedPlayers.length} Players</AppText>
            <PlayerInfo
              leaguePlayers={selectedPlayers}
              onPress={onSelectedPlayer}
              width={40}
              height={40}
              borderColor="LimeGreen"
            />

            <AppButton
              title="Start New Game"
              color="LimeGreen"
              icon="cards-playing-club-multiple-outline"
              onPress={() => startNewGame()}
            />
          </View>
        )}
        {selectedPlayers.length < 1 && (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/selectPlayers.png')}
              style={styles.image}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  addRemove: {
    fontSize: 15,
  },
  container: {
    backgroundColor: colors.AccentPurple,
  },
  inTheGame: {
    color: colors.LimeGreen,
    fontSize: 30,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    flex: 1,
  },
  selectedPlayersContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  selectContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    margin: 10,
  },
  title: {
    color: colors.AccentPurple,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default SelectPlayersScreen;
