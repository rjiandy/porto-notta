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

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LockImage from '../assets/lock_image.png';
import UserIcon from '../assets/user_icon.svg';

import postJSON from '../api/postJSON';

import { Success } from '../components';

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
    marginTop: 10,
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
    marginBottom: 40
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

function ForgetPasswordScreen() {
  const [username, setUserName] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const onLoginPress = async () => {
    setLoading(true);
    try {
      const result = await postJSON('/auth/reset-password', {
        email: username
      });
      if (result.code === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          Actions.replace('loginScreen');
        }, 700);
      } else {
        throw result;
      }
    } catch (err) {
      alert('Gagal mengirimkan email. Silahkan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <Success label="Silahkan cek email anda untuk mereset password anda" />
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.bodyWhite }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={[fonts['Default-14-black'], { alignSelf: 'center' }]}>
              Lupa Password
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={LockImage} resizeMode="contain" style={{ height: 140, marginBottom: 20 }} />
            <Text
              style={[
                fonts['Default-14-black'],
                { textAlign: 'center', marginHorizontal: 20, marginBottom: 20 }
              ]}
            >
              Jangan takut, silahkan masukkan alamat email anda untuk mendapatkan password yang baru.
            </Text>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.yellowGreen }]}
                onPress={onLoginPress}
                disabled={(username.length === 0) || isLoading}
              >
                {
                  isLoading ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Text style={fonts['Default-14-white-bold']}>Reset Password</Text>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.skyBlueCrayola }]}
                onPress={() => Actions.loginScreen()}
                disabled={isLoading}
              >
                <Text style={fonts['Default-14-white-bold']}>Kembali Ke Halaman Masuk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

}

export default ForgetPasswordScreen;
