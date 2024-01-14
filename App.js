import ImageInput from "./app/components/forms/ImageInput";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import Screen from "./app/components/Screen";
import { Button } from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [imageUri, setImageUri] = useState();

  // const requestPermission = async () => {
  //   const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
  //   // if not granted, alert the user
  //   if (!granted) alert("You need to enable permission to access the library.");
  // };

  // useEffect(() => {
  //   requestPermission();
  // }, []);
  return (
    <Screen>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => setImageUri(uri)}
      />
    </Screen>
  );
}
