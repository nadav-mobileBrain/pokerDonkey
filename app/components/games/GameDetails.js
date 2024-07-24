import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import LeagueLogo from "../leagues/LeagueLogo";
import dayjs from "dayjs";

const GameDetails = ({ league, game }) => {
  return (
    <View style={styles.gameDetailsContainer}>
      <LeagueLogo
        logoUrl={league.league_image}
        leagueName={league.league_name}
      />
      <AppText >Game Admin:{game?.gameManager?.nickName}</AppText>
      <AppText style={styles.gameDate}>
        Started At: {dayjs(game.created_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText>
      {/* <AppText style={styles.gameDate}>
        Updated At: {dayjs(game.updated_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  gameDetailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    backgroundColor: colors.gold,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
  },
  gameDate: {
    // color: colors.primary,
    fontSize: 14,
  },
});

export default GameDetails;
