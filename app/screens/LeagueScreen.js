import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import leagues from "../api/leagues";
import apiClient from "../api/client";

const serverUrl = apiClient.getBaseURL();

function LeagueScreen({ navigation }) {
  const [myLeagues, setMyLeagues] = useState([]);

  useEffect(() => {
    loadMyLeagues();
  }, []);

  const loadMyLeagues = async () => {
    const response = await leagues.getLeagues();

    setMyLeagues(response?.data?.user[0]?.userLeagues);
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={myLeagues}
        keyExtractor={(league) => league.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={"League Name: " + item.league.league_name}
            subTitle={"League Number " + item.league.league_number}
            imageUrl={serverUrl + "/" + item.league.league_image}
            onPress={() => navigation.navigate(routes.LEAGUE_DETAILS, item)}
          />
        )}
      />
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
