 

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import ActivityIndicator from "./app/components/ActivityIndicator";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import {  Roboto_400Regular, Roboto_700Bold,Roboto_500Medium } from "@expo-google-fonts/roboto";
import logger from "./app/utility/logger";


logger.start();
// // This is an async function that loads the font

export default function App() {
 
  const [user, setUser] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("./app/assets/fonts/Montserrat-VariableFont_wght.ttf"),
      "Montserrat-Light": require("./app/assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-SemiBold": require("./app/assets/fonts/Montserrat-SemiBold.ttf"),
      Roboto_400Regular,
      Roboto_700Bold,
      Roboto_500Medium
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    restoreUser();
    loadFonts();
  }, []);

  
  if (!fontsLoaded) {
    return <ActivityIndicator visible={true} />;
  }


 
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
