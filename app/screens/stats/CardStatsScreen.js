import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import LeaderStatsHeader from "../../components/stats/LeaderStatsHeader";
import PlayersList from "../../components/stats/PlayerList";

import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppLogo from "../../components/AppLogo";

const CardStatsScreen = ({ route }) => {
  const [cardPlayers, setCardPlayers] = useState([]);
  const [leader, setLeader] = useState({});
  const [loading, setLoading] = useState(false);
  const { data, leagueId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const apiRoute = data.apiRoute;
  const getStats = useApi(statsApi.getStatsForCard);

  useEffect(() => {
    getStatsForCard();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getStatsForCard();
    setRefreshing(false);
  };

  const getStatsForCard = async () => {
    setLoading(true);
    const result = await getStats.request(apiRoute, leagueId);
    if (!result.ok) return;
    ///get the first element of the array
    const leader = result.data[0];
    setLeader(leader);
    result.data.shift();

    setCardPlayers(result.data);
    setLoading(false);
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      <LeaderStatsHeader leader={leader} titles={data} />
      <PlayersList players={cardPlayers} titles={data} />
 
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default CardStatsScreen;
