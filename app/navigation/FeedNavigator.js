import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/LeagueScreen";
import LeagueDetailsScreen from "../screens/LeagueDetailsScreen";
import CreateLeagueScreen from "../screens/CreateLeagueScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leagues" component={LeagueScreen} />
    <Stack.Screen name="LeagueDetails" component={LeagueDetailsScreen} />
    <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
