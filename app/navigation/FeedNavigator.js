import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/LeagueScreen";
import LeagueDetailsScreen from "../screens/LeagueDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leagues" component={LeagueScreen} />
    <Stack.Screen name="LeagueDetails" component={LeagueDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
