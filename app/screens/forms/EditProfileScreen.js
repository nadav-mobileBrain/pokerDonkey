import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import config from "../../config/config";
import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import authStorage from "../../auth/storage";
import AuthContext from "../../auth/context";
import logger from "../../utility/logger";
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

  const updatePersonaldetailsApi = useApi(usersApi.updatePersonaldetails);
  const auth = useAuth();
  const { user } = useAuth();
  console.log("🚀 ~ EditProfileScreen ~ user:", user)
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(`${config.s3.baseUrl}${user.image}`);

  const handleSubmit = async (userInfo) => {
    const completeUserInfo = {
      ...userInfo,
      image: imageUri,
      userId: user.userId,
    };

    const result = await updatePersonaldetailsApi.request(completeUserInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
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
      <ActivityIndicator visible={updatePersonaldetailsApi.loading} />
      <Screen style={styles.container}>
        <LinearGradient colors={colors.primaryGradientArray} style={styles.background}>
          <AppForm
            initialValues={{ nickName: user?.nickName }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="nickName"
              //placeholder="Nick Name"
             // value={user.nickName}
            />
            <View style={{ alignItems: "flex-end" }}>
              <ImageInput
                imageUri={imageUri}
                onChangeImage={(uri) => setImageUri(uri)}
              />
            </View>
            <SubmitButton title="Edit Details" icon="account-edit" color="gold" />
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

export default EditProfileScreen;
