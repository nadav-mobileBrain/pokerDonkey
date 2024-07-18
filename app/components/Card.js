import React from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subTitle, imageUrl, onPress, height = 200 }) => {
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
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.surface,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  detailsContainer: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 15,
    marginVertical: 5,
    fontFamily: "Roboto_400Regular",
  },
  title: {
    marginBottom: 7,
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
  },
});

export default Card;
