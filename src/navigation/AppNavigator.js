import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OpenLibraryScreen from '../screens/OpenLibraryScreen';
import JikanScreen from '../screens/JikanScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
    <Stack.Screen name="Biblioteca" component={OpenLibraryScreen} options={{ title: 'Biblioteca' }} />
    <Stack.Screen name="Anime" component={JikanScreen} options={{ title: 'Anime' }} />
  </Stack.Navigator>
);

export default AppNavigator;
