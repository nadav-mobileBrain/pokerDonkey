import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import config from "../../config/config";
import AppText from "../AppText";

const PlayerAvatar = () => {
  const { user } = useAuth();
  // const url = config.s3.baseUrl + user.image;
  let url = user.image;
  //if url is not a full url, add the base url
  if (!url.includes("http")) {
    url = config.s3.baseUrl + user.image;
  }
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.PERSONAL_STATS)}
    >
      <View style={styles.avatarContainer}>
        <Image style={styles.image} source={{ uri: url }} />
        <AppText style={styles.title}>{user?.nickName}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "flex-end",
  },
  avatarContainer: {
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.white,
    borderWidth: 2,
  },
  title: {
    fontSize: 11,
   // fontFamily: "Roboto_400Regular",
    color: colors.light,
    marginTop: 5,
    textAlign: "center",
  },
});

export default PlayerAvatar;
