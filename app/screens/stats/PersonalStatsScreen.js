import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import AppText from '../../components/AppText';
import ActivityIndicator from '../../components/ActivityIndicator';
import colors from '../../config/colors';
import config from '../../config/config';
import ListitemSeperator from '../../components/ListitemSeperator';
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import usersApi from '../../api/users';

import PersonalStatsGamesDetails from '../../components/stats/PersonalStatsGamesDetails';
import PersonalStatsGamesHeader from '../../components/stats/PersonalStatsGamesHeader';
import Screen from '../../components/Screen';

const PersonalStatsScreen = ({ route }) => {
  let { user } = useAuth();
  if (route?.params?.userDetails) {
    user = route.params.userDetails;
    user.userId = route.params.userDetails.id;
  }

  let url = user.image;
  if (!url.includes('http')) {
    url = config.s3.baseUrl + user.image;
  }
  const getPersonalStatsApi = useApi(usersApi.getPersonalStats);
  const [personalStats, setPersonalStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPersonalStats = async () => {
      setLoading(true);
      const result = await getPersonalStatsApi.request(user.userId);

      if (!result.ok) {
        console.error('Failed to fetch personal stats:', result.problem);
        return;
      }

      setPersonalStats(result.data);
      setLoading(false);
    };

    getPersonalStats();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getPersonalStatsApi.loading} />
      <Screen style={styles.screen}>
        <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
          <ImageBackground
            source={require('../../assets/personalDonkey.jpeg')}
            style={styles.card}
          >
            <View style={styles.overlay} />
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: url }} />
            </View>
            <AppText style={styles.name}>{user.nickName}</AppText>
            {personalStats?.games?.length < 1 && (
              <View style={styles.noGamesContainer}>
                <AppText style={styles.noGames}>No Games Played Yet</AppText>
                <AppText style={styles.noGames}>
                  Play a game to see your stats
                </AppText>
              </View>
            )}

            <View style={styles.totalStatsContainer}>
              {personalStats?.totalStats && (
                <>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Total Games</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.totalGames}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Total Profit</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.totalProfit}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Total Hours</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.totalHoursPlayed}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Total Buy In</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.totalBuyInsAmount}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>
                      Current Win Streak
                    </AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.streaksData[0]?.title}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Max Win Streak</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.streaksData[0]?.subTitle}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>
                      Total Games With Profit
                    </AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.gamesWithProfit}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Success Rate %</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.successRate}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Max Win</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.maxProfit}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Max Loss</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.minProfit}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Best League Rank</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.totalStats[0]?.maxSeasonRank}
                    </AppText>
                  </View>
                </>
              )}
            </View>

            {personalStats?.avgStats && (
              <>
                <AppText style={styles.name}>Avg Stats</AppText>
                <View style={styles.totalStatsContainer}>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Profit</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgProfit}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Buy Ins</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgBuyInsAmount}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Cash In Hand</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgCashInHand}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Hours Played</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgHoursPlayed}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Game Rank</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgGameRank}
                    </AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statTitle}>Avg Season Rank</AppText>
                    <AppText style={styles.statValue}>
                      {personalStats?.avgStats[0]?.avgSeasonRank}
                    </AppText>
                  </View>
                </View>
              </>
            )}
          </ImageBackground>

          {personalStats?.games?.length > 0 && (
            <>
              <AppText style={styles.rank}>G.rank = rank in this game</AppText>
              <AppText style={styles.rank}>
                S.rank = total season rank on this date
              </AppText>
              <PersonalStatsGamesHeader />
              <FlatList
                data={personalStats.games}
                keyExtractor={(game) => game.id.toString()}
                renderItem={({ item, index }) => (
                  <PersonalStatsGamesDetails game={item} index={index} />
                )}
                ItemSeparatorComponent={ListitemSeperator}
              />
            </>
          )}
        </LinearGradient>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 15,
    height: 360,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageContainer: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  noGamesContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  noGames: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 5,
  },
  totalStatsContainer: {
    flexDirection: 'row-reverse',
    padding: 5,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    margin: 8,
    alignItems: 'center',
  },
  statTitle: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  statValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rank: {
    fontSize: 10,
    color: colors.gold,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.6,
  },
});

export default PersonalStatsScreen;
