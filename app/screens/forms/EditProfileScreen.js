import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import authApi from "../../api/auth";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import config from "../../config/config";
import useAuth from "../../auth/useAuth";
import authStorage from "../../auth/storage";
import AuthContext from "../../auth/context";
import ErrorMessage from "../../components/forms/ErrorMessage";
import ImageInput from "../../components/forms/ImageInput";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required().label("Nick Name"),
  image: Yup.string().label("Image"),
});
const EditProfileScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const updatePersonaldetailsApi = useApi(usersApi.updatePersonaldetails);

  const auth = useAuth();
  const { user } = useAuth();
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(`${config.s3.baseUrl}${user.image}`); // New state for image URI

  const handleSubmit = async (userInfo) => {
    const completeUserInfo = {
      ...userInfo,
      image: imageUri,
      userId: user.userId,
    };

    const result = await updatePersonaldetailsApi.request(completeUserInfo);
    console.log("🚀 ~ handleSubmit ~ result:", result);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    const token = result.data.token;
    let authToken = { token: token };
    auth.logIn(authToken);

    restoreUser();
    navigation.navigate(routes.PERSONAL_STATS);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ nickName: user.nickName }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="nickName"
            placeholder={user.nickName}
          />

          <View style={{ alignItems: "flex-end" }}>
            <ImageInput
              imageUri={imageUri}
              onChangeImage={(uri) => setImageUri(uri)}
            />
          </View>
          <SubmitButton title="Edit Details" icon="account-edit" />
        </AppForm>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default EditProfileScreen;
