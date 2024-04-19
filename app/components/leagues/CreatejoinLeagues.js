import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import routes from "../../navigation/routes";

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
  },
  text: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    margin: 10,
    textDecorationLine: "underline",
  },
});

export default CreatejoinLeagues;
