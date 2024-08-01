import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
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



import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required().label("Nick Name"),
  image: Yup.string().label("Image"),
});

const RegisterScreen = () => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(null); // New state for image URI
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId: "959357331447-lji0rdg82ekg12543ghd1p37at4r3egg.apps.googleusercontent.com",
    iosClientId: "959357331447-e0ntispaog6ak5tfe4l853t6msplpog0.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "pokerdonkey", // Replace with your custom scheme
      
    }),
  });
  
  useEffect(() => {
    console.log("🚀 ~ RegisterScreen ~ response:", response)
    console.log("🚀 ~ RegisterScreen ~ request:", request)
    if (response?.type === "success") {
      const { authentication } = response;
      handleSignInWithGoogle(authentication.accessToken);
    }
  }, [response]);

  const handleSignInWithGoogle = async (accessToken) => {
    try {
      const userInfo = await getUserInfo(accessToken);
      console.log("🚀 ~ handleSignInWithGoogle ~ userInfo:", userInfo)
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async (token) => {
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfoJson = await userInfoResponse.json();
    console.log(userInfoJson);
    return userInfoJson;
  };

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
        <LinearGradient colors={colors.primaryGradientArray} style={styles.background}>
          <AppLogo />
          <AppForm
            initialValues={{ nickName: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField autoCorrect={false} icon="account" name="nickName" placeholder="Nick Name" />
            <View style={{ alignItems: "flex-end" }}>
              <ImageInput imageUri={imageUri} onChangeImage={(uri) => setImageUri(uri)} />
              <AppText style={{ color: colors.gold }}>*You can add/change your image later</AppText>
            </View>
            <AppText style={{ color: colors.gold }}>{JSON.stringify(userInfo)}</AppText>
            <Button title="Sign in with Google" onPress={() => promptAsync()} />
            <SubmitButton title="Register" icon="account-plus" color="gold" />
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
