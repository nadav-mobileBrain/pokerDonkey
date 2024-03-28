import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import blockBackButton from "../../hooks/disableBack";
import colors from "../../config/colors";
import LeagueStatsCard from "../../components/stats/LeagueStatsCard";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerStatsCard from "../../components/stats/PlayerStatsCard";
import Screen from "../../components/Screen";

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
        * press on a card to see full stats
      </AppText>
      <PlayerStatsCard league={league} />

      <AppText
        style={styles.allGames}
        onPress={() => navigation.navigate("AllGames", { league })}>
        All Games
      </AppText>
    </Screen>
  );
};
const styles = StyleSheet.create({
  allGames: {
    color: colors.PrimaryBlue,
    textAlign: "center",
    fontSize: 20,
  },
  container: {
    padding: 10,
    backgroundColor: colors.light,
    flex: 1,
  },
  remark: {
    color: colors.medium,
    fontSize: 10,
    textAlign: "center",
  },
});
export default MainStatsScreen;
