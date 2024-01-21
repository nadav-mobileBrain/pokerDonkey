import React, { useState } from "react";
import { Button, Modal, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";

import HeaderText from "../../components/HeaderText";

import PlayerGameDetails from "../../components/games/PlayerGameDetails";
import ListitemSeperator from "../../components/ListitemSeperator";
import GameDetails from "../../components/games/GameDetails";
import PickerItem from "../../components/PickerItem";
import AppText from "../../components/AppText";

function NewGame({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const game = route.params.game;
  const league = route.params.league;
  const gameDetails = route.params.gameDetails;
  console.log("🚀 ~ NewGame ~ gameDetails:", gameDetails);

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
            onPress={() => {
              setModalVisible(true);
              setSelectedPlayer(item);
            }}
          />
        )}
        ItemSeparatorComponent={ListitemSeperator}
      />
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <AppText>Player Details</AppText>
          {selectedPlayer && (
            <AppText>Player {selectedPlayer.user.nickName} </AppText>
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
