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
      blurRadius={6}>
      <View style={styles.logoContainer}>
        <AppLogo />
        <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
   
      </View>
      <View style={styles.info}>
      <Text style={styles.infoTagLine}>Collect and display stats of your league's games.</Text>
      <Text style={styles.infoTagLine}>Who is the best player in your league?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          color="secondary"
          icon="login"
        />
        <AppButton
          title="Register"
          color="gold"
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
  info: {
 
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: 20,
  },
  infoTagLine:{
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
 
  },
  tagLine: {
    fontSize: 23,
    fontWeight: "600",
    paddingVertical: 20,
    color: colors.white,
    
  },
});

export default WelcomeScreen;
