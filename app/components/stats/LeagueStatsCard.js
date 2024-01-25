import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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
    <View style={styles.card}>
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
        <Text style={styles.statPink}>
          Total Games: {leagueStats?.gamesCount}
        </Text>
        <Text style={styles.statPink}>
          Last Game: {leagueStats?.lastGame?.created_at}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: colors.LightSkyBlue,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginLeft: 15,
    overflow: "hidden",
  },
  leagueName: {
    color: colors.AccentPurple,
    fontWeight: "bold",
  },

  number: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.white,
  },
  stat: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "bold",
  },
  statPink: {
    fontSize: 14,
    color: colors.pink,
    fontWeight: "bold",
  },
});

export default LeagueStatsCard;
