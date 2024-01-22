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

const validationSchema = Yup.object().shape({
  cashOutAmount: Yup.number().required().label("Cash Out Amount"),
});

function PlayerGameCardModal({ playerData, onClose, onAddBuyIn }) {
  const serverUrl = apiClient.getBaseURL();
  const [buyInAmount, setBuyInAmount] = useState(playerData.buy_ins_amount);
  const [buyInNumber, setBuyInNumber] = useState(playerData.buy_ins_number);
  console.log("🚀 ~ PlayerGameCardModal ~ buyInAmount:", buyInAmount);
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
    console.log(
      "🚀 ~ handleSubmit ~ values",
      typeof values.cashOutAmount,
      values.cashOutAmount
    );
    const result = await cashOutPlayer.request(
      playerData.game_id,
      playerData.user_id,
      values.cashOutAmount,
      playerData.league_id
    );
    console.log("🚀 ~ handleSubmit ~ result:", result.data);
  };

  return (
    <View style={styles.container}>
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
          onPress={() => addBuyIn(100)}
        />
      </View>
      <View style={styles.detailsContainer} />
      <AppText>Buy in amount: {buyInAmount}</AppText>
      <AppText>Buy in number: {buyInNumber}</AppText>
      <AppForm
        initialValues={{ cashOutAmount: "" }}
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
          placeholder="Cash Out Amount"
          keyboardType="number-pad"
          width={250}
        />
        <View style={styles.form}>
          <SubmitButton title="Cash Out Player" icon="cash" color="pink" />
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
