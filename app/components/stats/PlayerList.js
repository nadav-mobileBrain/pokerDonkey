import React from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import ListitemSeperator from "../ListitemSeperator";
import AppText from "../AppText";
import colors from "../../config/colors";
import apiClient from "../../api/client";

const serverUrl = apiClient.getBaseURL();

const PlayerItem = ({ player }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `${serverUrl}${player.image}` }}
        style={styles.playerImage}
      />
      <Text style={styles.playerName}>{player.nickName}</Text>
    </View>
    <View style={styles.playerDetails}>
      <Text style={styles.playerStats}>{player.title}</Text>
      <Text style={styles.playerStats}> {player.subTitle}</Text>
      <Text style={styles.playerStats}> {player.subTitle2}</Text>
    </View>
  </View>
);

const PlayersList = ({ players }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <AppText style={styles.playerTitle}>Player</AppText>
        <AppText style={styles.title}>Profit</AppText>
        <AppText style={styles.title}>Total Games</AppText>
        <AppText style={styles.title}>Win/Loss Ratio</AppText>
      </View>
      <FlatList
        data={players}
        renderItem={({ item }) => <PlayerItem player={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row-reverse",
    padding: 10,
    alignItems: "center",
    // flex: 1,
    // Add more styling as needed
  },

  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.LightSkyBlue,
    // flex: 1,
  },
  imageContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    // justifyContent: "space-between",

    // paddingHorizontal: 10,
    // flex: 1,
    width: 70,
  },

  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // Add more styling as needed
  },
  playerDetails: {
    // marginLeft: 10,
    justifyContent: "space-around",
    flexDirection: "row-reverse",
    flex: 1,
    paddingStart: 15,
    // Add more styling as needed
  },
  playerName: {
    fontSize: 12,
    paddingLeft: 5,
    // Add more styling as needed
  },
  playerStats: {
    fontSize: 14,
    width: 50,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.pink,
  },
  playerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    width: 50,
    color: colors.pink,
  },
});

export default PlayersList;
