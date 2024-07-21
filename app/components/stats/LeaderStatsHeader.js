import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

import colors from "../../config/colors";
import apiClient from "../../api/client";
import config from "../../config/config";

const LeaderStatsHeader = ({ leader, titles }) => {
  return (
    <ImageBackground
      source={require("../../assets/cardstats.jpg")}
      style={styles.headerContainer}>
      <View style={styles.overlay} />

      <Image
        source={{ uri: `${config.s3.baseUrl}${leader.image}` }}
        style={styles.leaderImage}
      />
      <Text style={styles.leaderName}>{leader.nickName}</Text>
      <Text style={styles.leaderStats}>
        {titles.title} :{leader.title}
      </Text>
      <Text style={styles.leaderStats}>
        {" "}
        {titles.subTitle}: {leader.subTitle}
      </Text>
      <Text style={styles.leaderStats}>
        {titles.subTitle2}: {leader.subTitle2}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 5,
  },
  leaderImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.lightPurple,
  },
  leaderName: {
    fontSize: 20,
    color: colors.LightSkyBlue,
  },
  leaderStats: {
    fontSize: 16,
    color: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.65,
  },
});

export default LeaderStatsHeader;
