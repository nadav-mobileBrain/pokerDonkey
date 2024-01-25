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

function PlayerGameCardModal({ playerData, onClose, onAddBuyIn, onCashOut }) {
  console.log("🚀 ~ PlayerGameCardModal ~ playerData:", playerData);
  const serverUrl = apiClient.getBaseURL();
  const [buyInAmount, setBuyInAmount] = useState(playerData.buy_ins_amount);
  const [buyInNumber, setBuyInNumber] = useState(playerData.buy_ins_number);
  const [cashOutAmount, setCashOutAmount] = useState(
    playerData.cash_out_amount
  );
  console.log("🚀 ~ PlayerGameCardModal ~ cashOutAmount:", cashOutAmount);
  const [isLoading, setIsLoading] = useState(false);
  const addBuyInToPlayer = useApi(gameApi.addBuyIn);
  const cashOutPlayer = useApi(gameApi.cashOutPlayer);

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
    console.log("🚀 ~ handleSubmit ~ result:", result.data);
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
      </View>
      <View />
      <AppText>Buy in amount: {buyInAmount}</AppText>
      <AppText>Buy in number: {buyInNumber}</AppText>
      {cashOutAmount > 0 && (
        <AppText>Profit: {cashOutAmount - buyInAmount}</AppText>
      )}
      <AppForm
        initialValues={{ cashOutAmount: cashOutAmount }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
        <View style={styles.form}>
          <SubmitButton title="Cash Out Player" icon="cash" />
        </View>
      </AppForm>
      <View style={styles.form}></View>
    </View>
  );
}

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
