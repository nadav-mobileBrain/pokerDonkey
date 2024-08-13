import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import LeagueLogo from "../leagues/LeagueLogo";
import dayjs from "dayjs";

const GameDetails = ({ league, game, userGameData }) => {
  const totalBuyIn = userGameData.reduce((acc, userGame) => {
    return acc + userGame.buy_ins_amount;
}, 0);
const cashInHand = userGameData.reduce((acc, userGame) => {
       return  userGame.is_cashed_out && userGame.cash_out_amount !== undefined 
       ? acc + parseInt(userGame.cash_out_amount) : acc;
}, 0);

  return (
    <View style={styles.gameDetailsContainer}>
      <LeagueLogo
        logoUrl={league.league_image}
        leagueName={league.league_name}
      />
      <AppText >Game Admin:{game?.gameManager?.nickName}</AppText>
      <AppText style={styles.gameDate}>
        Started At: {dayjs(game.created_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText>
      <View style={ styles.container}>
        <View style={styles.totalContainer}>
        <AppText style={styles.totalText}>Total buy ins</AppText>
        <AppText style={styles.totalText}>{totalBuyIn}</AppText>
        </View>
       { cashInHand > 0 && (
         <>
              <View style={styles.totalContainer}>
                    <AppText style={styles.totalText}>Total cash Out</AppText>
                    <AppText style={styles.totalText}>{cashInHand}</AppText>
              </View>
                <View style={styles.totalContainer}>
                    <AppText style={styles.totalText}>Total cash left in bank</AppText>
                    <AppText style={styles.totalText}>{totalBuyIn-cashInHand}</AppText>
              </View>
            </>
        )
       }

      </View>
      {/* <AppText style={styles.gameDate}>
        Updated At: {dayjs(game.updated_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  gameDetailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    backgroundColor: colors.gold,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    // padding: 10,
  },
  gameDate: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
   width: '50%',
  },
  totalText: {
   fontSize: 12,
   fontWeight: 'bold',
  },
});

export default GameDetails;
