import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import apiClient from "../../api/client";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";

const PlayerStatsCard = ({ league }) => {
  console.log("🚀 ~ PlayerStatsCard ~ league:", league);
  const serverUrl = apiClient.getBaseURL();
  const getPlayerStats = useApi(statsApi.getPlayerStats);
  const [PlayerData, setPlayerData] = useState([]);
  console.log("🚀 ~ PlayerStatsCard ~ PlayerData:", PlayerData);

  const getPlayerStatsApi = async () => {
    const result = await getPlayerStats.request(league.id);
    if (!result.ok) return;

    setPlayerData(result.data);
  };

  useEffect(() => {
    getPlayerStatsApi();
  }, []);
  return (
    <View>
      <Text>PlayerStatsCard</Text>
    </View>
  );
};

export default PlayerStatsCard;
