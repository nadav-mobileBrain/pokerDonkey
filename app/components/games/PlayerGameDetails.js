import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import AppText from "../AppText";

import apiClient from "../../api/client";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

const PlayerGameDetails = ({ image, nickName, onPress, playerData }) => {
  const serverUrl = apiClient.getBaseURL();
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={onPress}
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {image && (
            <Image
              style={styles.image}
              source={{ uri: `${serverUrl}${image}` }}
            />
          )}

          <AppText style={styles.title}>{nickName}</AppText>
          {playerData.is_cashed_out && (
            <AppText style={styles.cashOutPlayer}>cashed out</AppText>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <AppText>{playerData.buy_ins_amount}</AppText>
          <MaterialCommunityIcons
            name="chevron-right"
            size={25}
            color={colors.medium}
            style={{ marginRight: 30 }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  cashOutPlayer: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 15,
  },
  detailsContainer: {
    flexDirection: "row-reverse",
  },
  innerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default PlayerGameDetails;
