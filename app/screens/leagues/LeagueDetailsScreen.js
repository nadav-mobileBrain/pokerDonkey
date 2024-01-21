import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

import apiClient from "../../api/client";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo"; // Add this import statement
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";

function LeagueDetailsScreen({ route, navigation }) {
  const league = route.params.item.league;
  // console.log("🚀 ~ LeagueDetailsScreen ~ league:", league);
  const leaguePlayers = route.params.data.leaguePlayers;
  // console.log("🚀 ~ LeagueDetailsScreen ~ leaguePlayers:", leaguePlayers);
  // const leagueAdmin = leaguePlayers.filter(
  //   (player) => player.is_admin === true
  // );

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
        <PlayerInfo leaguePlayers={leaguePlayers} />
        <View style={styles.buttonContainer}>
          <AppButton title="League Stats" icon="chart-box-outline" />
          <AppButton
            title="Start a new game"
            color="LimeGreen"
            icon="cards-playing-spade-multiple-outline"
            onPress={() =>
              navigation.navigate(routes.SELECT_PLAYERS, {
                leaguePlayers,
                league,
              })
            }
          />
        </View>
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
    paddingHorizontal: 20,
  },
  created: {
    color: colors.black,
    paddingHorizontal: 20,
    fontSize: 20,
    marginVertical: 10,
  },
  container: {
    backgroundColor: colors.light,
  },
  detailsContainer: {
    paddingHorizontal: 20,
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
  },
  title: {
    color: colors.PrimaryBlue,
    fontWeight: "500",
    fontSize: 24,
  },
  playerContainer: {
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default LeagueDetailsScreen;
