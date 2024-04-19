import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import LeagueLogo from "../leagues/LeagueLogo";
import dayjs from "dayjs";

function GameDetails({ league, game }) {
  console.log("🚀 ~ GameDetails ~ game:", game);
  return (
    <View style={styles.gameDetailsContainer}>
      <LeagueLogo
        logoUrl={league.league_image}
        leagueName={league.league_name}
      />
      <AppText style={styles.gameDate}>
        Started At: {dayjs(game.created_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText>
      <AppText style={styles.gameDate}>
        Updated At: {dayjs(game.updated_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText>
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
    fontSize: 14,
  },
});

export default GameDetails;
