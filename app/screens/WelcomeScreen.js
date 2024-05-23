import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppLogo from "../components/AppLogo";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/appLogo.png")}
      blurRadius={5}>
      <View style={styles.logoContainer}>
        <AppLogo />
        <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          color="LightSkyBlue"
          icon="login"
        />
        <AppButton
          title="Register"
          color="AccentPurple"
          onPress={() => navigation.navigate("Register")}
          icon="account-plus"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", // aligns item to bottom of screen
    alignItems: "center",
  },

  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagLine: {
    fontSize: 22,
    fontWeight: "600",
    paddingVertical: 20,
    color: colors.light,
  },
});

export default WelcomeScreen;
