import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import apiClient from "../../api/client";
import AppText from "../AppText";
import colors from "../../config/colors";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";

const LeagueStatsCard = ({ league }) => {
  const serverUrl = apiClient.getBaseURL();
  const getLeagueStatsApi = useApi(statsApi.getLeagueStats);
  const [leagueStats, setLeagueStats] = useState([]);

  const getLeagueStats = async () => {
    const result = await getLeagueStatsApi.request(league.id);
    if (!result.ok) return;

    setLeagueStats(result.data);
  };

  useEffect(() => {
    getLeagueStats();
  }, []);

  return (
    <ImageBackground
      style={styles.card}
      source={require("../../assets/bg56.webp")}>
      <View style={styles.overlay} />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${serverUrl}${league.league_image}` }}
          style={styles.image}
        />
        <AppText style={styles.leagueName}>{league.league_name}</AppText>
        <AppText style={styles.number}>
          League Number:{league.league_number}
        </AppText>
      </View>
      <View style={styles.info}>
        <Text style={styles.stat}>
          Total Cash Played: ${leagueStats?.totalCashPlayed}
        </Text>
        <Text style={styles.stat}>
          Total Hours Played: {leagueStats?.totalHours} hours
        </Text>
        <Text style={styles.subTitle}>
          Total Games: {leagueStats?.gamesCount}
        </Text>
        <Text style={styles.subTitle}>
          Last Game: {leagueStats?.lastGame?.created_at}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 15,
    overflow: "hidden",
  },
  leagueName: {
    color: colors.white,
  },

  number: {
    fontSize: 12,
    color: colors.white,
  },
  stat: {
    fontSize: 14,
    color: colors.white,
  },
  subTitle: {
    fontSize: 14,
    color: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
});

export default LeagueStatsCard;
