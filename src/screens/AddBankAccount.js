import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import CardImage from '../assets/card_grey.png';
import PlusIcon from '../assets/plus_icon.png';
import LeftArrow from '../assets/left_icon.png';

import BankIcon from '../assets/bank_black_icon.svg';
import UserIcon from '../assets/user_icon_black.svg';
import PasswordIcon from '../assets/password_icon_black.svg';


const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardImage: {
    alignSelf: 'center',
    width: deviceWidth * 0.8
  },
  imageContainer: {
    marginTop: Platform.OS === 'ios' ? 30 : 0
  },
  plusIcon: {
    position: 'absolute',
    right: (52 / 2) + (52 / 2) * 0.8,
    width: 52,
    height: 52,
    top: Platform.OS === 'android' ? 10 : 0
  },
  inputCategory: {
    flex: 1,
    marginHorizontal: 36,
    marginTop: 40
  },
  inputContainer: {
    height: 40,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    marginBottom: 14
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  button: {
    height: 40,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 14
  },
  infoContainer: {
    marginHorizontal: 60
  }
});

function AddBankAccount() {

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image width="30" height="22" source={LeftArrow} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[fonts['Default-14-black'], { marginLeft: -30 }]}>
                Tambah Rekening
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={CardImage} resizeMode="contain" style={styles.cardImage} />
          <Image source={PlusIcon} resizeMode="contain" style={styles.plusIcon} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={[fonts['Default-12'], { textAlign: 'center', lineHeight: 16 }]}>
            Masukkan ID dan password untuk internet banking, BUKAN mobile banking.
          </Text>
        </View>
        <View style={styles.inputCategory}>
          <View style={styles.inputContainer}>
            <BankIcon width={23} height={23} />
            <TextInput
              placeholder="Nama Lengkap"
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <UserIcon width={23} height={23} />
            <TextInput
              placeholder="Username"
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <PasswordIcon width={23} height={23} />
            <TextInput
              placeholder="Password"
              style={[fonts['Default-14-black'], { marginLeft: 10 }]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.yellowGreen }]}
              onPress={() => Actions.selectRekening()}
            >
              <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddBankAccount;
