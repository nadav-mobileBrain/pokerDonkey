import React from 'react';
import { ImageBackground, FlatList, View, StyleSheet } from 'react-native';

import AppText from '../../components/AppText';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import HeaderText from '../../components/HeaderText';
import PersonalStatsGamesHeader from '../../components/stats/PersonalStatsGamesHeader';
import PersonalStatsGamesDetails from '../../components/stats/PersonalStatsGamesDetails';
import ListitemSeperator from '../../components/ListitemSeperator';

const PersonalStatsGamesList = ({ route }) => {
  const personalStats = route.params.personalStats;
  return (
    <Screen style={styles.screen}>
      <ImageBackground
        source={require('../../assets/personalDonkey.jpeg')}
        style={styles.background}
        blurRadius={5}
      >
        <View style={styles.overlay} />
        <HeaderText style={{ color: 'gold' }}>Personal Game History</HeaderText>
        {personalStats?.games?.length > 0 && (
          <>
            <AppText style={styles.rank}>G.rank = rank in this game</AppText>
            <AppText style={styles.rank}>
              S.rank = total season rank on this date
            </AppText>
            <View style={styles.detailsContainer}>
              <PersonalStatsGamesHeader />
              <FlatList
                data={personalStats.games}
                keyExtractor={(game) => game.id.toString()}
                renderItem={({ item, index }) => (
                  <PersonalStatsGamesDetails game={item} index={index} />
                )}
                ItemSeparatorComponent={ListitemSeperator}
              />
            </View>
          </>
        )}
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  background: {
    flex: 1,
    padding: 5,
  },
  detailsContainer: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    overflow: 'hidden',
    maxHeight: '80%',
  },
  screen: {
    flex: 1,
  },
  rank: {
    color: colors.secondary,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.55,
  },
});

export default PersonalStatsGamesList;
