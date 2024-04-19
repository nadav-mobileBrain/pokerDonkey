import React from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import ListitemSeperator from "../ListitemSeperator";
import AppText from "../AppText";
import colors from "../../config/colors";
import apiClient from "../../api/client";

const serverUrl = apiClient.getBaseURL();

const PlayerItem = ({ player, index, title }) => (
  <View style={styles.itemContainer}>
    <AppText style={styles.position}>{index}</AppText>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `${serverUrl}${player.image}` }}
        style={styles.playerImage}
      />
      <Text style={styles.playerName}>{player.nickName}</Text>
    </View>
    <View style={styles.playerDetails}>
      <Text
        style={[
          styles.playerStats,
          player.title > 0 &&
            title === "totalProfit" && { color: "green", fontWeight: "bold" },
          player.title < 0 &&
            title === "totalProfit" && {
              color: "red",
              fontWeight: "bold",
            },
        ]}>
        {player.title}
      </Text>
      <Text style={styles.playerStats}> {player.subTitle}</Text>
      <Text style={styles.playerStats}> {player.subTitle2}</Text>
    </View>
  </View>
);

const PlayersList = ({ players, titles }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <AppText style={styles.playerTitle}>Player</AppText>
        <AppText style={styles.title}>{titles.title}</AppText>
        <AppText style={styles.title}>{titles.subTitle}</AppText>
        <AppText style={styles.title}>{titles.subTitle2}</AppText>
      </View>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <PlayerItem player={item} index={index + 2} title={titles.apiRoute} />
        )}
        keyExtractor={(item) => `${item.id}_${item.title}`}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: colors.AccentPurple,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 70,
  },

  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playerDetails: {
    justifyContent: "space-around",
    flexDirection: "row-reverse",
    flex: 1,
  },
  playerName: {
    fontSize: 10,
    color: colors.AccentPurple,
  },
  playerStats: {
    fontSize: 12,
    width: 60,
    textAlign: "center",
  },
  position: {
    fontSize: 10,
    width: 16,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 10,
    width: 45,
    color: colors.white,
  },
  playerTitle: {
    fontSize: 10,
    width: 50,
    color: colors.white,
  },
});

export default PlayersList;
