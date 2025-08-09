/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getWatchlistMovies,
  // removeMovieFromWatchlist,
} from '../../API/toggleWatchlist';

export default function WishlistTab({ navigation }: any) {
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

  // const handleRemove = async (movieId: number) => {
  //   await removeMovieFromWatchlist(movieId);
  //   loadWatchlist();
  // };

  if (loading) {
    return <Text style={{ color: 'white' }}>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {' '}
        <Text style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
          Wishlist
        </Text>
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../../../assets/logger.png')}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.wishlist}>
        {movies.map(movie => (
          <View
            key={movie.id}
            style={{
              width: 75,
              height: 110,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MovieDetails', { movieId: movie.id });
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                }}
                style={{ width: 75, height: 110, borderRadius: 8 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002335' },
  header: {
    marginHorizontal: 20,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishlist: {
    flexDirection: 'row',
    marginHorizontal: 20,
    flexWrap: 'wrap',
    columnGap: 6,
    rowGap: 10,
  },
});
