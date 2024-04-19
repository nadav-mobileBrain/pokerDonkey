import { View, StyleSheet } from "react-native";
import React from "react";
import AppText from "../AppText";

const AllGamesPlayers = ({ player }) => {
  const playerDetails = player?.User;
  return (
    <View style={styles.container}>
      <AppText style={styles.playerData}>{player.game_rank}</AppText>
      <AppText style={styles.playerData}>{playerDetails.nickName}</AppText>
      <AppText style={styles.playerData}>{player.profit}</AppText>
      <AppText style={styles.playerData}>{player.buy_ins_amount}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    width: 350,
    padding: 10,
    justifyContent: "space-around",
  },
  playerData: {
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
});

export default AllGamesPlayers;
