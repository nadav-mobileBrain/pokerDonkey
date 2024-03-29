import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import PlayerDetails from "../components/player/PlayerDetails";

function LeagueDetailsScreen({ route }) {
  const league = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={league.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>League Name : {league.name}</AppText>
        <AppText style={styles.leagueNumber}>
          League Number : {league.number}
        </AppText>
        <View style={styles.playerContainer}>
          <PlayerDetails
            title="Bibs"
            subTitle="1200"
            image={require("../assets/bibsDonkey.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  leagueNumber: {
    color: colors.PrimaryBlue,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    marginBottom: 7,
  },
  playerContainer: {
    marginVertical: 40,
  },
});

export default LeagueDetailsScreen;
