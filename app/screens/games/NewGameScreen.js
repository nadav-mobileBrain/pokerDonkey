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

function NewGame({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [userGamesData, setUserGamesData] = useState(route.params.userGames);
  console.log("🚀 ~ NewGame ~ userGamesData 17777:", userGamesData);
  const game = route.params.game;
  const league = route.params.league;
  // const gameDetails = route.params.gameDetails;
  // const userGames = route.params.userGames;

  const onAddBuyIn = (amount, userId) => {
    const updatedUserGames = [...userGamesData];
    const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
    updatedUserGames[playerIndex].buy_ins_amount += amount;
    updatedUserGames[playerIndex].buy_ins_number += 1;
    setUserGamesData(updatedUserGames);
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
            image={item.user.image}
            nickName={item.user.nickName}
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
      <AppButton
        title="End Game"
        onPress={() =>
          console.log("End Game" + userGamesData + game.id + league.id)
        }
      />
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
          {selectedPlayer && (
            <PlayerGameCardModal
              playerData={selectedPlayer}
              onClose={() => setModalVisible(false)}
              onAddBuyIn={(amount, userId) => {
                onAddBuyIn(amount, userId);
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
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default NewGame;
