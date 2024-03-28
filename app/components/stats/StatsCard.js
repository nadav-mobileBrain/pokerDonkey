import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import AppText from "../AppText";
import apiClient from "../../api/client";
import colors from "../../config/colors";

const StatsCard = ({ data, leagueId }) => {
  const serverUrl = apiClient.getBaseURL();
  const navigation = useNavigation(); // Add this line

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
      <View style={styles.bottomDetails}>
        <AppText style={styles.title}>{data.title}</AppText>
        <AppText>{data?.values?.nickName}</AppText>
        <AppText>{data?.values?.titleValue}</AppText>
        <AppText>
          {data.subTitle}: {data?.values?.subTitleValue}
        </AppText>
        <AppText>
          {data.subTitle2}: {data?.values?.subTitle2Value}
        </AppText>
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
    height: 270,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
  },
  title: {
    fontSize: 25,
    textDecorationLine: "underline",
    color: colors.AccentPurple,
  },
});
export default StatsCard;
