import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";

import HeaderText from "../../components/HeaderText";

import PlayerGameDetails from "../../components/games/PlayerGameDetails";
import ListitemSeperator from "../../components/ListitemSeperator";
import GameDetails from "../../components/games/GameDetails";

function NewGame({ route, navigation }) {
  const game = route.params.game;
  const league = route.params.league;
  console.log("🚀 ~ NewGame ~ league:", league);
  const gameDetails = route.params.gameDetails;

  return (
    <Screen style={styles.container}>
      <HeaderText>New Game</HeaderText>
      <GameDetails game={game} league={league} />

      <FlatList
        data={gameDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerGameDetails
            image={item.user.image}
            nickName={item.user.nickName}
            onPress={() => console.log("Player selected", item)}
          />
        )}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default NewGame;
