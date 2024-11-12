import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const OpenLibraryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [bookList, setBookList] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setError(null);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      setBookList(response.data.docs);
    } catch (err) {
      console.error('Erro ao buscar livros:', err);
      setError('Não foi possível buscar os livros. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Buscar Livros</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Digite o nome do livro ou autor"
        placeholderTextColor={colors.text}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Buscar" onPress={fetchBooks} color={colors.primary} />
      <Button title="Ir para Animes" onPress={() => navigation.navigate('Jikan')} color={colors.primary} />

      {error && <Text style={[styles.errorText, { color: colors.notification }]}>{error}</Text>}

      <FlatList
        data={bookList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const description = item.first_sentence || item.description || 'Sinopse não disponível';
              navigation.navigate('DetailsScreen', {
                title: item.title,
                synopsis: description,
              });
            }}
            style={[styles.itemContainer, { backgroundColor: colors.card }]}
          >
            <Image
              source={{
                uri: item.cover_i
                  ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                  : 'https://via.placeholder.com/100x140.png?text=No+Cover'
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={[styles.bookTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={{ color: colors.text }}>Autor: {item.author_name ? item.author_name.join(', ') : 'Desconhecido'}</Text>
              <Text style={{ color: colors.text }}>Ano: {item.first_publish_year || 'N/A'}</Text>
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
  bookTitle: { fontSize: 18, fontWeight: 'bold' },
  errorText: { textAlign: 'center', marginVertical: 10 },
});

export default OpenLibraryScreen;
