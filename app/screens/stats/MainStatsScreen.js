import { StyleSheet } from "react-native";
import React from "react";

import PlayerAvatar from "../../components/player/PlayerAvatar";
import Screen from "../../components/Screen";
import LeagueStatsCard from "../../components/stats/LeagueStatsCard";
import colors from "../../config/colors";
import blockBackButton from "../../hooks/disableBack";
import AppLogo from "../../components/AppLogo";
import PlayerStatsCard from "./PlayerStatsCard";

const MainStatsScreen = ({ route }) => {
  const { league } = route.params;
  blockBackButton();
  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <AppLogo />
      <LeagueStatsCard league={league} />
      <PlayerStatsCard league={league} />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
});
export default MainStatsScreen;
