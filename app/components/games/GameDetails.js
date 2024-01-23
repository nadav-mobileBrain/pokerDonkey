import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import LeagueLogo from "../leagues/LeagueLogo";

function GameDetails({ league, game }) {
  const timeFormat = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const startDate = new Date(game.created_at);
  const updatedAtDate = new Date(game.updated_at);
  const formattedTime = startDate.toLocaleTimeString(undefined, timeFormat);
  const formattedUpdatedTime = updatedAtDate.toLocaleTimeString(
    undefined,
    timeFormat
  );

  return (
    <View style={styles.gameDetailsContainer}>
      <LeagueLogo
        logoUrl={league.league_image}
        leagueName={league.league_name}
      />
      <AppText style={styles.gameDate}>Started At: {formattedTime}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  gameDetailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  gameDate: {
    color: colors.AccentPurple,
  },
});

export default GameDetails;
