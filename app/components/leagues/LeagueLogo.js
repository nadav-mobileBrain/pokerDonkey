import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../AppText";
import apiClient from "../../api/client";
import colors from "../../config/colors";
function LeagueLogo({ logoUrl, leagueName }) {
  const serverUrl = apiClient.getBaseURL();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `${serverUrl}${logoUrl}` }} />
      <AppText>{leagueName}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: colors.AccentPurple,
    borderWidth: 3,
    resizeMode: "contain",
  },
});

export default LeagueLogo;
