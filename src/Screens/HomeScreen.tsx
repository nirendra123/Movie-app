import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStack from '../Navigation/BottomStack';
import MovieDetailsScreen from './MovieDetailsScreen';
import ReviewScreen from './ReviewScreen';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomStack} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ headerShown: false, title: 'Movie Details' }}
      />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
