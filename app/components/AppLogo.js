import { View, Image, StyleSheet } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../config/colors";

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/appLogo.png")} />
      <AppText style={styles.title}>Poker Donkey</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.pink,
    textDecorationLine: "underline",
  },
});
export default AppLogo;
