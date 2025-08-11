/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import api from '../API/axiosInstance';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addMovieToWatchlist } from '../API/toggleWatchlist';
import { Review, setReviews } from '../store/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const reviews = useSelector((state: RootState) => state.reviews.list ?? []);

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

  useEffect(() => {
    const user = auth().currentUser;
    if (!user || !movieId) return;

    const unsubscribe = firestore()
      .collection('reviews')
      .where('movieId', '==', movieId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const reviewList: Review[] =
            snapshot?.docs?.map(
              (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  text: data.text,
                  movieId: data.movieId,
                  userId: data.userId,
                  createdAt: data.createdAt
                    ? data.createdAt.toDate().toISOString()
                    : null,
                };
              },
            ) || [];
          dispatch(setReviews(reviewList));
        },
        err => {
          console.error('Error fetching reviews:', err);
        },
      );
    return () => unsubscribe();
  }, [movieId, dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'white' }}>Movie not found.</Text>
      </View>
    );
  }

  const production =
    movie.production_companies
      ?.map((company: any) => company.name)
      .join(', ') || '';

  const uniqueReviews = reviews.filter(
    (review, index, self) => self.findIndex(r => r.id === review.id) === index,
  );
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
              height: 90,
              marginBottom: 10,
              width: '100%',
            }}
          >
            <FastImage
              style={styles.smallPoster}
              source={
                movie?.poster_path
                  ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
                  : require('../../assets/Banner.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.titleDetailContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  style={{ width: 10, height: 10 }}
                  source={require('../../assets/DirectedBy.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 8, fontWeight: '400', color: 'white' }}
                >
                  Directed by{' '}
                  <Text
                    style={{ fontSize: 8, fontWeight: '700', color: 'white' }}
                  >
                    Someone
                  </Text>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  style={{ width: 10, height: 10 }}
                  source={require('../../assets/Vector.png')}
                  resizeMode="contain"
                />
                <View>
                  <Text
                    style={{ fontSize: 5, fontWeight: '300', color: 'white' }}
                  >
                    {production}
                  </Text>
                  <Text
                    style={{ fontSize: 5, fontWeight: '300', color: 'white' }}
                  >
                    Productions Limited
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Image
                style={{ width: 10, height: 10 }}
                source={require('../../assets/clock.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: 'white',
                  fontWeight: '500',
                }}
              >
                Movie Time
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Image
                style={{ width: 10, height: 10 }}
                source={require('../../assets/date.png')}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10, color: 'white', fontWeight: '500' }}>
                {movie.release_date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Image
                style={{ width: 10, height: 10 }}
                source={require('../../assets/NotWatched.png')}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10, color: 'white', fontWeight: '500' }}>
                Not Watched
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={{ width: 15, height: 11 }}
              source={require('../../assets/Utube.png')}
              resizeMode="contain"
            />
            <Text style={styles.text}>Watch Trailer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => addMovieToWatchlist(movieId)}
          >
            <Image
              style={{ width: 15, height: 11 }}
              source={require('../../assets/wishlist.png')}
              resizeMode="contain"
            />
            <Text style={styles.text}>Add to WishList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FFCA45' }]}
          >
            <Image
              style={{ width: 15, height: 11 }}
              source={require('../../assets/AddLog.png')}
              resizeMode="contain"
            />
            <Image
              style={{ width: 15, height: 11 }}
              source={require('../../assets/Log.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFB703',
              width: 104,
              height: 36,
              borderRadius: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}
            onPress={() =>
              navigation.navigate('Review', {
                movieId,
                posterPath: movie.poster_path,
                title: movie.title,
              })
            }
          >
            <Text>Review</Text>
          </TouchableOpacity>

          <View>
            <View style={{ paddingVertical: 10 }}>
              {(uniqueReviews || []).map(item => (
                <View key={item.id} style={styles.reviewItem}>
                  <Text style={styles.userId}>User: {item.userId}</Text>
                  <Text style={styles.userId}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
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
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'rgba(2, 68, 102,0.3',
    borderRadius: 14,
    alignItems: 'center',
    elevation: 8,
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
    marginHorizontal: 10,
    fontSize: 12,
    color: 'white',
    lineHeight: 15,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  reviewItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userId: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'white',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    width: 94,
    height: 24,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    backgroundColor: 'rgba(255,255,255,0.8',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.38,
    shadowRadius: 40,
    elevation: 10,
    gap: 4,
  },

  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 8,
  },
});
