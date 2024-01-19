import React from "react";
import { View, StyleSheet, Image } from "react-native";

import apiClient from "../api/client";
import AppText from "../components/AppText";
import colors from "../config/colors";
import PlayerDetails from "../components/player/PlayerDetails";
import PlayerAvatar from "../components/player/PlayerAvatar";
import PlayerInfo from "../components/player/PlayerInfo";

function LeagueDetailsScreen({ route }) {
  const league = route.params.item.league;
  const leaguePlayers = route.params.data.leaguePlayers;

  const serverUrl = apiClient.getBaseURL();
  const createdAtDate = new Date(league.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("en-GB");

  return (
    <View style={styles.container}>
      <PlayerAvatar />
      <Image
        style={styles.image}
        source={{ uri: `${serverUrl}${league.league_image}` }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>
          League Name : {league.league_name}
        </AppText>
        <AppText style={styles.leagueNumber}>
          League Number : {league.league_number}
        </AppText>
        <AppText style={styles.admin}>
          Admin : {league.leagueAdmin.nickName}
        </AppText>
      </View>
      <PlayerInfo leaguePlayers={leaguePlayers} />
      <AppText style={styles.created}>Created At: {formattedDate}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  admin: {
    color: colors.AccentPurple,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  created: {
    color: colors.black,
    padding: 20,
    fontSize: 20,
    marginVertical: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    marginBottom: 10,
  },
  leagueNumber: {
    color: colors.pink,
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
