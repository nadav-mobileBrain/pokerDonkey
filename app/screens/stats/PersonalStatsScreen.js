import { View, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import apiClient from "../../api/client";
import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import usersApi from "../../api/users";
import Screen from "../../components/Screen";
import App from "../../../App";

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
                Avg Cash In The End: {personalStats?.avgStats[0]?.avgCashInHand}
              </AppText>
              <AppText style={styles.avgStats}>
                Avg Hours Played: {personalStats?.avgStats[0]?.avgHoursPlayed}
              </AppText>
            </>
          )}
        </View>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.lightPurple,
    // marginBottom: 20,
    height: 450,
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
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
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
    fontFamily: Platform.OS === "android" ? "Montserrat-SemiBold" : "Avenir",
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
});

export default PersonalStatsScreen;
