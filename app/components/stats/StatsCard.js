import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../AppText";
import apiClient from "../../api/client";
import colors from "../../config/colors";

const StatsCard = ({ data, leagueId }) => {
  const serverUrl = apiClient.getBaseURL();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CardStats", { data: data, leagueId: leagueId })
      }>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}>
        <Image
          source={{ uri: `${serverUrl}${data?.values?.image}` }}
          style={styles.image}
        />
      </ImageBackground>
      <LinearGradient
        colors={[colors.LightSkyBlue, colors.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomDetails}>
        <AppText style={styles.title}>{data.title}</AppText>
        <AppText>{data?.values?.nickName}</AppText>
        <AppText>
          {data?.cardTitle}: {data?.values?.titleValue}
        </AppText>
        <AppText>
          {data.subTitle}: {data?.values?.subTitleValue}
        </AppText>
        <AppText>
          {data.subTitle2}: {data?.values?.subTitle2Value}
        </AppText>
      </LinearGradient>
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
    backgroundColor: colors.LightSkyBlue,
    flex: 1,
  },
  card: {
    borderRadius: 25,
    overflow: "hidden",
    borderColor: colors.AccentPurple,
    borderWidth: 2,
    marginTop: 10,
    width: 290,
    height: 250,
    alignSelf: "center",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
  },
  title: {
    fontSize: 22,
    textDecorationLine: "underline",
    color: colors.AccentPurple,
  },
});
export default StatsCard;
