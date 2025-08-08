/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { TextInput } from 'react-native';
import { Movie } from '../../Navigation/types';
import api from '../../API/axiosInstance';
import MovieList from '../../Components/MovieList';

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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="search..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../../../assets/Search.png')}
          resizeMode="contain"
        />
      </View>

      <ScrollView>
        <MovieList title="Trending this month" category="now_playing" />
        <View style={styles.browse}>
          <Image
            style={{ width: 61, height: 61 }}
            source={require('../../../assets/browse.png')}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>
            Browse All Movies
          </Text>
          <Image
            style={{ width: 18, height: 22 }}
            source={require('../../../assets/arrow.png')}
            resizeMode="contain"
          />
        </View>

        <MovieList
          title="Upcoming Movies"
          category="upcoming"
          posterSize={224}
          bookMark={true}
        />
      </ScrollView>

      {loading && <Text>Loading...</Text>}
      <View style={styles.searchList}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002335' },
  inputContainer: {
    backgroundColor: 'grey',
    height: 40,
    borderRadius: 18,
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    padding: 10,
  },
  input: {
    padding: 10,
    color: 'white',
    borderColor: '#ccc',
    borderRadius: 18,
    height: 35,
    width: 240,
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
  browse: {
    backgroundColor: 'grey',
    width: 334,
    height: 83,
    borderRadius: 14,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  searchList: {
    marginHorizontal: 20,
  },
});
