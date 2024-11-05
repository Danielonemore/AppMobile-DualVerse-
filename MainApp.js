import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import OpenLibraryScreen from './src/screens/OpenLibraryScreen';
import JikanScreen from './src/screens/JikanScreen';

const Stack = createStackNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="OpenLibrary" component={OpenLibraryScreen} options={{ title: 'Livros' }} />
        <Stack.Screen name="Jikan" component={JikanScreen} options={{ title: 'Animes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
