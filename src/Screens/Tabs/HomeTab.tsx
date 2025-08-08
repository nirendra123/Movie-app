/* eslint-disable react-native/no-inline-styles */

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MovieList from '../../Components/MovieList';
export default function HomeTab() {
  // useEffect(() => {
  //   fetch(
  //     'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  //     options,
  //   )
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
  // }, []);

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
        <MovieList title="New Releases" category="now_playing" />
        <MovieList title="Upcoming Movies" category="upcoming" />
        <MovieList title="Ranked Movies" category="top_rated" />
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
