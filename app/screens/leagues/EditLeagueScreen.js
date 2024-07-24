import React, { useState} from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import useApi from "../../hooks/useApi";
import leagueApi from "../../api/leagues";
import config from "../../config/config";
import colors from "../../config/colors";
import logger from "../../utility/logger";
import ErrorMessage from "../../components/forms/ErrorMessage";
import ImageInput from "../../components/forms/ImageInput";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  leagueName: Yup.string().required().label("League Name"),
  image: Yup.string().label("Image"),
});
const EditLeagueScreen = ({ navigation,route }) => {

const leageName = route.params?.league?.league_name
const leagueImage = route.params?.league?.league_image
const leagueId = route.params?.league?.id

const updateLeagueDetailsApi = useApi(leagueApi.updateLeagueDetails);

  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(`${config.s3.baseUrl}${leagueImage}`); // New state for image URI

  const handleSubmit = async (leagueInfo) => {
    const completeLeagueInfo = {
        ...leagueInfo,
        image: imageUri,
        leagueId,
    };

    const result = await updateLeagueDetailsApi.request(completeLeagueInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }

    navigation.navigate(routes.LEAGUE_DETAILS, { item: result.data });

  };

  return (
    <>
   <ActivityIndicator visible={updateLeagueDetailsApi.loading } /> 
      <Screen style={styles.container}>
      <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
        <AppForm
          initialValues={{ leagueName:leageName }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="leagueName"
            placeholder={leageName}
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

export default EditLeagueScreen;
