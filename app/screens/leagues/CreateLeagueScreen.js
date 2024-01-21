import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import colors from "../../config/colors";
import ErrorMessage from "../../components/forms/ErrorMessage";
import HeaderText from "../../components/HeaderText";
import ImageInput from "../../components/forms/ImageInput";
import leaguesApi from "../../api/leagues";
import Screen from "../../components/Screen";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  leagueName: Yup.string().min(2).required().label("League Name"),
  image: Yup.string().label("Image"),
});

function CreateLeagueScreen({ navigation }) {
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(null); // New state for image URI
  const { user } = useAuth();
  const createLeagueApi = useApi(leaguesApi.createLeague);

  const handleSubmit = async (leagueInfo) => {
    const completeLeagueInfo = {
      ...leagueInfo,
      image: imageUri,
      userId: user.userId,
    };

    const result = await createLeagueApi.request(completeLeagueInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    console.log("🚀 ~ CreateLeagueScreen ~ result:", result.data.league);
    navigation.navigate("Leagues", {
      league: result.data.league,
    });
  };

  return (
    <>
      <ActivityIndicator visible={createLeagueApi.loading} />

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
          <View style={{ alignItems: "flex-end" }}>
            <ImageInput
              imageUri={imageUri}
              onChangeImage={(uri) => setImageUri(uri)}
            />
          </View>
          <SubmitButton title="Create League" />
          <AppText style={styles.remark}>
            Note: You will be the admin of this league.
          </AppText>
        </AppForm>
      </Screen>
    </>
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