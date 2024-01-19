import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import colors from "../config/colors";

function HeaderText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: Platform.OS === "android" ? "InterVariable" : "Avenir",
    fontWeight: "bold",
    color: colors.PrimaryBlue,
    textAlign: "center",
    marginTop: 10,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});

export default HeaderText;
