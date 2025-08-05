/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import SignUpScreen from './src/Screens/SignUpScreen';
// import LoginScreen from './src/Screens/LoginScreen';
// import WelcomeScreen from './src/Screens/WelcomeScreen';

function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      {/* <WelcomeScreen /> */}
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
