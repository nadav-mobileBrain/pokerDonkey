import React from "react";
import { Image, View, StyleSheet } from "react-native";

import AppText from "../AppText";
import AppButton from "../AppButton";
import routes from "../../navigation/routes";

function NoLeagues({ navigation }) {
  return (
    <View style={styles.noLeaguesContainer}>
      <Image
        source={require("../../assets/noLeagues.png")}
        style={styles.image}
      />
      <AppText>You have no leagues yet...😳</AppText>
      <AppButton
        title="Join private league"
        onPress={() => navigation.navigate(routes.JOIN_LEAGUE)}
        color="AccentPurple"
        icon="account-group"
      />
      <AppButton
        title="Create a new  league"
        onPress={() =>
          navigation.navigate(routes.CREATE_LEAGUE, { navigation })
        }
        icon="account-multiple-plus"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noLeaguesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
    borderRadius: 15,
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
});

export default NoLeagues;
