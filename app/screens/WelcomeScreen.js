import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import AppLogo from '../components/AppLogo';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import AppText from '../components/AppText';
import HowToPlay from '../components/HowToPlay';
import Screen from '../components/Screen';

const WelcomeScreen = ({ navigation }) => {
  const { logIn, logOut } = useAuth();
  const [readMore, setReadMore] = useState(false);
  const insets = useSafeAreaInsets();

  const takeATour = async () => {
    logOut();
    try {
      const result = await authApi.login({
        google_id: '100975266796150070789',
      });
      logIn(result.data);
    } catch (error) {
      console.error('Error during guest login', error);
    }
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Screen>
      <ImageBackground
        style={styles.background}
        source={require('../assets/appLogo.png')}
        blurRadius={7}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <AppLogo />
            <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.headerInfoTagLine}>
              Collect and display stats of your league's games.
            </Text>
            <Text style={styles.infoTagLine}>
              Create or join a league with your friends and track every game.
              See who comes out on top and who needs to sharpen their poker
              skills. Share your results and challenge each other to be the
              best!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Take A Tour"
              color="secondary"
              onPress={takeATour}
              icon="arrow-right-bold-outline"
            />
            <AppButton
              title="Register/Login"
              color="gold"
              onPress={() => navigation.navigate('Register')}
              icon="account-plus"
            />
            <HowToPlay navigation={navigation} />
            <AppText style={styles.developerText}>
              Developed By Nadav Galili 🧙‍♂️
            </AppText>
          </View>
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  tagLine: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: colors.gold,
    textAlign: 'center',
  },
  info: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    marginVertical: 20,
  },
  headerInfoTagLine: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoTagLine: {
    fontSize: 11,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  developerText: {
    color: colors.gold,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default WelcomeScreen;
