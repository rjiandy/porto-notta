import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

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
    flex: 1
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{ position: 'absolute', left: 12 }}
          >
            <Image width="30" height="22" source={LeftArrow} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={[fonts['Default-14-black'], { alignSelf: 'center' }]}>
              Buat Akunmu Sekarang
            </Text>
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
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <EmailIcon width={23} height={23} />
            <TextInput
              placeholder="Alamat Email"
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <PhoneIcon width={23} height={23} />
            <TextInput
              placeholder="Nomor Telepon"
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
          <View style={styles.inputContainer}>
            <PasswordIcon width={23} height={23} />
            <TextInput
              placeholder="Konfirmasi Password"
              secureTextEntry
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.skyBlueCrayola }]}>
              <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
