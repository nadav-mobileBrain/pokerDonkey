import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

import apiClient from "../../api/client";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo"; // Add this import statement
import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";

function LeagueDetailsScreen({ route }) {
  const league = route.params.item.league;
  const leaguePlayers = route.params.data.leaguePlayers;

  const serverUrl = apiClient.getBaseURL();
  const createdAtDate = new Date(league.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("en-GB");

  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <View style={styles.playerContainer}>
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
        <View style={styles.buttonContainer}>
          <AppButton title="League Stats" icon="chart-box-outline" />
          <AppButton
            title="Start a new game"
            color="LimeGreen"
            icon="cards-playing-spade-multiple-outline"
          />
        </View>
        {/* <PlayerInfo leaguePlayers={leaguePlayers} /> */}
        <AppText style={styles.created}>Created At: {formattedDate}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  admin: {
    color: colors.AccentPurple,
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  created: {
    color: colors.black,
    padding: 20,
    fontSize: 20,
    marginVertical: 10,
  },
  container: {
    backgroundColor: colors.light,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 120,
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
  },
  playerContainer: {
    margin: 10,
    backgroundColor: colors.white,
  },
});

export default LeagueDetailsScreen;
