import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Platform } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Card({ title, subTitle, imageUrl, onPress, height = 200 }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={[styles.image, { height: height }]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.lightPurple,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    fontFamily: Platform.OS === "android" ? "Montserrat-SemiBold" : "Avenir",
  },
  title: {
    marginBottom: 5,
    textDecorationLine: "underline",
    color: colors.white,
    fontSize: 25,
    fontFamily: Platform.OS === "android" ? "Montserrat-SemiBold" : "Avenir",
  },
});

export default Card;
