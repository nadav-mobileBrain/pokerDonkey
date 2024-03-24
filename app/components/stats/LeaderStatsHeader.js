import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import colors from "../../config/colors";

import apiClient from "../../api/client";

const serverUrl = apiClient.getBaseURL();
const LeaderStatsHeader = ({ leader }) => {
  return (
    <ImageBackground
      source={require("../../assets/blue_chip3.webp")}
      style={styles.headerContainer}
    >
      <View style={styles.overlay} />

      <Image
        source={{ uri: `${serverUrl}${leader.image}` }}
        style={styles.leaderImage}
      />
      <Text style={styles.leaderName}>{leader.nickName}</Text>
      <Text style={styles.leaderStats}>Profit: {leader.title}</Text>
      <Text style={styles.leaderStats}>Total Games: {leader.subTitle}</Text>
      <Text style={styles.leaderStats}>
        Winn/Loss Ratio: {leader.subTitle2}%
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 10,
  },
  leaderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  leaderName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.LightSkyBlue,
  },
  leaderStats: {
    fontSize: 16,
    color: colors.lightPink,
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.7,
  },
});

export default LeaderStatsHeader;
