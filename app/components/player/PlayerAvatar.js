import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import apiClient from "../../api/client";

function PlayerAvatar({ imageUrl }) {
  const { user, logOut } = useAuth();
  let serverUrl = apiClient.getBaseURL();
  serverUrl = serverUrl.substring(0, serverUrl.length - 1);
  const url = serverUrl + "/" + user.image;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: url }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 50,
    height: 70,
    width: 70,
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
