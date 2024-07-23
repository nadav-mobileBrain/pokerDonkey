import logger from "../utility/logger";

export const removeLastBuyIn = async (
  buyInNumber,
  buyInAmount,
  removeLastBuyInToPlayer,
  playerData,
  setBuyInAmount,
  setBuyInNumber,
  onRemoveBuyIn,
  onClose
) => {
  if (buyInNumber < 1) {
    alert("No buy ins to remove");
    return;
  }
  const result = await removeLastBuyInToPlayer.request(
    playerData.game_id,
    playerData.user_id,
    -50,
    playerData.league_id
  );

  if (!result.ok) {
    logger.log("🚀 ~ removeLastBuyIn ~ rjhgjhgjhgesult", result.data);
    return;
  }
  setBuyInAmount(buyInAmount - result.data[1]);
  setBuyInNumber(buyInNumber - 1);
  onRemoveBuyIn(result.data[1], playerData.user_id);
  // Call the callback function to close the modal
  onClose();
};

export const addBuyIn = async (
  amount,
  setBuyInAmount,
  setBuyInNumber,
  addBuyInToPlayer,
  playerData,
  onAddBuyIn,
  buyInAmount,
  buyInNumber,
  onClose
) => {
  setBuyInAmount(buyInAmount + amount);
  setBuyInNumber(buyInNumber + 1);
  const result = await addBuyInToPlayer.request(
    playerData.game_id,
    playerData.user_id,
    amount,
    playerData.league_id
  );
  if (!result.ok) {
    logger.log("🚀 ~ addBuyIn ~ result", result.data);
    return;
  }
  onAddBuyIn(amount, playerData.user_id);
  // Call the callback function to close the modal
  onClose();
};


export const  onAddBuyIn = (amount, userId,userGamesData,setUserGamesData) => {
  const updatedUserGames = [...userGamesData];
  const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
  updatedUserGames[playerIndex].buy_ins_amount += amount;
  updatedUserGames[playerIndex].buy_ins_number += 1;
  setUserGamesData(updatedUserGames);
};

export const onRemoveBuyIn = (amount, userId,userGamesData,setUserGamesData) => {
  const updatedUserGames = [...userGamesData];
  const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
  updatedUserGames[playerIndex].buy_ins_amount -= amount;
  updatedUserGames[playerIndex].buy_ins_number -= 1;
  setUserGamesData(updatedUserGames);
};

export const checkIfAllPlayersCashedOut = (userGamesData) => {
  const allPlayersCashedOut = userGamesData.every((player) => {
    return player.is_cashed_out === true;
  });

  return allPlayersCashedOut;
};