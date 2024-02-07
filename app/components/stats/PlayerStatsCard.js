import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import StatsCard from "./StatsCard";

const PlayerStatsCard = ({ league }) => {
  const getCardsInfo = useApi(statsApi.getMainCardsStats);
  const [cardsData, setCardsData] = useState([]);

  const getCardsInfoApi = async () => {
    const result = await getCardsInfo.request(league.id);
    if (!result.ok) return;

    setCardsData(result.data);
  };

  useEffect(() => {
    getCardsInfoApi();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={cardsData}
        keyExtractor={(card) => card.id.toString()}
        renderItem={({ item }) => <StatsCard data={item} />}

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
