import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/forms/LoginScreen';
import RegisterScreen from '../screens/forms/RegisterScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
