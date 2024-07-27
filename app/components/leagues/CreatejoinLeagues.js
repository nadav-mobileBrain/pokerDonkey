import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import routes from "../../navigation/routes";
import colors from "../../config/colors";

const CreatejoinLeagues = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(routes.JOIN_LEAGUE)}>
        <AppText style={styles.text}>Join Leagues</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.CREATE_LEAGUE)}>
        <AppText style={styles.text}>Create New League</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    backgroundColor:"rgba(0,0,0,0.3)",
  },
  text: {
    fontSize: 15,
    fontFamily: "Roboto_700Bold",
    margin: 10,
    color:colors.light,
    textDecorationLine: "underline",
  },
});

export default CreatejoinLeagues;
