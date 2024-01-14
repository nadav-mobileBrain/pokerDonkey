import { Image, StyleSheet } from "react-native";
import { Formik } from "formik";

import Screen from "../../components/Screen";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";

function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/appLogo.png")} />
      <Formik
        initialValues={{ nickName: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <AppTextInput
              placeholder="Nick Name"
              icon="account"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("nickName")}
            />
            <AppTextInput
              placeholder="Password"
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
            />
            <AppButton title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
