import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import React from "react";

import AppText from "../AppText";
import AllGamesCardHeader from "./AllGamesCardHeader";
import AllGamesPlayers from "./AllGamesPlayers";
import colors from "../../config/colors";
import dayjs from "dayjs";
import ListitemSeperator from "../ListitemSeperator";

const AllGamesCard = ({ game }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/appLogo.png")}>
        <View style={styles.overlay} />

        <AppText style={styles.gameDetails}>
          {dayjs(game.created_at).format("DD/MM/YYYY")}
        </AppText>
        <AppText style={styles.gameDetails}>
          {dayjs(game.created_at).format("HH:mm")}-
          {dayjs(game.updated_at).format("HH:mm")}
        </AppText>
        <AppText style={styles.gameManager}>
          Game Manager:
          {game?.game_manager?.nickName}
        </AppText>
        {game.isOpen && <AppText style={styles.isOpen}>Live Game</AppText>}
      </ImageBackground>
      <FlatList
        data={game.user_games}
        keyExtractor={(item) => item.user_id.toString()}
        ListHeaderComponent={<AllGamesCardHeader />}
        renderItem={({ item }) => <AllGamesPlayers player={item} />}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.surface,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  isOpen: {
    width: "100%",
    textAlign: "center",
    padding: 5,
    //flickering neon green
    color: colors.neonGReen,
    textShadowColor: colors.neonGReen,
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
  gameDetails: {
    width: "100%",
    textAlign: "center",
    padding: 5,
    color: colors.white,
    height: 40,
  },
  gameManager: {
    width: "100%",
    textAlign: "center",
    color: colors.white,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.4,
  },
});

export default AllGamesCard;
