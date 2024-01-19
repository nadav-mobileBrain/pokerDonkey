import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import AppText from "../AppText";
import apiClient from "../../api/client";
import colors from "../../config/colors";

const serverUrl = apiClient.getBaseURL();

function PlayerInfo({ leaguePlayers }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={leaguePlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={styles.playerContainer}
          >
            <Image
              style={styles.image}
              source={{ uri: `${serverUrl}${item.User.image}` }}
            />
            <AppText style={styles.playerName}>{item.User.nickName}</AppText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 50,
    height: 50,
    width: 50,
    borderColor: colors.AccentPurple,
    borderWidth: 2,
  },
  playerContainer: {
    alignItems: "center",
  },
  playerName: {
    color: colors.AccentPurple,
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerInfo;
