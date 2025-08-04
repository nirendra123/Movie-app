/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
// import LoginScreen from './src/Screens/LoginScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';

function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <WelcomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
