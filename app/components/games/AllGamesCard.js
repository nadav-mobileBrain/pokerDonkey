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
        data={game.userGames}
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
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
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
    opacity: 0.5,
  },
});

export default AllGamesCard;
