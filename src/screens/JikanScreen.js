import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const JikanScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);

  const fetchAnimes = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10`);
      setAnimeList(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar animes:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Buscar Animes</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Digite o nome do anime"
        placeholderTextColor={colors.text}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Buscar" onPress={fetchAnimes} color={colors.primary} />
      <Button title="Ir para Biblioteca" onPress={() => navigation.navigate('OpenLibrary')} color={colors.primary} />

      <FlatList
        data={animeList}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsScreen', {
              title: item.title,
              synopsis: item.synopsis,
            })}
            style={[styles.itemContainer, { backgroundColor: colors.card }]}
          >
            <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={[styles.animeTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={{ color: colors.text }}>Score: {item.score || 'N/A'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { height: 40, borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
  itemContainer: { flexDirection: 'row', marginBottom: 16, alignItems: 'center', padding: 10, borderRadius: 8 },
  image: { width: 100, height: 140, marginRight: 16, borderRadius: 5 },
  textContainer: { flex: 1 },
  animeTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default JikanScreen;
