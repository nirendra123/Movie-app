/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import api from '../API/axiosInstance';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/movie/${movieId}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch movie details', err);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.posterContainer}>
          <FastImage
            style={styles.poster}
            source={
              movie?.poster_path
                ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
                : require('../../assets/Banner.png')
            }
            resizeMode={FastImage.resizeMode.cover}
          />

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              height: 90,
              marginBottom: 10,
              width: '100%',
            }}
          >
            <FastImage
              style={styles.smallPoster}
              source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.titleDetailContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={{}}>directed by</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text>Movie Time</Text>
            <Text>{movie.release_date}</Text>
            <Text>Not Watched</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity>
            <Text>Watch Trailer</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Add to WishList</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Log</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Review', { movieId })}
          >
            <Text>Review</Text>
          </TouchableOpacity>
        </View>
        {/*
      <View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>

      <View>Cast and crews</View>

      <View>Rating</View>

      <View>Rating</View>

      <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text> */}
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002335',
    flex: 1,
  },

  posterContainer: {
    margin: 10,
    // backgroundColor: 'rgba(255,255,255,0.3',
    borderRadius: 14,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'green',
    padding: 10,
    height: 292,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 14,
  },
  smallPoster: {
    width: 106,
    height: 163,
    borderRadius: 14,
    position: 'relative',
    bottom: 70,
    left: 15,
    zIndex: 2,
    elevation: 5,
  },
  titleDetailContainer: {
    marginLeft: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  releaseDate: {
    color: '#bbb',
  },
  overview: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
