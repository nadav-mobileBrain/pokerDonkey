import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

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

const serverUrl = apiClient.getBaseURL();

function LeagueScreen({ navigation }) {
  const {
    data: myLeagues,
    error,
    loading,
    request: loadMyLeagues,
  } = useApi(leaguesApi.getLeagues);
  console.log(myLeagues.user[0].userLeagues);
  useEffect(() => {
    loadMyLeagues();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the leagues.</AppText>
          <AppButton title="Retry" onPress={loadMyLeagues} />
        </>
      )}
      <ActivityIndicator visible={loading} />

      {myLeagues?.user[0].userLeagues.length > 0 && (
        <FlatList
          data={myLeagues?.user[0].userLeagues}
          keyExtractor={(myLeague) => myLeague.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.league.league_name}
              subTitle={item.league.league_number}
              imageUrl={serverUrl + item.league.league_image}
              onPress={() => navigation.navigate(routes.LEAGUE_DETAILS, item)}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default LeagueScreen;
