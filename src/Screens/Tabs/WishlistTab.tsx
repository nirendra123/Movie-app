/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getWatchlistMovies,
  removeMovieFromWatchlist,
} from '../../API/toggleWatchlist';

export default function WishlistTab() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWatchlist = async () => {
    setLoading(true);
    const watchlistMovies = await getWatchlistMovies();
    setMovies(watchlistMovies);
    setLoading(false);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleRemove = async (movieId: number) => {
    await removeMovieFromWatchlist(movieId);
    loadWatchlist();
  };

  if (loading) {
    return <Text style={{ color: 'white' }}>Loading...</Text>;
  }
  return (
    <View>
      <View>
        {' '}
        <Text>WishList</Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={{ width: 80, height: 120, borderRadius: 8 }}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Text style={{ color: 'red', marginTop: 5 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
