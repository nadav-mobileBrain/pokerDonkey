import React from "react";
import { Image, View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import apiClient from "../../api/client";

function PlayerAvatar() {
  const { user } = useAuth();
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
    borderRadius: 20,
    height: 40,
    width: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default PlayerAvatar;
