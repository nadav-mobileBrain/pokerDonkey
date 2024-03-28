import React from "react";
import { View, StyleSheet, Image } from "react-native";

import apiClient from "../../api/client";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo"; // Add this import statement
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import AppLogo from "../../components/AppLogo";

function LeagueDetailsScreen({ route, navigation }) {
  const league = route.params.item.league;
  const leaguePlayers = route.params.data.leaguePlayers;

  const serverUrl = apiClient.getBaseURL();
  const createdAtDate = new Date(league.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("en-GB");

  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <AppLogo />
      <View style={styles.playerContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${serverUrl}${league.league_image}` }}
        />
        <View style={styles.detailsContainer}>
          <AppText>League Name : {league.league_name}</AppText>
          <AppText>League Number : {league.league_number}</AppText>
          <AppText>Admin : {league.leagueAdmin?.nickName}</AppText>
        </View>
        <PlayerInfo leaguePlayers={leaguePlayers} />
        <View style={styles.buttonContainer}>
          <AppButton
            title="League Stats"
            icon="chart-box-outline"
            color="AccentPurple"
            onPress={() => navigation.navigate(routes.STATS, { league })}
          />
          <AppButton
            title="Start a new game"
            color="LightSkyBlue"
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
  buttonContainer: {
    paddingHorizontal: 20,
  },
  created: {
    paddingHorizontal: 20,
    fontSize: 10,
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

  playerContainer: {
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default LeagueDetailsScreen;
