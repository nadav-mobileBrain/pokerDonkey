import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import gameApi from "../../api/game";

const AllGamesScreen = ({ route }) => {
  const leagueId = route.params.league.id;
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Initially true to load the first page
  const [continuationToken, setContinuationToken] = useState(0);

  const fetchGames = async () => {
    const result = await gameApi.getAllGamesForLeague(
      leagueId,
      continuationToken
    );
    if (!result.ok) {
      setError("Failed to load games");
      setLoading(false);
      return;
    }
    // Append new games to the existing games
    setGames((prevGames) => [...prevGames, ...result.data.games]);
    setContinuationToken(result.data.nextContinuationToken); // Update the continuation token
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.gameText}>
            {item.id}: {new Date(item.created_at).toLocaleString()}
          </Text>
        )}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        onEndReached={() => {
          if (!loading && continuationToken) {
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
});

export default AllGamesScreen;
