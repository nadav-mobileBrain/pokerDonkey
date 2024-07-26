import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet,ImageBackground } from "react-native";

import ActivityIndicator from "../../components/ActivityIndicator";
import AllGamesCard from "../../components/games/AllGamesCard";
import AppLogo from "../../components/AppLogo";
import colors from "../../config/colors";
import gameApi from "../../api/game";
import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";

const AllGamesScreen = ({ route,leagueIdForPushNotifications = null }) => {

  const leagueId = route.params.league.id;
  const league = route.params.league;
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initially true to load the first page
  const [continuationToken, setContinuationToken] = useState(0);

  const fetchGames = async () => {
    const result = await gameApi.getAllGamesForLeague(
      leagueId,
      continuationToken
    );
    if (!result.ok) {
      setError("Failed to load games");
      setIsLoading(false);
      return;
    }
    // Append new games to the existing games
    setGames((prevGames) => [...prevGames, ...result.data.games]);
    setContinuationToken(result.data.nextContinuationToken); // Update the continuation token
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
    <ActivityIndicator visible={isLoading} />
    <Screen style={styles.container}>
    <ImageBackground
    blurRadius={3}
      style={styles.background}
      source={require("../../assets/appLogo.png")}>
          <View style={styles.overlay} />
      <AppLogo />
      {games.length === 0 ? (
        <Text style={styles.noGames}>
          No games found! start a game to see stats
        </Text>
      ) : null}
      <HeaderText style={styles.header}>{league?.league_name}</HeaderText>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AllGamesCard game={item} />}
        onEndReached={() => {
          if (!isLoading && continuationToken) {
            // Only load more if not currently loading and there's a token
            fetchGames();
          }
        }}
        onEndReachedThreshold={0.1}
      />
      {error ? <Text>Error: {error}</Text> : null}
    </ImageBackground>
    </Screen>
    </> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  background: {
    flex: 1,
    padding: 20,
  },
  gameText: {
    fontSize: 16,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 100,
  },
  header: {
    fontSize: 25,
    color: colors.gold,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    marginVertical: 10,
    padding: 20,
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent background for better readability
    borderRadius: 10,
    marginVertical: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.20,
  },
  noGames: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default AllGamesScreen;
