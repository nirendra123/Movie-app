/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MovieList from '../../Components/MovieList';
import { ScrollView } from 'react-native';

export default function ProfileTab() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View>
            <Image
              source={require('../../../assets/backgroundprofile.jpg')}
              style={{
                width: 318,
                height: 150,
                borderRadius: 14,
                marginTop: 8,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.userDetailContainer}>
            <View style={styles.userImage}>
              <Image
                source={require('../../../assets/staticprofile.png')}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                resizeMode="cover"
              />
            </View>

            <View
              style={{
                width: '58%',
                justifyContent: 'flex-start',

                rowGap: 10,
              }}
            >
              <View>
                <Text style={styles.userFullName}>Dilhara Sannagala</Text>
                <Text style={styles.userName}>@dihara24</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontSize: 8, fontWeight: '700', color: 'white' }}
                  >
                    500 <Text style={{ color: 'lightgrey' }}>Followers</Text>
                  </Text>
                </View>

                <View style={{ justifyContent: 'flex-start', width: '50%' }}>
                  {' '}
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: '700',
                      color: 'white',
                    }}
                  >
                    420 <Text style={{ color: 'lightgrey' }}>Followings</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginHorizontal: 15, gap: 10 }}>
          <View style={styles.movieWatched}>
            <Text style={{ fontSize: 8, color: 'lightgrey' }}>
              Movie Watched
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'white' }}>
              2000
            </Text>
          </View>
          <View style={styles.timeSpent}>
            <Text style={{ fontSize: 8, color: 'lightgrey' }}>Time Spent</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'white' }}>
              24m 30d 23h
            </Text>
          </View>
        </View>
        <MovieList title="Favourites" category="now_playing" />
        <MovieList title="Recently Watched Movies" category="top_rated" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
    flexDirection: 'column',
  },
  profileContainer: {
    marginVertical: 15,
    width: 334,
    height: 253,
    backgroundColor: 'grey',
    alignSelf: 'center',
    borderRadius: 14,
    alignItems: 'center',
  },
  userDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '90%',
  },
  userImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 50,
  },
  userFullName: { fontSize: 16, fontWeight: '600', color: 'white' },
  userName: {
    fontSize: 12,
    fontWeight: '400',
    color: 'lightgrey',
  },
  movieWatched: {
    backgroundColor: 'grey',
    width: 154,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  timeSpent: {
    backgroundColor: 'grey',
    width: 163,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
});
