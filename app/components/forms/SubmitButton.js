import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, icon = null }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} icon={icon} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default SubmitButton;
