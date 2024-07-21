import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/leagues/LeagueScreen";
import LeagueDetailsScreen from "../screens/leagues/LeagueDetailsScreen";
import CreateLeagueScreen from "../screens/leagues/CreateLeagueScreen";
import JoinLeagueScreen from "../screens/leagues/JoinLeagueScreen";
import SelectPlayersScreen from "../screens/games/SelectPlayersScreen";
import NewGameScreen from "../screens/games/NewGameScreen";
import MainStatsScreen from "../screens/stats/MainStatsScreen";
import AllGamesScreen from "../screens/games/AllGamesScreen";
import CardStatsScreen from "../screens/stats/CardStatsScreen";
import PersonalStatsScreen from "../screens/stats/PersonalStatsScreen";
import EditProfileScreen from "../screens/forms/EditProfileScreen";
import AddRemovePlayers from "../screens/games/addRemovePlayers";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Leagues"
      component={LeagueScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="LeagueDetails" component={LeagueDetailsScreen} 
    options={{ headerShown: false }}
    />
    <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} />
    <Stack.Screen name="JoinLeague" component={JoinLeagueScreen} />
    <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
    <Stack.Screen name="NewGame" component={NewGameScreen} options={
      { headerShown: false }
    
    } />
    <Stack.Screen name="AddRemovePlayers" component={AddRemovePlayers} />
    <Stack.Screen
      name="Stats"
      component={MainStatsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="CardStats" component={CardStatsScreen}
    //change header title
    options={({ route }) => ({
      title:'Stats for '+ route.params.data.title
    })}
    
    />
    <Stack.Screen name="AllGames" component={AllGamesScreen} />
    <Stack.Screen name="PersonalStats" component={PersonalStatsScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />

  </Stack.Navigator>
);

export default FeedNavigator;
