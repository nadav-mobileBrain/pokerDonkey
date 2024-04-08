import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import useApi from "../../hooks/useApi";
import ActivityIndicator from "../ActivityIndicator";
import statsApi from "../../api/stats";
import StatsCard from "./StatsCard";
import LeagueStatsCard from "./LeagueStatsCard";

const PlayerStatsCard = ({ league }) => {
  const getCardsInfo = useApi(statsApi.getMainCardsStats);
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCardsInfoApi = async () => {
    setLoading(true);
    const result = await getCardsInfo.request(league.id);
    if (!result.ok) return;

    setCardsData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getCardsInfoApi();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <FlatList
        data={cardsData}
        keyExtractor={(card) => card.id.toString()}
        renderItem={({ item }) => (
          <StatsCard data={item} leagueId={league?.id} />
        )}
        ListHeaderComponent={() => <LeagueStatsCard league={league} />}
        // refreshing={true}
        // onRefresh={() => console.log("refreshing")}
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
