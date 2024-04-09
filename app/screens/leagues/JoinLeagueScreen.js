import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppFormField from "../../components/forms/AppFormField";
import { AppForm } from "../../components/forms";
import colors from "../../config/colors";
import ErrorMessage from "../../components/forms/ErrorMessage";
import HeaderText from "../../components/HeaderText";
import leaguesApi from "../../api/leagues";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";

const validationSchema = Yup.object().shape({
  leagueNumber: Yup.string().required().min(4).max(5).label("League Number"),
});

const JoinLeagueScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const { user } = useAuth();

  const handleSubmit = async ({ leagueNumber }) => {
    const completeLeagueInfo = {
      leagueNumber,
      userId: user.userId,
    };
    const result = await leaguesApi.joinLeague(completeLeagueInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    navigation.navigate(routes.LEAGUE_DETAILS, {
      item: result.data,
      data: result.data,
    });
  };
  return (
    <>
      <ActivityIndicator />
      <Screen style={styles.container}>
        <HeaderText>Join a League</HeaderText>
        <AppText>Enter the League Number to join a league</AppText>
        <AppText style={styles.remark}>
          *Get the number from league members
        </AppText>
        <AppForm
          initialValues={{ leagueNumber: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            name="leagueNumber"
            placeholder="League Number"
            icon="account"
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
          />
          <SubmitButton title="Join League" icon="plus-circle-outline" />
        </AppForm>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  remark: {
    color: colors.AccentPurple,
  },
});
export default JoinLeagueScreen;
