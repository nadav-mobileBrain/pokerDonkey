import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAptabase } from '../../hooks/useAptabase';

import AppLogo from '../../components/AppLogo';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import Container from 'toastify-react-native';

import PlayerAvatar from '../../components/player/PlayerAvatar';
import PlayerStatsCard from '../../components/stats/PlayerStatsCard';
import Screen from '../../components/Screen';
import AppButton from '../../components/AppButton';

const MainStatsScreen = ({ route }) => {
  const { league } = route.params;
  const navigation = useNavigation();
  const { trackEvent } = useAptabase();

  return (
    <Screen>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/appLogo.webp')}
      >
        <View style={styles.overlay} />
        <Container position="top" width="100%" />
        <PlayerAvatar />
        <AppLogo />
        <PlayerStatsCard league={league} />
        <View style={styles.allGamesContainer}>
          <AppButton
            title="All Games"
            color="gold"
            onPress={() => {
              trackEvent('All Games Button Pressed', { league: league.name });
              navigation.navigate('AllGames', { league });
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://buymeacoffee.com/nadavg1000m')
          }
        >
          <AppText style={styles.developerText}>
            Developed By Nadav Galili 🧙‍♂️
          </AppText>
          <AppText style={styles.buyMeCoffe}>Buy Me A Coffee ☕️</AppText>
        </TouchableOpacity>
      </ImageBackground>
    </Screen>
  );
};
const styles = StyleSheet.create({
  allGamesContainer: {
    // flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  buyMeCoffe: {
    color: colors.gold,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 5,
  },
  developerText: {
    color: colors.gold,
    textAlign: 'center',
    fontSize: 10,
  },
  remark: {
    color: colors.light,
    fontSize: 10,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.45,
  },
});
export default MainStatsScreen;
