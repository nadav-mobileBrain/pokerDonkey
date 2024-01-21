import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";

import HeaderText from "../../components/HeaderText";
import AppText from "../../components/AppText";

function NewGame({ route, navigation }) {
  const game = route.params.game;
  const league = route.params.league;
  const gameDetails = route.params.gameDetails;
  const timeFormat = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const startDate = new Date(game.created_at);
  const formattedTime = startDate.toLocaleTimeString(undefined, timeFormat);

  return (
    <Screen style={styles.container}>
      <HeaderText>New Game</HeaderText>
      <View style={styles.gameDetailsContainer}>
        <AppText>Game id: {game.id}</AppText>
        <AppText>Started At: {formattedTime}</AppText>
      </View>
      <Text>newwew</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default NewGame;
