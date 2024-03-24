import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import colors from "../config/colors";

const HeaderText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: Platform.OS === "android" ? "Montserrat-SemiBold" : "Avenir",
    color: colors.AccentPurple,
    textAlign: "center",
    marginTop: 10,
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
});

export default HeaderText;
