//ios 959357331447-a7eq0ljslvpgt642e658o3etc9s8g3vl.apps.googleusercontent.com
///android 959357331447-6i9t65ceb4hdscse55scicb5v4vj3uud.apps.googleusercontent.com
//web 959357331447-c7n207hsvgjj8sg1il9dufetvid1h1oa.apps.googleusercontent.com
import React, { useState, useEffect } from "react";
import { StyleSheet, View , Button} from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppText from "../../components/AppText";
import AppLogo from "../../components/AppLogo";
import ImageInput from "../../components/forms/ImageInput";
import ActivityIndicator from "../../components/ActivityIndicator";
import ErrorMessage from "../../components/forms/ErrorMessage";
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

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required().label("Nick Name"),
  //password: Yup.string().required().min(4).label("Password"),
  image: Yup.string().label("Image"),
});

const RegisterScreen = () => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(null); // New state for image URI
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
  console.log("Pressed sign in");

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("🚀 ~ signIn ~ userInfo:", userInfo.user)
    setUserInfo(userInfo);
    //setError();
  } catch (e) {
   console.log("🚀 ~ signIn ~ e:", e)
   // setError(e);
  }
};

// const signIn =async () =>{
//   console.log("sign in");

//   try {
//     await GoogleSignin.askForPlayServicesAsync();
//     const { type, user } = await GoogleSignin.signInAsync();
//     if (type === 'success') {
//       console.log('user',user);
//       const userInfo = {
//         nickName: user.name,
//         email: user.email,
//         image: user.photoUrl,
//       };
//       console.log('userinf',userInfo);
    
    
      
//     }
//   }catch (error) {
//     console.log(error);
//   }
// }
    




  const handleSubmit = async (userInfo) => {
    const completeUserInfo = {
      ...userInfo,
      image: imageUri,
    };

    const result = await registerApi.request(completeUserInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(userInfo);
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
      <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
        <AppLogo />
        <AppForm
          initialValues={{ nickName: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="nickName"
            placeholder="Nick Name"
          />
          {/* <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          /> */}
          <View style={{ alignItems: "flex-end" }}>
            <ImageInput
              imageUri={imageUri}
              onChangeImage={(uri) => setImageUri(uri)}
            />
            <AppText style={{ color: colors.gold }}>
              *You can add/change your image later
            </AppText>
          </View>
          {userInfo && <AppText>{JSON.stringify(userInfo.user)}</AppText>}
          <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn}/>
          <SubmitButton title="Register" icon="account-plus" color="gold"/>
        </AppForm>
      </LinearGradient>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1, 
  },
  background: {
    flex: 1,
    padding: 20,
  },
});

export default RegisterScreen;
