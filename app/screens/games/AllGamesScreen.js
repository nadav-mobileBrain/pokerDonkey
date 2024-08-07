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
    blurRadius={4}
      style={styles.background}
      source={require("../../assets/cardstats.jpg")}>
      <View style={styles.overlay} />
      <AppLogo />
      {games.length === 0 ? (
        <Text style={styles.noGames}>
          No games found! start a game to see stats
        </Text>
      ) : null}
      <HeaderText style={{color:colors.secondary}}>{league?.league_name}</HeaderText>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  gameText: {
    fontSize: 16,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 100,
  },
  noGames: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default AllGamesScreen;
