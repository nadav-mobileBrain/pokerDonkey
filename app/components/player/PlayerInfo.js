import React from "react";
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

function PlayerInfo({ leaguePlayers, onPress }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={leaguePlayers}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
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
    padding: 5,
    // flex: 1,
    //alignItems: "center",
  },
  image: {
    borderRadius: 50,
    height: 30,
    width: 30,
    borderColor: colors.AccentPurple,
    borderWidth: 2,
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  playerName: {
    color: colors.AccentPurple,
    // fontWeight: "bold",
    fontSize: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerInfo;
