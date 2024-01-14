import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";

const leagues = [
  {
    id: 1,
    name: "League 1",
    leagueNuber: 1,
    leagueManager: "Manager 1",
    image: require("../assets/leagueLogo.jpg"),
  },
  {
    id: 2,
    name: "League 2",
    leagueNuber: 2,
    leagueManager: "Manager 2",
    image: require("../assets/leagueLogo.jpg"),
  },
];

function LeagueScreen(props) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={leagues}
        keyExtractor={(league) => league.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.leagueNuber}
            image={item.image}
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
