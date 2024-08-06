import React, { useState } from "react";
import { View, StyleSheet , ImageBackground} from "react-native";
import * as Yup from "yup";


import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import AppLogo from "../../components/AppLogo";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import colors from "../../config/colors";
import ErrorMessage from "../../components/forms/ErrorMessage";
import HeaderText from "../../components/HeaderText";
import ImageInput from "../../components/forms/ImageInput";
import leaguesApi from "../../api/leagues";
import Screen from "../../components/Screen";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import logger from "../../utility/logger";


const validationSchema = Yup.object().shape({
  leagueName: Yup.string().min(2).required().label("League Name"),
  image: Yup.string().label("Image"),
});

const CreateLeagueScreen = ({ navigation }) => {
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
        logger.log(result);
      }
      return;
    }


        navigation.navigate("Leagues", {
          league: result.data.league,
          message: "League created successfully.",
        });

  };

  return (
    <>
      <ActivityIndicator visible={createLeagueApi.loading} />
      <Screen style={styles.screen}>
      <ImageBackground
          blurRadius={4}
          style={styles.background}
          source={require("../../assets/newLogo.jpeg")}>
          <View style={styles.overlay} />
          <AppLogo/>  
        <HeaderText>Create League</HeaderText>
        <AppForm
          initialValues={{ leagueName: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
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
          <AppText style={styles.remark}>
          * An anonymos player will be added to the league automaticly. you can remove it later or use it if you have occasional players. 
          </AppText>
        </AppForm>
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },

  remark: {
    color: colors.gold,
    fontSize: 15,
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,

  },
});

export default CreateLeagueScreen;
