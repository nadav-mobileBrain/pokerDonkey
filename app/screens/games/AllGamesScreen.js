import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../../components/ActivityIndicator";
import AllGamesCard from "../../components/games/AllGamesCard";
import AppLogo from "../../components/AppLogo";
import gameApi from "../../api/game";
import HeaderText from "../../components/HeaderText";

const AllGamesScreen = ({ route }) => {
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
    <View style={styles.container}>
      {isLoading && <ActivityIndicator visible={isLoading} />}
      <AppLogo />
      {games.length === 0 ? (
        <Text style={styles.noGames}>
          No games found! start a game to see stats
        </Text>
      ) : null}
      <HeaderText>{league?.league_name}</HeaderText>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
