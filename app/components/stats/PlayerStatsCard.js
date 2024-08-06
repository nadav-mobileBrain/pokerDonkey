import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import ActivityIndicator from "../ActivityIndicator";
import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import LeagueStatsCard from "./LeagueStatsCard";
import HeaderText from "../HeaderText";
import PlayerDetails from "../player/PlayerDetails";
import statsApi from "../../api/stats";
import useApi from "../../hooks/useApi";
import routes from "../../navigation/routes";


const PlayerStatsCard = ({ league }) => {
  const getCardsInfo = useApi(statsApi.getMainCardsStats);
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noGames, setNoGames] = useState(false);
  const navigation = useNavigation();

  

  const getCardsInfoApi = async () => {
    setLoading(true);
    const result = await getCardsInfo.request(league.id);
    if (!result.ok) {
      setLoading(false);
      if (result.data === "No games found") {
        setNoGames(true);
      }
      return;
    }
    setCardsData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getCardsInfoApi();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      {noGames && (
        <>
          <HeaderText>No games played yet</HeaderText>
          <AppText style={{color:colors.gold}}>Go to league screen to start a new game</AppText>
        </>
      )}
      {cardsData.length > 0 &&(
        <FlatList
           data={cardsData}
           keyExtractor={(card) => card.id.toString()}
           renderItem={({ item }) => {
            if (!item || !item.values) {
              return <AppText>bla</AppText>; // or render a placeholder
            }
            return (
               <PlayerDetails
               title={item.title}
               subTitle={item.subTitle}
               image={{uri:item?.values?.image.startsWith('https') ? item?.values?.image : `${config.s3.baseUrl}${item?.values?.image}`}}
               onPress={() => navigation.navigate(routes.CARD_STATS, { data: item, leagueId: league.id }) }
             />
            );
           }}
             ListHeaderComponent={() => <LeagueStatsCard league={league} />}
           />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlayerStatsCard;
