import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";

function WelcomeScreen() {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.jpeg")}
      blurRadius={10}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/appLogo.png")} />
        <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => console.log("Tapped")}
          color="LightSkyBlue"
        />
        <AppButton
          title="Register"
          color="AccentPurple"
          onPress={() => console.log("Tapped")}
        />
      </View>
    </ImageBackground>
  );
}

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

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
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
  },
});

export default WelcomeScreen;
