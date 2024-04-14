import { View, StyleSheet } from "react-native";
import React from "react";

import AppText from "../AppText";
import colors from "../../config/colors";
const AllGamesCardHeader = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.headline}>Rank</AppText>
      <AppText style={styles.headline}>Player</AppText>
      <AppText style={styles.headline}>Profit</AppText>
      <AppText style={styles.headline}>Buy In</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    width: 350,
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: colors.AccentPurple,
  },
  headline: {
    fontSize: 15,
    color: colors.white,
  },
});

export default AllGamesCardHeader;
