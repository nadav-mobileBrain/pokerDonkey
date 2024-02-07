import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import AppLogo from "../../components/AppLogo";
import blockBackButton from "../../hooks/disableBack";
import colors from "../../config/colors";
import LeagueStatsCard from "../../components/stats/LeagueStatsCard";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerStatsCard from "../../components/stats/PlayerStatsCard";
import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";

const MainStatsScreen = ({ route }) => {
  const { league } = route.params;
  const navigation = useNavigation();
  blockBackButton();
  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <AppLogo />
      <LeagueStatsCard league={league} />
      <AppText style={styles.remark}>
        * press on each card to see full stats
      </AppText>
      <PlayerStatsCard league={league} />
      <AppButton
        title="All Games"
        onPress={() => navigation.navigate("AllGames", { league })}
        color="AccentPurple"
        icon="arrow-right"
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
    flex: 1,
  },
  remark: {
    color: colors.medium,
    fontSize: 12,
    textAlign: "center",
  },
});
export default MainStatsScreen;
