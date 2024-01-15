import React from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Screen from "./app/components/Screen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="TweetDetails" component={TweetDetails} />
  </Stack.Navigator>
);

const Tweets = ({ navigation }) => {
  <Screen>
    <Text>Tweetss</Text>
    <Button
      title="View Tweet"
      onPress={() => navigation.navigate("TweetDetails")}
    />
  </Screen>;
};

const TweetDetails = () => {
  <Screen>
    <Text>Tweet Detailllls</Text>
  </Screen>;
};

const Account = () => {
  <Screen>
    <Text>Account</Text>
  </Screen>;
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarActiveBackgroundColor: "tomato",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
    }}
  >
    <Tab.Screen name="Feed" component={Tweets} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
