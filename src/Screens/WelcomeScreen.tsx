import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Banner.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <Image
        source={require('../../assets/Frame.png')}
        style={styles.img}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>"Track films you,ve"</Text>
        <Text style={styles.textStyle}>watched.Save those you</Text>
        <Text style={styles.textStyle}>Want to see."</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
  },
  background: {
    width: 375,
    height: 389,

    // justifyContent: 'center',
  },
  textContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1.5,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#FFCA45',
    marginHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 800,
    fontSize: 16,
  },
  img: {
    position: 'absolute',
    left: 85,
    top: 250,
  },
});
