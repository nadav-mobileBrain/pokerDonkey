import { Image, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";

const vaslidationSchema = Yup.object().shape({
  nickName: Yup.string().required().min(2).label("Nick Name"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/appLogo.png")} />
      <Text>Register Screen</Text>
      <AppForm
        initialValues={{ nickName: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={vaslidationSchema}
      >
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
        <SubmitButton title="Register" />
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

export default RegisterScreen;
