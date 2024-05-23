import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

const SubmitButton = ({ title, icon = null, color = "PrimaryBlue" }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton title={title} onPress={handleSubmit} icon={icon} color={color} />
  );
};

export default SubmitButton;
