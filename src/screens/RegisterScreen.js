import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import OneSignal from 'react-native-onesignal';

import registerUser from '../api/registerUser';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import RegisterImage from '../assets/register.png';
import LeftArrow from '../assets/left_icon.png';

import UserIcon from '../assets/user_icon.svg';
import PasswordIcon from '../assets/password_icon.svg';
import EmailIcon from '../assets/email_icon.svg';
import PhoneIcon from '../assets/phone_icon.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageContainer: {
    marginTop: 40,
    marginHorizontal: 14,
    alignSelf: 'center'
  },
  registerContainer: {
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

function RegisterScreen() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hidePassword, setShowPassword] = useState(true);
  const [hideConfirmPassword, setShowConfirmPassword] = useState(true);
  const [oneSignalId, setOneSignalId] = useState(null);

  useEffect(() => {
    const getOneSigData = async () => {
      const deviceState = await OneSignal.getDeviceState();
      setOneSignalId(deviceState.userId);
    };
    getOneSigData();
  }, []);


  const checkValidation = () => {
    return (
      fullName.length > 0 &&
      email. length > 0 &&
      telephoneNumber. length > 0 &&
      password. length > 0 &&
      confirmPassword. length > 0
    );
  };

  const onRegister = async () => {
    setLoading(true);
    const payload = {
      name: fullName,
      email,
      phone_no: telephoneNumber,
      password,
      password_validate: confirmPassword,
      device_id: oneSignalId
    };

    try {
      const result = await registerUser('/auth/register', payload);
      const { id: userId, name, email: emailReg, token, refresh_token } = result.data;
      const idPair = ['@userId', JSON.stringify(userId)];
      const namePair = ['@name', name];
      const emailpair = ['@email', emailReg];
      const tokenPair = ['@token', token];
      const refreshTokenPair = ['@refreshToken', refresh_token];
      try {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('@onboarded', 'true');
        await AsyncStorage.multiSet([idPair, namePair, emailpair, tokenPair, refreshTokenPair]);
      } catch (err) {
        console.log('error saving basic data to async storage');
      }
      alert('Success to register.');
      Actions.registerBankScreen();
    } catch (err) {
      alert(`Failed to register. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bodyWhite }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image style={{ width: 30, height: 22 }} source={LeftArrow} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[fonts['Default-14-black']], { marginLeft: -30 }}>
                Buat Akunmu Sekarang
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={RegisterImage} resizeMode="contain" />
        </View>
        <View style={styles.registerContainer}>
          <View style={styles.inputContainer}>
            <UserIcon width={23} height={23} />
            <TextInput
              placeholder="Nama Lengkap"
              style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
              value={fullName}
              onChangeText={(input) => setFullName(input)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <EmailIcon width={23} height={23} />
            <TextInput
              placeholder="Alamat Email"
              value={email}
              onChangeText={(input) => setEmail(input)}
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <PhoneIcon width={23} height={23} />
            <TextInput
              placeholder="Nomor Telepon"
              value={telephoneNumber}
              onChangeText={(input) => setTelephoneNumber(input)}
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
          <View style={styles.inputContainer}>
            <PasswordIcon width={23} height={23} />
            <TextInput
              placeholder="Konfirmasi Password"
              secureTextEntry={hideConfirmPassword}
              value={confirmPassword}
              onChangeText={(input) => setConfirmPassword(input)}
              style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!hideConfirmPassword)}>
              <Icon name={hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.lightGray} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.skyBlueCrayola }]}
              onPress={() => onRegister()}
              disabled={checkValidation() ? false : true}
            >
              {
                isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
