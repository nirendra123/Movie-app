/* eslint-disable react-native/no-inline-styles */
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../Components/MovieList';

const options1 = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing',
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

const options2 = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/upcoming',
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

const options3 = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/top_rated',
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
export default function HomeTab() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  //     options,
  //   )
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
  // }, []);

  useEffect(() => {
    axios
      .request(options1)
      .then(response => {
        setPopularMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching TMDB data:', error);
      });
    axios
      .request(options2)
      .then(response => {
        setUpcomingMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching TMDB data:', error);
      });
    axios
      .request(options3)
      .then(response => {
        setTopMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching TMDB data:', error);
      });
  });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/slide.png')}
            resizeMode="cover"
          />
          <Image
            source={require('../../../assets/LOGO.png')}
            resizeMode="cover"
          />
        </View>

        <View style={styles.welcomeTextContainer}>
          <Text style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>
            Welcome back,<Text style={{ color: '#FFCA45' }}>Delhara</Text>!
          </Text>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 400 }}>
            Review or log film you've wathced...
          </Text>
        </View>
      </View>

      <ScrollView>
        <MovieList title="New Releases" movies={popularMovies} />
        <MovieList title="Upcoming Movies" movies={upcomingMovies} />
        <MovieList title="Ranked Movies" movies={topMovies} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
    flexDirection: 'column',
  },
  header: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
  },
  welcomeTextContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
});
