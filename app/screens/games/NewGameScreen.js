import React, { useState, useEffect } from "react";
import { Button, Modal,View, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Dialog from "react-native-dialog";

import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import gameApi from "../../api/game";
import GameDetails from "../../components/games/GameDetails";
import GameHeader from "../../components/games/GameHeader";
import HeaderText from "../../components/HeaderText";
import ListitemSeperator from "../../components/ListitemSeperator";
import PlayerGameDetails from "../../components/games/PlayerGameDetails";
import PlayerGameCardModal from "../../components/games/PlayerGameCardModal";
import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import { onAddBuyIn,onRemoveBuyIn ,checkIfAllPlayersCashedOut} from "../../utils/gameUtils";
import routes from "../../navigation/routes";
import getLeaguePlayers from "../../api/leagues";
import ActivityIndicator from "../../components/ActivityIndicator";
import useAuth from "../../auth/useAuth";

const NewGame = ({ route, navigation }) => {
  const isFocused = useIsFocused(); // Add this line
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [loading, setLoading] = useState(false);
  const [userGamesData, setUserGamesData] = useState(route.params.userGames);
  const [error, setError] = useState();
  const [dialogVisible, setDialogVisible] = useState(false); 
 
  const getLeaguePlayersApi = useApi(getLeaguePlayers.getLeaguePlayers);
  const [game, setGame] = useState(route.params.game);
  console.log("🚀 ~ NewGame ~ game:", game)
  const league = route.params.league;
  const endGameApi = useApi(gameApi.endGame);
  const takeControllOfGameApi = useApi(gameApi.takeControllOfGame);
  const { user } = useAuth();
 
 
  useEffect(() => {
    if (isFocused) {
      setUserGamesData(route.params.userGames); // Refresh data when the screen is focused
    }
  }, [isFocused]);

 

  const endGame = async () => {
    const isAllCashedOut = checkIfAllPlayersCashedOut(userGamesData);
    if (!isAllCashedOut) {
      alert("Not all players cashed out");
      return;
    }

    const result = await endGameApi.request(game.id, userGamesData, league);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    navigation.navigate(routes.STATS, { league });
  };

  const addRemovePlayersFromGame = async () => {
    setLoading(true);
      const result = await getLeaguePlayersApi.request(league.id);
      if (!result.ok) {
        setLoading(false);
        return;
        }
        setLoading(false);
        const leaguePlayers = result.data?.leaguePlayers;
   
    navigation.navigate(routes.ADD_REMOVE_PLAYERS, {
      leaguePlayersFromApi: leaguePlayers,
      league,
  
    });
  
  }
  const takeControllOfGame = () => {
    setDialogVisible(true); // Show the dialog when the button is pressed
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = async() => {
    setLoading(true);
   const replaceGameAdmin = await takeControllOfGameApi.request(game.id, user.userId);
    if (!replaceGameAdmin.ok) {
      if (replaceGameAdmin.data) setError(replaceGameAdmin.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(replaceGameAdmin);
      }
      return;
    }
     setGame(replaceGameAdmin.data.updatedGame);
  

    setDialogVisible(false);
    setLoading(false);
 
  };

 
  return (
    <Screen style={styles.container}>
      <HeaderText>New Game</HeaderText>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Take Control of Game</Dialog.Title>
        <Dialog.Description>
          Do you want to take control of the game and replace the game admin?
        </Dialog.Description>
        <Dialog.Button label="No" onPress={handleCancel} />
        <Dialog.Button label="Yes" onPress={handleConfirm} />
      </Dialog.Container> 

      {error && <AppText>{error}</AppText>}
      <ActivityIndicator visible={loading} />
      {game?.gameManager?.id === user.userId && (
      <AppText style={styles.addRemove} onPress={()=>addRemovePlayersFromGame()}>+Add/Remove players from game</AppText>
      )}

      <GameDetails game={game} league={league} />

      {game?.gameManager?.id != user.userId && (
        <View>
          <AppText style={styles.noAdmin}>Only the game manager can control game's data</AppText>
          <AppText style={styles.addRemove} onPress={()=>takeControllOfGame( )}>Take controll of the game and replace game admin?</AppText>
        </View>
 
      )}

      {game?.gameManager?.id === user.userId && (
<>
        <FlatList
          data={userGamesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            item.User ? (
              <PlayerGameDetails
                image={item.User.image}
                nickName={item.User.nickName}
                playerData={item}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedPlayer(item);
                }}
              />


            ):null
          )}
          ItemSeparatorComponent={ListitemSeperator}
          ListHeaderComponent={() => <GameHeader />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
 
      <AppButton title="End Game" onPress={() => endGame()} />
        
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
        <Screen>
          {selectedPlayer && (
            <PlayerGameCardModal
              playerData={selectedPlayer}
              onClose={() => setModalVisible(false)}
              onAddBuyIn={(amount, userId) => {
                onAddBuyIn(amount, userId,userGamesData,setUserGamesData);
              }}
              onRemoveBuyIn={(amount, userId) => {
                onRemoveBuyIn(amount, userId,userGamesData,setUserGamesData);
              }}
              onCashOut={(amount, userId) => {
                const updatedUserGames = [...userGamesData];
                const playerIndex = updatedUserGames.findIndex(
                  (p) => p.user_id === userId
                );
                updatedUserGames[playerIndex].cash_out_amount = amount;
                updatedUserGames[playerIndex].is_cashed_out = true;

                setUserGamesData(updatedUserGames);
              }}
            />
          )}
        </Screen>
      </Modal>

</>

      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  addRemove: {
    color: "blue",
    textAlign: "center",
    fontSize: 13,
    paddingVertical: 10,
    ///underline
    textDecorationLine: "underline",
  },
  noAdmin: {
    color: "red",
    textAlign: "center",
    fontSize: 13,
    paddingVertical: 10,
  },
});

export default NewGame;
