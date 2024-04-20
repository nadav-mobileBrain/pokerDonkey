import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import dayjs from "dayjs";

import apiClient from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo"; // Add this import statement
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import useApi from "../../hooks/useApi";
import getLeaguePlayers from "../../api/leagues";
import gameApi from "../../api/game";

const LeagueDetailsScreen = ({ route, navigation }) => {
  const league = route.params.item.league;
  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLiveGameOn, setIsLiveGameOn] = useState(false);
  const getLeaguePlayersApi = useApi(getLeaguePlayers.getLeaguePlayers);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);
  const serverUrl = apiClient.getBaseURL();

  useEffect(() => {
    const getLeaguePlayers = async () => {
      setLoading(true);
      const result = await getLeaguePlayersApi.request(league.id);
      if (!result.ok) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setLeaguePlayers(result.data?.leaguePlayers);
    };
    const checkIfOpenGames = async () => {
      const result = await checkIfOpenGameExist.request(league.id);
      if (result.ok) {
        if (result.data) {
          setIsLiveGameOn(true);
        }
      }
    };
    checkIfOpenGames();
    getLeaguePlayers();
  }, []);

  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <AppLogo />
      <ActivityIndicator visible={loading} />
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
            title={isLiveGameOn ? "Join Live Game" : "Start A New Game"}
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
        <AppText style={styles.created}>
          Created At: {dayjs(league?.created_at).format("DD/MM/YYYY")}
        </AppText>
      </View>
    </Screen>
  );
};

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
    padding: 10,
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
