/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { HomeStackParamList, Movie } from '../Navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
  title: string;
  category: string;
  posterSize?: number;
  bookMark?: boolean;
}

export default function MovieList({
  title,
  category,
  posterSize = 100,
  bookMark = false,
}: Props) {
  type NavigationProps = NativeStackNavigationProp<HomeStackParamList>;
  const navigation = useNavigation<NavigationProps>();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const options1 = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${category}`,
      params: {
        language: 'en-US',
        page: 1,
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2I2NGVmMjFkYTAxODRlMzEwN2JkNGU1MzY2NTQ0OSIsIm5iZiI6MTc1MTAzOTI3NS41MjYsInN1YiI6IjY4NWViZDJiYTgzY2NkODFmNDkxNTJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sMiHvjezkASUDT2xysvlVdD21tYRrjB2GoJDOVlRIMc',
      },
    };
    axios
      .request(options1)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching TMDB data:', error);
      });
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      {bookMark && (
        <Text style={{ fontSize: 10, fontWeight: 500, marginBottom: 5 }}>
          Add to the WishList
        </Text>
      )}

      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MovieDetails', { movieId: item.id })
            }
          >
            <View style={[styles.movieContainer, { width: posterSize }]}>
              <FastImage
                source={{
                  uri: `${IMAGE_BASE_URL}${item.poster_path}`,
                  priority: FastImage.priority.normal,
                }}
                style={[styles.poster, { width: posterSize }]}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.movieTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View
                style={{
                  width: 200,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Text style={styles.date}>{item.release_date}</Text>
                {bookMark && (
                  <Image
                    style={{ width: 10, height: 10 }}
                    source={require('../../assets/Bookmark.png')}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  listContainer: {
    gap: 10,
  },
  movieContainer: {},
  poster: {
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  date: {
    color: '#E0E0E0',
    fontSize: 10,
    fontWeight: 400,
  },
});
