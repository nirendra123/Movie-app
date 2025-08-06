/* eslint-disable react-native/no-inline-styles */
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2I2NGVmMjFkYTAxODRlMzEwN2JkNGU1MzY2NTQ0OSIsIm5iZiI6MTc1MTAzOTI3NS41MjYsInN1YiI6IjY4NWViZDJiYTgzY2NkODFmNDkxNTJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sMiHvjezkASUDT2xysvlVdD21tYRrjB2GoJDOVlRIMc',
  },
};

export default function HomeTab() {
  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      options,
    )
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }, []);

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
        <View style={styles.showMoviesContainer}>
          <View style={styles.moviesCategoryContainer}>
            <Text style={styles.categoryHeading}>New Releases</Text>
            <View style={styles.movieList}>
              <View style={styles.movieContainer}>
                <Image></Image>
                <Text>Hello World</Text>
              </View>
              <View style={styles.movieContainer}>
                <Image></Image>
                <Text>Hello World</Text>
              </View>
            </View>
          </View>
          <View style={styles.moviesCategoryContainer}>
            <Text style={styles.categoryHeading}>Upcoming Movies</Text>
            <View style={styles.movieList}>
              <View style={styles.movieContainer}>
                <Image></Image>
                <Text>Hello World</Text>
              </View>
            </View>
          </View>
          <View style={styles.moviesCategoryContainer}>
            <Text style={styles.categoryHeading}>Ranked Movies</Text>
            <View style={styles.movieList}>
              <View style={styles.movieContainer}>
                <Image></Image>
                <Text style={styles.movieTitle}>Hello World</Text>
              </View>
            </View>
          </View>
        </View>
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
  showMoviesContainer: {
    marginHorizontal: 10,

    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 1,
  },
  moviesCategoryContainer: {
    height: 140,
    marginBottom: 10,
  },
  categoryHeading: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  movieContainer: {
    width: 100,
    height: 120,
    backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  movieList: {
    backgroundColor: 'red',
    height: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  movieTitle: {
    color: 'white',
  },
});
