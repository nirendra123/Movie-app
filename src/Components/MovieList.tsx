import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieList({ title, movies }: any) {
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
          <View style={styles.movieContainer}>
            <Image
              source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
              style={styles.poster}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
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
    marginRight: 10,
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
    textAlign: 'center',
    color: 'white',
  },
});
