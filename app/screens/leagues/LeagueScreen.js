import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ActivityIndicator from '../../components/ActivityIndicator';
import AppButton from '../../components/AppButton';
import AppLogo from '../../components/AppLogo';
import AppText from '../../components/AppText';
import config from '../../config/config';
import Card from '../../components/Card';
import CreatejoinLeagues from '../../components/leagues/CreatejoinLeagues';
import colors from '../../config/colors';
import HeaderText from '../../components/HeaderText';
import leaguesApi from '../../api/leagues';
import NoLeagues from '../../components/leagues/NoLeagues';
import PlayerAvatar from '../../components/player/PlayerAvatar';
import routes from '../../navigation/routes';
import Screen from '../../components/Screen';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';

import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';

const LeagueScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  const [leagues, setLeagues] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLeagues, setSelectedLeagues] = useState(null);
  const { user } = useAuth();

  let adUnitId = Platform.select({
    android: 'ca-app-pub-2640391750032066/5559651383',
    ios: 'ca-app-pub-2640391750032066/3655542771',
  });

  const { isLoaded, isClosed, load, show, reward } = useRewardedInterstitialAd(
    __DEV__ ? TestIds.REWARDED_INTERSTITIAL : adUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  console.log('🚀 ~ LeagueScreen ~ reward:', reward);
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed && selectedItem && selectedLeagues) {
      console.log('Interstitial ad closed.');
      navigation.navigate(routes.LEAGUE_DETAILS, {
        item: selectedItem,
        data: selectedLeagues,
      });

      // Reset the selected item and leagues after navigating
      setSelectedItem(null);
      setSelectedLeagues(null);
      load();
    }
  }, [isClosed, selectedItem, selectedLeagues, navigation]);

  useEffect(() => {
    if (isFocused) {
      fetchLeagues(); // Refresh data when the screen is focused
    }
  }, [isFocused]);

  const fetchLeagues = async () => {
    const userLeagues = await getLeaguesApi.request(user?.userId);
    if (!userLeagues.ok) {
      return;
    }
    setLeagues(userLeagues?.data);
  };

  const handleCardPress = (item, leagues) => {
    setSelectedItem(item); // Store selected item
    setSelectedLeagues(leagues); // Store selected leagues

    if (isLoaded) {
      show();
    } else {
      navigation.navigate(routes.LEAGUE_DETAILS, {
        item,
        data: leagues,
      });
    }
  };

  return (
    <>
      <ActivityIndicator visible={getLeaguesApi.loading} />
      <Screen style={styles.screen}>
        <ImageBackground
          style={styles.background}
          blurRadius={7}
          source={require('../../assets/appLogo.png')}
        >
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
                  onPress={() => handleCardPress(item, leagues)}
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
  allApps: {
    color: colors.gold,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.25,
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.light,
    fontFamily: 'Roboto_700Bold',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Roboto_400Regular',
  },
});

export default LeagueScreen;
