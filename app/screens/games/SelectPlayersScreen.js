import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";

import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";
import PlayerInfo from "../../components/player/PlayerInfo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

function SelectPlayersScreen(props) {
  console.log("🚀 ~ SelectPlayersScreen ~ props:", props);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const onSelectedPlayer = (player) => {
    console.log("🚀 ~ onSelectedPlayer ~ player:", player);
    const playerIndex = selectedPlayers.findIndex((p) => p.id === player.id);
    if (playerIndex === -1) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(playerIndex, 1);
      setSelectedPlayers(updatedPlayers);
    }
  };
  return (
    <Screen style={styles.container}>
      <HeaderText> Select Players </HeaderText>
      <PlayerInfo
        leaguePlayers={props.route.params}
        onPress={onSelectedPlayer}
      />
      <AppText style={styles.inTheGame}> In The Game </AppText>

      {selectedPlayers.length > 0 && (
        <PlayerInfo
          leaguePlayers={selectedPlayers}
          onPress={onSelectedPlayer}
        />
      )}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/selectPlayers.png")}
          style={styles.image}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  inTheGame: {
    color: colors.AccentPurple,
    fontSize: 30,
    textDecorationColor: colors.AccentPurple,
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectPlayersScreen;
