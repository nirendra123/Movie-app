import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStack from '../Navigation/BottomStack';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomStack} />
    </Stack.Navigator>
  );
}
