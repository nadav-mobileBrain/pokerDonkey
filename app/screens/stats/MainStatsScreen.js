import { StyleSheet ,View} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerStatsCard from "../../components/stats/PlayerStatsCard";
import Screen from "../../components/Screen";

const MainStatsScreen = ({ route }) => {
  
  const { league } = route.params;
  const navigation = useNavigation();
 
  return (
    <Screen style={styles.container}>
      <PlayerAvatar />
      <AppLogo />
      <AppText style={styles.remark}>
        * press on a card to see full stats
      </AppText>
      <PlayerStatsCard league={league} />
      <View style={styles.allGamesContainer}>
      <AppText
        style={styles.allGames}
        onPress={() => navigation.navigate("AllGames", { league })}>
        All Games
      </AppText>
      <Icon name="arrow-right-bold" backgroundColor={colors.light}   size={45} iconColor={colors.PrimaryBlue} />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  allGames: {
    color: colors.PrimaryBlue,
    textAlign: "center",
    fontSize: 25,
    textDecorationLine: "underline",

  },
  allGamesContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding:5,
  },
  container: {
    padding: 5,
    backgroundColor: colors.light,
  },
  remark: {
    color: colors.medium,
    fontSize: 10,
    textAlign: "center",
  },
});
export default MainStatsScreen;
