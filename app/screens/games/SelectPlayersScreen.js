import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";

import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";
import PlayerInfo from "../../components/player/PlayerInfo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import gameApi from "../../api/game";
import useApi from "../../hooks/useApi";

function SelectPlayersScreen({ route }) {
  // console.log("🚀 ~ SelectPlayersScreen ~ props:", props);
  const leaguePlayers = route.params.leaguePlayers;
  const league = route.params.league;

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const createNewGameApi = useApi(gameApi.newGame);

  const onSelectedPlayer = (player) => {
    const playerIndex = selectedPlayers.findIndex((p) => p.id === player.id);
    if (playerIndex === -1) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(playerIndex, 1);
      setSelectedPlayers(updatedPlayers);
    }
  };

  const startNewGame = async () => {
    const result = await createNewGameApi.request({
      selectedPlayers,
      leagueId: league.id,
    });
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    console.log("🚀 ~ CreateLeagueScreen ~ result:", result.data);
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.selectContainer}>
        <HeaderText> Select Players </HeaderText>
        <PlayerInfo
          leaguePlayers={leaguePlayers}
          onPress={onSelectedPlayer}
          width={40}
          height={40}
        />

        {selectedPlayers.length > 0 && (
          <View style={styles.selectedPlayersContainer}>
            <AppText style={styles.inTheGame}> In The Game </AppText>
            <PlayerInfo
              leaguePlayers={selectedPlayers}
              onPress={onSelectedPlayer}
              width={40}
              height={40}
              borderColor="LimeGreen"
            />
            <AppButton
              title="Start Game"
              color="LimeGreen"
              icon="cards-playing-club-multiple-outline"
              onPress={() => startNewGame()}
            />
          </View>
        )}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/selectPlayers.png")}
            style={styles.image}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  inTheGame: {
    color: colors.LimeGreen,
    fontSize: 30,
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 20,
    height: 250,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
  },
  selectedPlayersContainer: {
    padding: 10,
    justifyContent: "center",
  },
  selectContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
  },
});

export default SelectPlayersScreen;
