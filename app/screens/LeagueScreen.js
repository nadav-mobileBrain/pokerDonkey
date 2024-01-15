import React from "react";
import { StyleSheet, FlatList } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";

const leagues = [
  {
    id: 1,
    name: "League 1",
    number: 1,
    leagueManager: "Manager 1",
    image: require("../assets/leagueLogo.jpg"),
  },
  {
    id: 2,
    name: "League 2",
    number: 2,
    leagueManager: "Manager 2",
    image: require("../assets/leagueLogo.jpg"),
  },
];

function LeagueScreen({ navigation }) {
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
            onPress={() => navigation.navigate("LeagueDetails", item)}
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
