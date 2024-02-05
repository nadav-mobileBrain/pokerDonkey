import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

const StatsCard = ({ data }) => {
  console.log("🚀 ~ StatsCard ~ data:", data);
  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={require("../../assets/bgExample.png")}
        blurRadius={40}
        imageStyle={{ borderRadius: 15 }}
        style={styles.background}
      >
        <Image source={require("../../assets/bg.jpeg")} style={styles.image} />
        <AppText style={styles.title}>{data.title}</AppText>
        <AppText style={styles.title}>Player 1</AppText>
        <AppText style={styles.subTitle}> 1344</AppText>
        <AppText style={styles.secondTitle}>{data.subTitle}: 13</AppText>
        <AppText style={styles.secondTitle}>{data.subTitle2}: 887</AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    shadowRadius: 4,
    padding: 5,
    marginTop: 5,
    width: 350,
    height: 300,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.pink,
  },
  secondTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 15,
  },
  subTitle: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 22,
  },
});
export default StatsCard;
