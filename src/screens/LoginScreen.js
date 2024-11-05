import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        navigation.navigate('OpenLibrary');
      } else {
        alert('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  const handleSignUp = async () => {
    if (username && password) {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        setIsSignUp(false);
        alert('Cadastro realizado com sucesso! Faça o login.');
      } catch (error) {
        console.error('Erro ao salvar cadastro:', error);
      }
    } else {
      alert('Por favor, preencha usuário e senha');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.text }]}>DualVerse</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Usuário"
        placeholderTextColor={colors.text}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Senha"
        placeholderTextColor={colors.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isSignUp ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.footerText, { color: colors.text }]}>
        {isSignUp ? (
          <Text onPress={() => setIsSignUp(false)}>Voltar para Login</Text>
        ) : (
          <Text onPress={() => setIsSignUp(true)}>Não possui uma conta? Cadastre-se</Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  logo: { width: 100, height: 100, marginBottom: 24, borderRadius: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: { width: '100%', height: 50, borderWidth: 1, marginBottom: 12, paddingHorizontal: 16, borderRadius: 8, fontSize: 16 },
  button: { width: '100%', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  footerText: { marginTop: 16, fontSize: 14 },
});

export default LoginScreen;

