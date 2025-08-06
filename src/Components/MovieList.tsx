import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { HomeStackParamList, Movie } from '../Navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
  title: string;
  category: string;
}

export default function MovieList({ title, category }: Props) {
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

      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetails', { item })}
          >
            <View style={styles.movieContainer}>
              <FastImage
                source={{
                  uri: `${IMAGE_BASE_URL}${item.poster_path}`,
                  priority: FastImage.priority.normal,
                }}
                style={styles.poster}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.movieTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.date}>{item.release_date}</Text>
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
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 5,
    color: 'white',
  },
  listContainer: {
    paddingLeft: 10,
  },
  movieContainer: {
    marginRight: 2,
    width: 120,
  },
  poster: {
    width: 100,
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
