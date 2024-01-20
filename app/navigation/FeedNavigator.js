import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/leagues/LeagueScreen";
import LeagueDetailsScreen from "../screens/leagues/LeagueDetailsScreen";
import CreateLeagueScreen from "../screens/leagues/CreateLeagueScreen";
import JoinLeagueScreen from "../screens/leagues/JoinLeagueScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leagues" component={LeagueScreen} />
    <Stack.Screen name="LeagueDetails" component={LeagueDetailsScreen} />
    <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} />
    <Stack.Screen name="JoinLeague" component={JoinLeagueScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
