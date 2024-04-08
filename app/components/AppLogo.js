import { View, Image, StyleSheet } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/appLogo.png")} />
      <AppText style={[defaultStyles.text, styles.title]}>Poker Donkey</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: colors.AccentPurple,
    textDecorationLine: "underline",
  },
});
export default AppLogo;
