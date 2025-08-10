import { getAuth } from '@react-native-firebase/auth';

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { useState } from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const db = getFirestore();

const ReviewScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params;
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

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
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Reviews</Text>
      <TextInput
        placeholder="Write your review..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
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
});
