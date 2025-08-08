/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { TextInput } from 'react-native';
import { Movie } from '../../Navigation/types';
import api from '../../API/axiosInstance';

export default function SearchTab({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/search/movie', {
        params: { query: searchQuery },
      });
      setResults(res.data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    const delay = setTimeout(() => {
      searchMovies(query);
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="search..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      {loading && <Text>Loading...</Text>}
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() =>
              navigation.navigate('MovieDetails', { movieId: item.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.overview}>
                {item.overview || 'No description available'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: { width: 80, height: 120, marginRight: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  overview: { fontSize: 12, color: '#555' },
});
