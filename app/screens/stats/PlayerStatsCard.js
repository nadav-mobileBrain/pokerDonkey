import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import apiClient from "../../api/client";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import StatsCard from "./StatsCard";

const cards = [
  {
    id: 1,
    title: "Total Profit",
    subTitle: "Total Games",
    subTitle2: "Average Profit",
    heroPlayer: "Player 1",
  },
  {
    id: 2,
    title: "Top 10 Profits",
    subTitle: "Profit",
    subTitle2: "Date",
    heroPlayer: "Player 2",
  },
  {
    id: 3,
    title: "Stats By Hour",
    subTitle: "Profit By Hour",
    subTitle2: "Hours Played",
    heroPlayer: "Player 3",
  },
  {
    id: 4,
    title: "Stats By Hour",
    subTitle: "Profit By Hour",
    subTitle2: "Hours Played",
    heroPlayer: "Player 3",
  },
];

const PlayerStatsCard = ({ league }) => {
  const serverUrl = apiClient.getBaseURL();
  const getPlayerStats = useApi(statsApi.getPlayerStats);
  const [playerData, setPlayerData] = useState([]);
  //   console.log("🚀 ~ PlayerStatsCard ~ PlayerData:", PlayerData);
  const getPlayerStatsApi = async () => {
    const result = await getPlayerStats.request(league.id);
    if (!result.ok) return;

    setPlayerData(result.data);
  };

  useEffect(() => {
    getPlayerStatsApi();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(card) => card.id.toString()}
        renderItem={({ item }) => <StatsCard data={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlayerStatsCard;
