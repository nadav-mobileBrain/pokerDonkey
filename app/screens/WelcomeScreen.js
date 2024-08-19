import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import AppLogo from '../components/AppLogo';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import AppText from '../components/AppText';

const WelcomeScreen = ({ navigation }) => {
  const { logIn, logOut } = useAuth();
  const [readMore, setReadMore] = useState(false);

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
    <ImageBackground
      style={styles.container}
      source={require('../assets/appLogo.png')}
      blurRadius={7}
    >
      <View style={styles.logoContainer}>
        <AppLogo />
        <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.headerInfoTagLine}>
          Collect and display stats of your league's games.
        </Text>
        <Text style={styles.infoTagLine}>
          Create or join a league with your friends and track every game. See
          who comes out on top and who needs to sharpen their poker skills.
          Share your results and challenge each other to be the best!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Take A Tour"
          color="secondary"
          onPress={() => takeATour()}
          icon="arrow-right-bold-outline"
        />
        <AppButton
          title="Register/Login"
          color="gold"
          onPress={() => navigation.navigate('Register')}
          icon="account-plus"
        />
        <TouchableOpacity onPress={() => navigation.navigate('HowToPlay')}>
          <Text style={styles.helpLink}>How To Play?</Text>
        </TouchableOpacity>

        <AppText style={{ color: colors.gold, textAlign: 'center' }}>
          Developed By Nadav Galili 🧙‍♂️{' '}
        </AppText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  helpLink: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  logoContainer: {
    position: 'absolute',
    top: 120,
    alignItems: 'center',
  },
  tagLine: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: colors.gold,
    textAlign: 'center',
  },
  headerInfoTagLine: {
    fontSize: 19,
    color: colors.gold,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent background for better readability
    borderRadius: 10,
    marginVertical: 20,
  },
  infoTagLine: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: colors.gold,
    textAlign: 'center',
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default WelcomeScreen;
