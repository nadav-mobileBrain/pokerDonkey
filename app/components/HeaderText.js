import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import colors from "../config/colors";

const HeaderText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: Platform.OS === "android" ? "Roboto_500Medium" : "Avenir",
    color: colors.textOnPrimary,
    textAlign: "center",
    marginTop: 10,
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
});

export default HeaderText;
