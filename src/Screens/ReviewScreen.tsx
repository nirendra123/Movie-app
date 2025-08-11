/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IMAGE_BASE_URL } from './MovieDetailsScreen';
import FastImage from 'react-native-fast-image';

const db = getFirestore();

const ReviewScreen = ({ navigation, route }: any) => {
  const { movieId, posterPath, title } = route.params;
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  console.log('posterPath:', posterPath);
  console.log('Full URL:', `${IMAGE_BASE_URL}${posterPath}`);

  const handleSubmit = async () => {
    const user = getAuth().currentUser;

    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, 'reviews'), {
        movieId,
        text,
        rating,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      setText('');
      setRating(0);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>{title}</Text>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white' }}>Watched on</Text>
                <Text>date</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{ width: 10, height: 10 }}
                  source={require('../../assets/selectbox.png')}
                  resizeMode="contain"
                />
                <Text>REewatch</Text>
                <Image
                  style={{ width: 10, height: 10 }}
                  source={require('../../assets/rewind.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View>
            <FastImage
              style={styles.smallPoster}
              source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>

        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map(num => (
            <TouchableOpacity key={num} onPress={() => setRating(num)}>
              <Icon
                name={num <= rating ? 'star' : 'star-border'}
                size={30}
                color={num <= rating ? '#FFD700' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Write down your review..."
          placeholderTextColor="#ccc"
          value={text}
          onChangeText={setText}
          style={styles.input}
          multiline
          numberOfLines={20}
        />
        <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
  },

  input: {
    width: '88%',
    height: 320,
    borderWidth: 1,
    borderColor: '#aaa',
    alignSelf: 'center',
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    marginBottom: 30,
    borderRadius: 20,
    color: 'white',
    padding: 25,
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  arrowButton: {
    width: 50,
    height: 50,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  smallPoster: {
    width: 106,
    height: 163,
    borderRadius: 14,
    position: 'relative',
    bottom: 50,
    right: 15,
    zIndex: 2,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: 'white',
  },
  publishButton: {
    width: 104,
    height: 36,
    backgroundColor: '#FFB703',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 30,
  },
});
