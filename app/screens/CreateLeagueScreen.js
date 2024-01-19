import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import ErrorMessage from "../components/forms/ErrorMessage";
import HeaderText from "../components/HeaderText";
import ImageInput from "../components/forms/ImageInput";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  leagueName: Yup.string().min(2).required().label("League Name"),
  image: Yup.string().label("Image"),
});

function CreateLeagueScreen(props) {
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(null); // New state for image URI

  const handleSubmit = async (leagueInfo) => {
    const completeLeagueInfo = {
      ...leagueInfo,
      image: imageUri,
    };
    console.log("🚀 ~ handleSubmit ~ completeLeagueInfo:", completeLeagueInfo);
  };

  return (
    <Screen style={styles.container}>
      <HeaderText>Create League</HeaderText>
      <AppForm
        initialValues={{ leagueName: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="leagueName"
          placeholder="League Name"
        />
        <ImageInput
          imageUri={imageUri}
          onChangeImage={(uri) => setImageUri(uri)}
        />
        <SubmitButton title="Create League" />
        <AppText style={styles.remark}>
          Note: You will be the admin of this league.
        </AppText>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  remark: {
    color: colors.AccentPurple,
    fontSize: 15,

    marginTop: 10,
  },
});

export default CreateLeagueScreen;
