import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import Screen from "../../components/Screen";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
import AppLogo from "../../components/AppLogo";
import colors from "../../config/colors";

const vaslidationSchema = Yup.object().shape({
  nickName: Yup.string().required().min(2).label("Nick Name"),
  //password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ nickName, password }) => {
    const result = await authApi.login({ nickName, password });

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);
  };
  return (
    <Screen style={styles.container}>
       <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
      <AppLogo />
      <AppForm
        initialValues={{ nickName: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={vaslidationSchema}>
        <ErrorMessage
          error="Invalid Nick Name or Password"
          visible={loginFailed}
        />
        <AppFormField
          name="nickName"
          placeholder="Nick Name"
          icon="account"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <SubmitButton title="Login" color="gold" />
      </AppForm>
      </LinearGradient>
    </Screen>
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
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
