import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/leagues/LeagueScreen";
import LeagueDetailsScreen from "../screens/leagues/LeagueDetailsScreen";
import CreateLeagueScreen from "../screens/leagues/CreateLeagueScreen";
import JoinLeagueScreen from "../screens/leagues/JoinLeagueScreen";
import SelectPlayersScreen from "../screens/games/SelectPlayersScreen";
import NewGameScreen from "../screens/games/NewGameScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leagues" component={LeagueScreen} />
    <Stack.Screen name="LeagueDetails" component={LeagueDetailsScreen} />
    <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} />
    <Stack.Screen name="JoinLeague" component={JoinLeagueScreen} />
    <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
    <Stack.Screen name="NewGame" component={NewGameScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
