//ios 94290183455-lob683p8mug8m32duf15i3tjcg244dp8.apps.googleusercontent.com
///android 4290183455-5voja0uu1dm88quek47bal5cv7e3198g.apps.googleusercontent.com
//web 94290183455-id1rfsbjqqk5sehm4uc495a8cmhdfk5n.apps.googleusercontent.com
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Button } from 'react-native';

import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import AppLogo from '../../components/AppLogo';
import ActivityIndicator from '../../components/ActivityIndicator';
import authApi from '../../api/auth';
import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import logger from '../../utility/logger';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const RegisterScreen = () => {
  const signinWithGoogleApi = useApi(usersApi.googleSignin);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  console.log('🚀 ~ RegisterScreen ~ error:', JSON.stringify(error));
  // const [imageUri, setImageUri] = useState(null); // New state for image URI
  const [userInfo, setUserInfo] = useState(null);

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId:
        '4290183455-id1rfsbjqqk5sehm4uc495a8cmhdfk5n.apps.googleusercontent.com',
      androidClientId:
        '4290183455-5voja0uu1dm88quek47bal5cv7e3198g.apps.googleusercontent.com',
      iosClientId:
        '4290183455-lob683p8mug8m32duf15i3tjcg244dp8.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
      console.log('🚀 ~ signIn ~ setUserInfo:', setUserInfo);

      const result = await signinWithGoogleApi.request(userInfo);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError('An unexpected error occurred.');
          logger.log(result);
        }
        return;
      }

      const user = result?.data?.user;

      const { data: authToken } = await loginApi.request(user);

      auth.logIn(authToken);
    } catch (e) {
      setError(e);
      console.error('Google Sign-In Error:', e);
      logger.log(e);
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={signinWithGoogleApi.loading || loginApi.loading}
      />
      <Screen style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('../../assets/appLogo.webp')}
          blurRadius={10}
        >
          <View style={styles.overlay} />
          <AppLogo />
          <AppText style={styles.comment}>
            *You can add/change your image and name later
          </AppText>
          {error && (
            <AppText style={{ color: 'red' }}>{JSON.stringify(error)}</AppText>
          )}
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            style={styles.googleButton}
          />
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comment: {
    color: colors.gold,
    fontSize: 20,
    margin: 20,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    padding: 20,
  },
  googleButton: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.3,
  },
});

export default RegisterScreen;
