import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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

const LeagueScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const userLeagues = await getLeaguesApi.request();
      setLeagues(userLeagues?.data?.leaguePlayers);
    };

    setTimeout(() => {
      fetchLeagues();
    }, 1000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={getLeaguesApi.loading} />
      <Screen style={styles.screen}>
        <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
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
          {getLeaguesApi.data?.leagues?.length === 0 && (
            <NoLeagues navigation={navigation} />
          )}

            {getLeaguesApi.data?.leagues?.length > 0 && (
              <CreatejoinLeagues navigation={navigation} />
            )}

          {getLeaguesApi.data?.leagues?.length > 0 && (
            <FlatList
              data={getLeaguesApi.data.leagues}
              keyExtractor={(league) => league.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.league.league_name}
                  subTitle={`League Number: ${item.league.league_number}`}
                  imageUrl={`${config.s3.baseUrl}${item.league.league_image}`}
                  onPress={() =>
                    navigation.navigate(routes.LEAGUE_DETAILS, {
                      item,
                      data: getLeaguesApi.data,
                    })
                  }
                />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getLeaguesApi.request();
                setRefreshing(false);
              }}
            />
          )}
        </LinearGradient>
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
