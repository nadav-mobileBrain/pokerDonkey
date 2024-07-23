import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required().label("Nick Name"),
  password: Yup.string().required().min(4).label("Password"),
  image: Yup.string().label("Image"),
});

const RegisterScreen = () => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(null); // New state for image URI

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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <View style={{ alignItems: "flex-start" }}>
            <ImageInput
              imageUri={imageUri}
              onChangeImage={(uri) => setImageUri(uri)}
            />
            <AppText style={{ color: colors.gold }}>
              *You can add/change your image later
            </AppText>
          </View>
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
