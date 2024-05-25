import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import config from "../../config/config";

const PlayerAvatar = () => {
  const { user } = useAuth();
  const url = config.s3.baseUrl + user.image;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.PERSONAL_STATS)}>
      <Image style={styles.image} source={{ uri: url }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 20,
    height: 35,
    width: 35,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default PlayerAvatar;
