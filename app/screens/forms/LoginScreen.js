import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import Screen from "../../components/Screen";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms";
import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";

const vaslidationSchema = Yup.object().shape({
  nickName: Yup.string().required().min(2).label("Nick Name"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ nickName, password }) => {
    const result = await authApi.login(nickName, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    const user = jwtDecode(result.data.token);
    authContext.setUser(user);
    authStorage.storeToken(result.data.token);
  };
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/appLogo.png")} />
      <AppForm
        initialValues={{ nickName: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={vaslidationSchema}
      >
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

        <AppFormField
          placeholder="Password"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry
          name="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
