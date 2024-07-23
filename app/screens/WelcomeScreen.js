import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppLogo from "../components/AppLogo";
import useAuth from "../auth/useAuth"; // Assuming this is the correct import

const WelcomeScreen = ({ navigation }) => {
  const auth = useAuth();

  const takeATour = () => {
    const authToken = {};
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2Niwibmlja05hbWUiOiJCaWJzIiwiaW1hZ2UiOiJ1cGxvYWRzLzE3MTY2MjUwNTM2OTdfQmlicy5qcGVnIiwiaWF0IjoxNzIxNzQzNTkyfQ.tsjUtuAXusp9OfvEoYkt1J0yeGYhI_SGXO16u8l3Qf0'
    authToken.token = token;
    auth.logIn(authToken);
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/appLogo.png")}// Change to a more suitable background image
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
          title="Take A Tour"
          color="primary"
          onPress={takeATour}
          icon="arrow-right-bold-outline"
        />
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
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 120,
    alignItems: "center",
  },
  tagLine: {
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 20,
    color: colors.gold,
    textAlign: "center",
  },
  info: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent background for better readability
    borderRadius: 10,
    marginVertical: 20,
  },
  infoTagLine: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gold,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
  },
});

export default WelcomeScreen;
