import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import BASE_URL from '../api/BASE_URL';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LoginImage from '../assets/login.png';
import UserIcon from '../assets/user_icon.svg';
import PasswordIcon from '../assets/password_icon.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  header: {
    marginTop: 40,
    marginBottom: 40
  },
  imageContainer: {
    marginTop: 40,
    marginHorizontal: 14,
    alignSelf: 'center'
  },
  loginContainer: {
    marginTop: 14,
    marginHorizontal: 24
  },
  inputContainer: {
    height: 40,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    marginBottom: 14
  },
  buttonContainer: {
    marginTop: 30
  },
  button: {
    height: 40,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 14
  }
});

function LoginScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setShowPassword] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const onLoginPress = async () => {
    setLoading(true);
    try {
      const result = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: username,
          password
        })
      });
      if (result.ok) {
        const body = await result.json();
        if (body && body.data) {
          const { id: userId, name, email, token, refresh_token } = body.data;
          const idPair = ['@userId', JSON.stringify(userId)];
          const namePair = ['@name', name];
          const emailpair = ['@email', email];
          const tokenPair = ['@token', token];
          const refreshTokenPair = ['@refreshToken', refresh_token];

          try {
            await AsyncStorage.multiSet([idPair, namePair, emailpair, tokenPair, refreshTokenPair]);
          } catch (err) {
            console.log('error saving basic data to async storage', err);
          }

          Actions.replace('homeScreen');
        }
      } else {
        throw result;
      }
    } catch (err) {
      alert('Gagal Login, Cek Login dan Password Anda dan Silahkan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bodyWhite }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[fonts['Default-14-black'], { alignSelf: 'center' }]}>
            Masuk/Daftar
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={LoginImage} resizeMode="contain" />
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <UserIcon width={23} height={23} />
            <TextInput
              placeholder="Email"
              value={username}
              onChangeText={(input) => setUserName(input)}
              style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <PasswordIcon width={23} height={23} />
            <TextInput
              placeholder="Password"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={(input) => setPassword(input)}
              style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!hidePassword)}>
              <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.lightGray} />
            </TouchableOpacity>

          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.yellowGreen }]}
              onPress={onLoginPress}
              disabled={(username.length === 0 && password.length === 0) || isLoading}
            >
              {
                isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={fonts['Default-14-white-bold']}>Masuk</Text>
                )
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.skyBlueCrayola }]}
              onPress={() => Actions.registerScreen()}
              disabled={isLoading}
            >
              <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
