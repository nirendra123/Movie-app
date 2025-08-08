import { getAuth } from '@react-native-firebase/auth';

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const db = getFirestore();

const ReviewScreen = ({ route }: any) => {
  const { movieId } = route.params;
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    const user = getAuth().currentUser;

    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, 'reviews'), {
        movieId,
        text,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      setText('');
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <View style={styles.container}>
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
    padding: 16,
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
  
});
