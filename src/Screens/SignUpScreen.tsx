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
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/ifMoviePoster.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        style={{ position: 'absolute', top: 12, left: 10 }}
        source={require('../../assets/LOGO.png')}
      />

      <View style={styles.signUpContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: 'white',
              marginBottom: 2,
            }}
          >
            Sign up
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
            create an account to continue.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image source={require('../../assets/user.png')} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#ccc"
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image
              style={{ width: 15, opacity: 0.3 }}
              resizeMode="contain"
              source={require('../../assets/email.png')}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#ccc"
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={require('../../assets/lock.png')} />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 10, fontWeight: 400 }}>
          Already have an account? Go to the{' '}
          <Text>
            <Text
              style={{
                color: '#FFB703',
                fontSize: 10,
                alignSelf: 'center',
              }}
              onPress={() => navigation.replace('Login')}
            >
              Login Page
            </Text>
          </Text>{' '}
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
  signUpContainer: {
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
