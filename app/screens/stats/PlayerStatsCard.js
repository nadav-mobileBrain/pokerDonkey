import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import StatsCard from "./StatsCard";
import ListitemSeperator from "../../components/ListitemSeperator";

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
    subTitle: "Buy in",
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
        ItemSeparatorComponent={ListitemSeperator}

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
