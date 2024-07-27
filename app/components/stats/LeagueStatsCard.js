import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import config from "../../config/config";

const LeagueStatsCard = ({ league }) => {
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
          source={{ uri: `${config.s3.baseUrl}${league.league_image}` }}
          style={styles.image}
        />
        <AppText style={styles.leagueName}>{league.league_name}</AppText>
        <AppText style={styles.number}>
          League Number:{league.league_number}
        </AppText>
      </View>
      <View style={styles.info}>
        <Text style={styles.stat}>
          Total Cash Played: {leagueStats?.totalCashPlayed} $
        </Text>
        <Text style={styles.stat}>
          Total Hours Played: {leagueStats?.totalHours} 
        </Text>
        <Text style={styles.stat}>
          Total Games: {leagueStats?.gamesCount}
        </Text>
        <Text style={styles.stat}>
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
    overflow: "hidden",
    backgroundColor: colors.lighterBlue,
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
    color: colors.light,
  },

  number: {
    fontSize: 12,
    color: colors.light,
  },
  stat: {
    fontSize: 13,
    color: colors.light,
    fontFamily:'Roboto_700Bold'
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.2,
  },
});

export default LeagueStatsCard;
