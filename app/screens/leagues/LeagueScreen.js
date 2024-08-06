import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList,View, ImageBackground } from "react-native";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import config from "../../config/config";
import Card from "../../components/Card";
import CreatejoinLeagues from "../../components/leagues/CreatejoinLeagues";
import colors from "../../config/colors";
import HeaderText from "../../components/HeaderText";
import leaguesApi from "../../api/leagues";
import NoLeagues from "../../components/leagues/NoLeagues";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import AppLogo from "../../components/AppLogo";
import useAuth from "../../auth/useAuth";
import { useIsFocused } from '@react-navigation/native';

const LeagueScreen = ({ navigation }) => {
  const isFocused = useIsFocused(); // Add this line
  const [refreshing, setRefreshing] = useState(false);
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  const [leagues, setLeagues] = useState([]);
  const { user } = useAuth();

  const fetchLeagues = async () => {
    const userLeagues = await getLeaguesApi.request(user?.userId);
    if (!userLeagues.ok) {
      return;
    }
    setLeagues(userLeagues?.data);
  };


   
  useEffect(() => {
    if (isFocused) {
      fetchLeagues();// Refresh data when the screen is focused
    }
  }, [isFocused]);


  return (
    <>
      <ActivityIndicator visible={getLeaguesApi.loading} />
      <Screen style={styles.screen}>
          <ImageBackground
          style={styles.background}
          blurRadius={7}
          source={require("../../assets/cardstats.jpg")}>
          <View style={styles.overlay} />
            <PlayerAvatar />
            <AppLogo />
          <HeaderText style={styles.headerText}>My Leagues</HeaderText>
          {getLeaguesApi.error && (
            <>
              <AppText style={styles.errorText}>
                Couldn't retrieve the leagues.
              </AppText>
              <AppButton title="Retry" onPress={getLeaguesApi.request} />
            </>
          )}
          {leagues?.leagues?.length === 0 && (
            <NoLeagues navigation={navigation} />
          )}

            {leagues?.leagues?.length > 0 && (
              <CreatejoinLeagues navigation={navigation} />
            )}

          {leagues?.leagues?.length > 0 && (
            <FlatList
              data={leagues.leagues}
              keyExtractor={(league) => league.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.league.league_name}
                  subTitle={`League Number: ${item.league.league_number}`}
                  imageUrl={`${config.s3.baseUrl}${item.league.league_image}`}
                  onPress={() =>
                    navigation.navigate(routes.LEAGUE_DETAILS, {
                      item,
                      data: leagues,
                    })
                  }
                />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchLeagues();
                setRefreshing(false);
              }}
            />
          )}
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.3,
  },

  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textOnPrimary,
    fontFamily: "Roboto_700Bold",
    marginBottom: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Roboto_400Regular",
  },
});

export default LeagueScreen;
