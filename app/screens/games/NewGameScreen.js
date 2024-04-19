import React, { useState } from "react";
import { Button, Modal, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";

import HeaderText from "../../components/HeaderText";

import ListitemSeperator from "../../components/ListitemSeperator";
import GameDetails from "../../components/games/GameDetails";
import PlayerGameDetails from "../../components/games/PlayerGameDetails";
import GameHeader from "../../components/games/GameHeader";
import PlayerGameCardModal from "../../components/games/PlayerGameCardModal";
import AppButton from "../../components/AppButton";
import useApi from "../../hooks/useApi";
import gameApi from "../../api/game";

const NewGame = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [userGamesData, setUserGamesData] = useState(route.params.userGames);
  const game = route.params.game;
  const league = route.params.league;

  const endGameApi = useApi(gameApi.endGame);

  const onAddBuyIn = (amount, userId) => {
    const updatedUserGames = [...userGamesData];
    const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
    updatedUserGames[playerIndex].buy_ins_amount += amount;
    updatedUserGames[playerIndex].buy_ins_number += 1;
    setUserGamesData(updatedUserGames);
  };

  const onRemoveBuyIn = (amount, userId) => {
    const updatedUserGames = [...userGamesData];
    const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
    updatedUserGames[playerIndex].buy_ins_amount -= amount;
    updatedUserGames[playerIndex].buy_ins_number -= 1;
    setUserGamesData(updatedUserGames);
  };

  const endGame = async () => {
    const isAllCashedOut = checkIfAllPlayersCashedOut();
    if (!isAllCashedOut) {
      alert("Not all players cashed out");
      return;
    }

    const result = await endGameApi.request(game.id, userGamesData);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    navigation.navigate("Stats", { league });
  };

  const checkIfAllPlayersCashedOut = () => {
    const allPlayersCashedOut = userGamesData.every((player) => {
      return player.is_cashed_out === true;
    });

    return allPlayersCashedOut;
  };

  return (
    <Screen style={styles.container}>
      <HeaderText>New Game</HeaderText>
      <GameDetails game={game} league={league} />

      <FlatList
        data={userGamesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerGameDetails
            image={item.User.image}
            nickName={item.User.nickName}
            playerData={item}
            onPress={() => {
              setModalVisible(true);
              setSelectedPlayer(item);
            }}
          />
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
                onAddBuyIn(amount, userId);
              }}
              onRemoveBuyIn={(amount, userId) => {
                onRemoveBuyIn(amount, userId);
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default NewGame;
