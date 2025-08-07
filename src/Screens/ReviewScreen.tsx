/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  addDoc,
  collection,
  FirebaseFirestoreTypes,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

type Review = {
  id: string;
  text: string;
  movieId: string;
  userId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

const db = getFirestore();

const ReviewScreen = ({ route }: any) => {
  const { movieId } = route.params;
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

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

  useEffect(() => {
    const user = auth().currentUser;
    if (!user || !movieId) return;

    const reviewCollection = firestore().collection('reviews');
    const q = query(
      reviewCollection,
      where('movieId', '==', movieId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      if (!snapshot) {
        console.warn('Received null snapshot');
        return;
      }
      const reviewList: Review[] = snapshot.docs.map(
        (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            movieId: data.movieId,
            userId: data.userId,
            createdAt: data.createdAt || null,
          };
        },
      );
      setReviews(reviewList);
    });
    return () => unsubscribe();
  }, [movieId]);
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

      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.userId}>User: {item.userId}</Text>
            <Text> {item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
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
  reviewItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userId: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
