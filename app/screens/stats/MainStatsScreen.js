import { StyleSheet ,View} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from 'expo-linear-gradient';
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerStatsCard from "../../components/stats/PlayerStatsCard";
import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";

const MainStatsScreen = ({ route }) => {
  
  const { league } = route.params;
  const navigation = useNavigation();
 
  return (
    <Screen>
       <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}
        >
      <PlayerAvatar />
      <AppLogo />
      <AppText style={styles.remark}>
        * press on a card to see full stats
      </AppText>
      <PlayerStatsCard league={league} />
      <View style={styles.allGamesContainer}>
        <AppButton title="All Games" color="gold" onPress={() => navigation.navigate("AllGames", { league })} />
      </View>
      </LinearGradient>
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
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding:5,
  },
  background: {
    flex: 1,
    padding: 20,
  },

  remark: {
    color: colors.light,
    fontSize: 10,
    textAlign: "center",
  },
});
export default MainStatsScreen;
