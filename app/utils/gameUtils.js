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
    console.log("🚀 ~ removeLastBuyIn ~ rjhgjhgjhgesult", result.data);
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
    console.log("🚀 ~ addBuyIn ~ result", result.data);
    return;
  }
  onAddBuyIn(amount, playerData.user_id);
  // Call the callback function to close the modal
  onClose();
};
