import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import LeaderStatsHeader from "../../components/stats/LeaderStatsHeader";
import PlayersList from "../../components/stats/PlayerList";

import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";

const CardStatsScreen = ({ route }) => {
  const [cardPlayers, setCardPlayers] = useState([]);
  const [leader, setLeader] = useState({});
  const { data, leagueId } = route.params;

  const apiRoute = data.apiRoute;
  const getStats = useApi(statsApi.getStatsForCard);

  useEffect(() => {
    getStatsForCard();
  }, []);

  const getStatsForCard = async () => {
    const result = await getStats.request(apiRoute, leagueId);
    if (!result.ok) return;
    ///get the first element of the array
    const leader = result.data[0];
    setLeader(leader);
    result.data.shift();

    setCardPlayers(result.data);
  };

  return (
    <Screen style={styles.screen}>
      <LeaderStatsHeader leader={leader} />
      <PlayersList players={cardPlayers} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default CardStatsScreen;
