import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Body } from '../components';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LoginImage from '../assets/login.png';
import UserIcon from '../assets/user_icon.svg';
import PasswordIcon from '../assets/password_icon.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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

  return (
    <Body>
      <View style={styles.container}>
        <Text style={[fonts['Default-14-black'], { alignSelf: 'center' }]}>
          Masuk/Daftar
        </Text>
        <View style={styles.imageContainer}>
          <Image source={LoginImage} resizeMode="contain" />
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <UserIcon width={23} height={23} />
            <TextInput
              placeholder="Email"
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <PasswordIcon width={23} height={23} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.yellowGreen }]}>
              <Text style={fonts['Default-14-white-bold']}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.skyBlueCrayola }]}>
              <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Body>
  );
}

export default LoginScreen;
