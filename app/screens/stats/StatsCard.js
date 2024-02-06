import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import React from "react";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

const StatsCard = ({ data }) => {
  console.log("🚀 ~ StatsCard ~ data:", data);
  return (
    <TouchableOpacity style={styles.card} onPress={() => Alert.alert("dfdfd")}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
      >
        <Image
          source={require("../../assets/bibsDonkey.png")}
          style={styles.image}
        />
      </ImageBackground>
      <View style={styles.bottomDetails}>
        <AppText style={styles.title}>{data.title}</AppText>
        <AppText style={styles.title}>Player 1</AppText>
        <AppText style={styles.title}> 1344</AppText>
        <AppText style={styles.subTitle}>{data.subTitle}: 13</AppText>
        <AppText style={styles.subTitle}>{data.subTitle2}: 887</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
  },
  bottomDetails: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
  card: {
    borderRadius: 25,
    overflow: "hidden",
    borderColor: colors.AccentPurple,
    borderWidth: 2,
    marginTop: 10,
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
    color: colors.AccentPurple,
  },

  subTitle: {
    color: colors.pink,
    fontWeight: "bold",
    fontSize: 22,
    paddingBottom: 5,
  },
});
export default StatsCard;
