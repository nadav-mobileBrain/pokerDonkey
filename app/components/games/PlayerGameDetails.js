import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

import config from "../../config/config";
import colors from "../../config/colors";

const PlayerGameDetails = ({ image, nickName, onPress, playerData }) => {
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
              source={{ uri: `${config.s3.baseUrl}${image}` }}
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
            name="chevron-left"
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
    padding: 5,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  cashOutPlayer: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 12,
  },
  detailsContainer: {
    flexDirection: "row-reverse",
  },
  innerContainer: {
    flexDirection: "column",
    
    alignItems: "center",
    width: 70,
    textAlign: "center",

  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: colors.AccentPurple,
    borderWidth: 2,
  },
  title: {
    fontSize: 9,
  },
});

export default PlayerGameDetails;
