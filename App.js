import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import OpenLibraryScreen from './src/screens/OpenLibraryScreen';
import JikanScreen from './src/screens/JikanScreen';
import LoginScreen from './src/screens/LoginScreen';
import DetailsScreen from './src/screens/DetailsScreen'; // Importa a nova tela de detalhes

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="AppNavigator">
        <Stack.Screen
          name="AppNavigator"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OpenLibrary" component={OpenLibraryScreen} options={{ title: 'Livros' }} />
        <Stack.Screen name="Jikan" component={JikanScreen} options={{ title: 'Animes' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
      <View style={{ position: 'absolute', top: 40, right: 20 }}>
        <Button
          title={isDarkTheme ? "Modo Claro" : "Modo Escuro"}
          onPress={toggleTheme}
        />
      </View>
    </NavigationContainer>
  );
}

