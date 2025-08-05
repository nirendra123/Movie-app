/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require('../../assets/loginbackground.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        style={{ position: 'absolute', top: 12, left: 10 }}
        source={require('../../assets/LOGO.png')}
        resizeMode="cover"
      />

      <View style={styles.loginContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: 'white',
              marginBottom: 2,
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'white',
              marginBottom: 2,
            }}
          >
            {' '}
            Please sign in to continue
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image source={require('../../assets/user.png')} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#ccc"
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={require('../../assets/lock.png')} />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgetPassword}>
          <Text
            style={{
              color: '#FFB703',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 10, fontWeight: 400 }}>
          Don't have an account? Please{' '}
          <Text>
            <Text
              style={{
                color: '#FFB703',
                fontSize: 10,
                alignSelf: 'center',
              }}
            >
              Sign Up
            </Text>
          </Text>{' '}
          first.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(255,255,255,0.3',
    marginHorizontal: 10,
    borderRadius: 40,
    alignItems: 'center',
    padding: 30,
    elevation: 8,
    position: 'absolute',
    bottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 5,
    marginBottom: 20,
  },

  inputWrapper: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',

    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingLeft: 30,
    borderRadius: 14,
    // width: '100%',
  },
  input: {
    width: 280,
    padding: 12,
    // borderRadius: 32,
    // backgroundColor: 'rgba(255,255,255,0.2)',
    // marginTop: 15,

    color: '#fff',
  },
  loginButton: {
    height: 40,
    backgroundColor: '#FFCA45',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    lineHeight: 20,
    letterSpacing: 1.5,
  },
  forgetPassword: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
    width: 300,
  },
});
