import React, { useState, useEffect } from "react";
import {  View, StyleSheet } from "react-native";

import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";
import PlayerInfo from "../../components/player/PlayerInfo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import gameApi from "../../api/game";
import useApi from "../../hooks/useApi";
import routes from "../../navigation/routes";

const AddRemovePlayers = ({ route, navigation }) => {
  const leaguePlayers = route.params.leaguePlayersFromApi;
  const league = route.params.league;
 
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [unselectedPlayers, setUnselectedPlayers] = useState([]);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);
  const updateGamePlayers = useApi(gameApi.addREmovePlayersFromGame);
  const [gameData , setGameData] = useState();

useEffect(() => {
    const checkIfOpenGames = async () => {
      const result = await checkIfOpenGameExist.request(league.id);
      if (result.ok) {
        if (result.data) {
          setGameData(result.data)
          setSelectedPlayers(result.data.userGames);
          setUnselectedPlayers(leaguePlayers.filter((p) => !result.data.userGames.some((p2) => p2.User.id === p.User.id)));
        }
      }
    };
    checkIfOpenGames();
  
}, []);



const continueGame =  async () => {

  const gameId = gameData.game.id;
  const leagueId = league.id;

  const result = await updateGamePlayers.request(gameId, selectedPlayers, leagueId);
  const updatedGameData = result.data;
 

  if (!result.ok) {
    if (result.data) setError(result.data.error);
    else {
      setError("An unexpected error occurred.");
      console.log(result);
    }
    return;
  }


navigation.navigate(routes.NEW_GAME, {
          game: gameData.game,
          gameDetails: updatedGameData.updatedGameDetails,
          league,
          userGames:updatedGameData.updatedUserGames,
        });
    
  
}
  const onSelectedPlayer = (player) => {
    const playerIndex = selectedPlayers.findIndex((p) => p.id === player.id);
    if (playerIndex === -1) {
      setSelectedPlayers([...selectedPlayers, player]);
      setUnselectedPlayers(unselectedPlayers.filter((p) => p.id !== player.id));
    } else {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(playerIndex, 1);
      setSelectedPlayers(updatedPlayers);
      setUnselectedPlayers([...unselectedPlayers, player]);
    }
  };




  return (
    <Screen style={styles.container}>
        <View style={styles.selectContainer}>
        <HeaderText>Add/Remove Players</HeaderText>
        <AppText style={styles.addRemove}>
          *Press on a player to add to the game
        </AppText>
        <PlayerInfo
          leaguePlayers={unselectedPlayers}
          onPress={onSelectedPlayer}
          width={40}
          height={40}
        />

{selectedPlayers.length > 0 && (
          <View style={styles.selectedPlayersContainer}>
            <AppText style={styles.inTheGame}> In The Game </AppText>
            <AppText style={styles.addRemove}>
              *Press on a player to remove from the game
            </AppText>
            <AppText>{selectedPlayers.length} Players</AppText>
            <PlayerInfo
              leaguePlayers={selectedPlayers}
              onPress={onSelectedPlayer}
              width={40}
              height={40}
              borderColor="LimeGreen"
            />

           

          </View>
        )}

<AppButton
              title= "Return To Game"
              color= "LightSkyBlue"
              icon="cards-playing-club-multiple-outline"
              onPress={() =>continueGame()}
            />


          </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  addRemove: {
    fontSize: 10,
  },
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

export default AddRemovePlayers;
