import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";

const LeagueLogo = ({ logoUrl, leagueName }) => {
  console.log("🚀 ~ LeagueLogo ~ logoUrl:", logoUrl);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${config.s3.baseUrl}${logoUrl}` }}
      />
      <AppText>{leagueName}</AppText>
    </View>
  );
};

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
