import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import apiClient from "../api/client";
import Card from "../components/Card";
import colors from "../config/colors";
import leaguesApi from "../api/leagues";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import HeaderText from "../components/HeaderText";
import NoLeagues from "../components/leagues/NoLeagues";
import PlayerAvatar from "../components/player/PlayerAvatar";

const serverUrl = apiClient.getBaseURL();

function LeagueScreen({ navigation, user }) {
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  console.log("🚀 ~ LeagueScreen ~ getLeaguesApi:", getLeaguesApi);

  useEffect(() => {
    setTimeout(() => {
      getLeaguesApi.request();
    }, 1000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={getLeaguesApi.loading} />
      <Screen style={styles.screen}>
        <PlayerAvatar />
        <HeaderText> MY Leagues</HeaderText>
        {getLeaguesApi.error && (
          <>
            <AppText>Couldn't retrieve the leagues.</AppText>
            <AppButton title="Retry" onPress={getLeaguesApi.request} />
          </>
        )}
        {getLeaguesApi.data?.leagues?.length == 0 && (
          <NoLeagues navigation={navigation} />
        )}
        {getLeaguesApi.data?.leagues?.length > 0 && (
          <FlatList
            data={getLeaguesApi.data.leagues}
            keyExtractor={(league) => league.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.league.league_name}
                subTitle={`League Number: ${item.league.league_number}`}
                imageUrl={`${serverUrl}${item.league.league_image}`}
                onPress={() => navigation.navigate(routes.LEAGUE_DETAILS, item)}
              />
            )}
          />
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default LeagueScreen;
