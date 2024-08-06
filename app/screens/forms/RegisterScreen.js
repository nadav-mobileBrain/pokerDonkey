//ios 959357331447-a7eq0ljslvpgt642e658o3etc9s8g3vl.apps.googleusercontent.com
///android 959357331447-6i9t65ceb4hdscse55scicb5v4vj3uud.apps.googleusercontent.com
//web 959357331447-c7n207hsvgjj8sg1il9dufetvid1h1oa.apps.googleusercontent.com
import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View, Button} from "react-native";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import AppLogo from "../../components/AppLogo";
import ActivityIndicator from "../../components/ActivityIndicator";
import authApi from "../../api/auth";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import colors from "../../config/colors";
import logger from "../../utility/logger";


 import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";



const RegisterScreen = () => {
  // const registerApi = useApi(usersApi.register);
  const signinWithGoogleApi = useApi(usersApi.googleSignin);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  // const [imageUri, setImageUri] = useState(null); // New state for image URI
  const [userInfo, setUserInfo] = useState(null);



const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: '959357331447-c7n207hsvgjj8sg1il9dufetvid1h1oa.apps.googleusercontent.com',
   androidClientId:"959357331447-6i9t65ceb4hdscse55scicb5v4vj3uud.apps.googleusercontent.com",
   iosClientId:"959357331447-a7eq0ljslvpgt642e658o3etc9s8g3vl.apps.googleusercontent.com"
  });
}

useEffect(() => {
  configureGoogleSignin();
}, []);
const signIn = async () => {

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setUserInfo(userInfo);
    setError(null);
    const result = await signinWithGoogleApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log("🚀 ~ signIn ~ result:", result)
        logger.log(result);
      }
      return;
    }

    const user = result?.data?.user;
    const { data: authToken } = await loginApi.request(user);
    auth.logIn(authToken);
  } catch (e) {
    console.log("🚀 ~ signIn ~ e:", e)
    setError(e);
    logger.log(e);
  }
};


  return (
    <>
      <ActivityIndicator visible={signinWithGoogleApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
      <ImageBackground
      style={styles.background}
      source={require("../../assets/appLogo.png")}
      blurRadius={10}
      >
         <View style={styles.overlay} />
       <AppLogo />
            <AppText style={styles.comment}>
              *You can add/change your image and name later
            </AppText>
            {error && <AppText style={{color:'red'}}>{error}</AppText>}
          {/* {userInfo && <AppText style={{color:'white'}}>{JSON.stringify(userInfo.user)}</AppText>} */}
       
        {/* <Button title="Logout" onPress={logout} /> */}
    
      
        <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} style={styles.googleButton}/>
      

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
    alignSelf: "center",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  googleButton: {
    width: '80%',
    height: 60,
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.30,
  },
});

export default RegisterScreen;

