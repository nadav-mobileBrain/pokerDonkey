import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import dayjs from "dayjs";

import ActivityIndicator from "../../components/ActivityIndicator";
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import gameApi from "../../api/game";
import getLeaguePlayers from "../../api/leagues";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo"; // Add this import statement
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import useApi from "../../hooks/useApi";

const LeagueDetailsScreen = ({ route, navigation }) => {
  const league = route.params.item.league;
  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLiveGameOn, setIsLiveGameOn] = useState(false);
  const getLeaguePlayersApi = useApi(getLeaguePlayers.getLeaguePlayers);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);

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
    <>
    <ActivityIndicator visible={getLeaguePlayersApi.loading || loading} />
    <Screen style={styles.container}>
    <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
      <PlayerAvatar />
      <AppLogo />
      <View style={styles.playerContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${config.s3.baseUrl}${league.league_image}` }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.leagueInfo}>League Name : {league.league_name}</AppText>
          <AppText style={styles.leagueInfo}>League Number : {league.league_number}</AppText>
          <AppText style={styles.leagueInfo}>Admin : {league.leagueAdmin?.nickName}</AppText>
        </View>
        <PlayerInfo leaguePlayers={leaguePlayers} /> 
        <View style={styles.buttonContainer}>
          <AppButton
            title="League Stats"
            icon="chart-box-outline"
            color="gold"
            onPress={() => navigation.navigate(routes.STATS, { league })}
          />
          <AppButton
            title={isLiveGameOn ? "Join Live Game" : "Start A New Game"}
            color="secondary"
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
 </LinearGradient>
    </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  created: {
    paddingHorizontal: 20,
    fontSize: 10,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 3,
  },
leagueInfo:{
  fontSize:15
},
  playerContainer: {
    borderRadius: 15,
    backgroundColor: colors.surface,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 20,  // Add paddingBottom here
  },
    scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 30,  // Add paddingBottom here
  },
});

export default LeagueDetailsScreen;
