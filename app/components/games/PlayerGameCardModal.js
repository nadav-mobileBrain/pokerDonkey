import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../AppText";
import HeaderText from "../HeaderText";
import apiClient from "../../api/client";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import useApi from "../../hooks/useApi";
import gameApi from "../../api/game";
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../forms";
import * as Yup from "yup";
import ActivityIndicator from "../ActivityIndicator";

const validationSchema = Yup.object().shape({
  cashOutAmount: Yup.number().required().label("Cash Out Amount"),
});

const PlayerGameCardModal = ({
  playerData,
  onClose,
  onAddBuyIn,
  onRemoveBuyIn,
  onCashOut,
}) => {
  const serverUrl = apiClient.getBaseURL();
  const [buyInAmount, setBuyInAmount] = useState(playerData.buy_ins_amount);
  const [buyInNumber, setBuyInNumber] = useState(playerData.buy_ins_number);
  const [cashOutAmount, setCashOutAmount] = useState(
    playerData.cash_out_amount
  );

  const [isLoading, setIsLoading] = useState(false);
  const addBuyInToPlayer = useApi(gameApi.addBuyIn);
  const removeLastBuyInToPlayer = useApi(gameApi.removeLastBuyIn);
  const cashOutPlayer = useApi(gameApi.cashOutPlayer);

  const removeLastBuyIn = async () => {
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
  const addBuyIn = async (amount) => {
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

  const handleSubmit = async (values) => {
    if (buyInAmount < 1) {
      alert("Buy In amount must be greater than 0");
      return;
    }
    setIsLoading(true);
    setCashOutAmount(values.cashOutAmount);
    const result = await cashOutPlayer.request(
      playerData.game_id,
      playerData.user_id,
      values.cashOutAmount,
      playerData.league_id
    );
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    setIsLoading(false);
    onClose();
    onCashOut(values.cashOutAmount, playerData.user_id);
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator visible={isLoading} />}
      <HeaderText>Player Details</HeaderText>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${serverUrl}${playerData?.user?.image}` }}
          style={styles.image}
        />
        <AppText style={styles.nickName}>{playerData?.user?.nickName}</AppText>
      </View>
      <View style={styles.form}>
        <AppButton
          title="Add Buy in 50"
          icon="cash"
          color="LimeGreen"
          onPress={() => addBuyIn(50)}
        />
        <AppButton
          title="Add Buy in 100"
          icon="cash"
          color="AccentPurple"
          onPress={() => addBuyIn(100)}
        />
        <AppButton
          title="Cancel last buy in"
          icon="cash-remove"
          color="danger"
          onPress={() => removeLastBuyIn()}
        />
      </View>
      <View />
      <AppText>Buy in amount: {buyInAmount}</AppText>
      {cashOutAmount > 0 && (
        <AppText>Profit: {cashOutAmount - buyInAmount}</AppText>
      )}
      <AppForm
        initialValues={{ cashOutAmount }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage
          error={addBuyInToPlayer.error}
          visible={addBuyInToPlayer.error}
        />
        <AppFormField
          name="cashOutAmount"
          icon="cash"
          placeholder={
            cashOutAmount ? cashOutAmount.toString() : "Cash Out Amount"
          }
          keyboardType="number-pad"
          width={250}
        />
        {!playerData?.is_cashed_out && (
          <View style={styles.form}>
            <SubmitButton title="Cash Out Player" icon="cash" />
          </View>
        )}
        {playerData?.is_cashed_out && (
          <>
            <AppText>Player Cashed Out Already</AppText>
            <AppText>Cash Out Amount: {cashOutAmount}</AppText>
            <AppText style={{ color: "red" }}>Cash Out Again?</AppText>
            <View style={styles.form}>
              <SubmitButton title="Update Cash Out" icon="cash" />
            </View>
          </>
        )}
      </AppForm>
      <View style={styles.form}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    marginVertical: 20,
    width: "75%",
  },
  imageContainer: {
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderWidth: 3,
    borderColor: colors.AccentPurple,
  },
  nickName: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default PlayerGameCardModal;
