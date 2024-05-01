import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";

import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import apiClient from "../../api/client";
import colors from "../../config/colors";
import ListitemSeperator from "../../components/ListitemSeperator";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import usersApi from "../../api/users";
import PersonalStatsGamesDetails from "../../components/stats/PersonalStatsGamesDetails";
import PersonalStatsGamesHeader from "../../components/stats/PersonalStatsGamesHeader";
import Screen from "../../components/Screen";

const PersonalStatsScreen = () => {
  const { user } = useAuth();
  let serverUrl = apiClient.getBaseURL();
  serverUrl = serverUrl.substring(0, serverUrl.length - 1);
  const url = serverUrl + "/" + user.image;
  const getPersonalStatsApi = useApi(usersApi.getPersonalStats);
  const [refreshing, setRefreshing] = useState(false);
  const [personalStats, setPersonalStats] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPersonalStats = async () => {
    setLoading(true);
    const result = await getPersonalStatsApi.request(user.userId);
    if (!result.ok) {
      setLoading(false);
      return;
    }

    setPersonalStats(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getPersonalStats();
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      <ImageBackground
        source={require("../../assets/personalDonkey.jpeg")}
        style={styles.card}>
        <View style={styles.overlay} />
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: url }} />
        </View>
        <AppText style={styles.name}>{user.nickName} </AppText>
        <View style={styles.totalStatsContainer}>
          {personalStats?.totalStats && (
            <>
              <AppText style={styles.totalStats}>
                Total Games: {personalStats?.totalStats[0]?.totalGames}
              </AppText>
              <AppText style={styles.totalStats}>
                Total Profit: {personalStats?.totalStats[0]?.totalProfit}
              </AppText>
              <AppText style={styles.totalStats}>
                Total Hours:
                {personalStats?.totalStats[0]?.totalHoursPlayed}
              </AppText>
              <AppText style={styles.totalStats}>
                Total Buy In: {personalStats?.totalStats[0]?.totalBuyInsAmount}
              </AppText>
              <AppText style={styles.totalStats}>
                Current Winn Streak : {personalStats?.streaksData[0]?.title}
              </AppText>
              <AppText style={styles.totalStats}>
                Max Winn Streak : {personalStats?.streaksData[0]?.subTitle}
              </AppText>
              <AppText style={styles.totalStats}>
                Total Games With Profit :{" "}
                {personalStats?.totalStats[0]?.gamesWithProfit}
              </AppText>
              <AppText style={styles.totalStats}>
                Success Rate % : {personalStats?.totalStats[0]?.successRate}
              </AppText>
              <AppText style={styles.totalStats}>
                Max Winn : {personalStats?.totalStats[0]?.maxProfit}
              </AppText>
              <AppText style={styles.totalStats}>
                Max Loss: {personalStats?.totalStats[0]?.minProfit}
              </AppText>
              <AppText style={styles.totalStats}>
                Best League Rank: {personalStats?.totalStats[0]?.maxSeasonRank}
              </AppText>
            </>
          )}
        </View>
        <AppText style={styles.name}>Avg Stats</AppText>
        <View style={styles.totalStatsContainer}>
          {personalStats?.avgStats && (
            <>
              <AppText style={styles.avgStats}>
                Avg Profit: {personalStats?.avgStats[0]?.avgProfit}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Buy Ins: {personalStats?.avgStats[0]?.avgBuyInsAmount}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Cash In Hand: {personalStats?.avgStats[0]?.avgCashInHand}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Hours Played: {personalStats?.avgStats[0]?.avgHoursPlayed}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Game Rank: {personalStats?.avgStats[0]?.avgGameRank}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Season Rank: {personalStats?.avgStats[0]?.avgSeasonRank}
              </AppText>
            </>
          )}
        </View>
      </ImageBackground>
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.lightPurple,
    height: 400,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 2,
    marginTop: 10,
  },
  name: {
    marginBottom: 5,
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.white,
    fontSize: 25,
  },
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
  totalStats: {
    color: colors.light,
    fontSize: 15,
  },
  avgStats: {
    color: colors.light,
    fontSize: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  totalStatsContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    textAlignVertical: "center",
    flexWrap: "wrap",
  },
  rank: {
    fontSize: 10,
    color: colors.PrimaryBlue,
    textAlign: "center",
    margin: 3,
  },
});

export default PersonalStatsScreen;
