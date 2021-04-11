import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import { Header, Navbar } from '../components';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import CardImage from '../assets/card_grey.png';
import PlusIcon from '../assets/plus_icon.png';
import LeftArrow from '../assets/left_icon.png';

import BankIcon from '../assets/bank_black_icon.svg';
import UserIcon from '../assets/user_icon_black.svg';
import PasswordIcon from '../assets/password_icon_black.svg';

import { Loading } from '../components';

import getBankList from '../api/getBankList';
import postJSON from '../api/postJSON';


import BankOptions from './components/BankOptions';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 88
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardImage: {
    alignSelf: 'center',
    width: deviceWidth * 0.8,
    height: 250
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

function AddBankAccount(props) {
  const { addRekeningList } = props;
  const [showBankModal, setBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setShowPassword] = useState(true);

  const [bankData, setBankData] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [registerBankLoading, setRegisterBankLoading] = useState(false);

  const onRegisterBank = async () => {
    try {
      setRegisterBankLoading(true);
      const result = await postJSON('/bank/login', {
        bank_code: selectedBank.bank_code,
        username,
        password
      });
      if (result) {
        addRekeningList(result);
      }
      Actions.addRekeningScreen();
    } catch (err) {
      alert(`Failed, ${err.message}`);
    } finally {
      setRegisterBankLoading(false);
    }
  };

  useEffect(() => {
    const fetchBank = async () => {
      setFetchLoading(true);
      try {
        const result = await getBankList();
        if (result && result.data) {
          setBankData(result.data);
        }
        setFetchLoading(false);
      } catch (err) {
        setFetchLoading(false);
        console.log('Error get Bank List', err);
      }
    };
    fetchBank();
  }, []);

  if (registerBankLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading label="Mohon tunggu sebentar, kami membutuhkan beberapa saat untuk memproses" />
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {
          showBankModal && (
            <BankOptions
              data={bankData}
              onSelectBank={(data) => {
                setSelectedBank(data);
                setBankModal(false);
              }}
            />
          )
        }
        <Header />
        <ScrollView style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.profileScreen();
                  }}
                >
                  <Image style={{ width: 30, height: 22 }} source={LeftArrow} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[fonts['Default-14-black'], { marginLeft: -50 }]}>
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
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setBankModal(true)}
                disabled={fetchLoading}
              >
                <BankIcon width={23} height={23} />
                <View style={{ marginLeft: 10 }}>
                  {
                    fetchLoading ? (
                      <ActivityIndicator size="small" color={colors.yellowGreen} />
                    ) : (
                      <Text style={fonts['Default-14-black']}>
                        { selectedBank ? selectedBank.bank_name : 'Pilih Bank'}
                      </Text>
                    )
                  }
                </View>
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <UserIcon width={23} height={23} />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={colors.black}
                  style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <PasswordIcon width={23} height={23} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.black}
                  style={[fonts['Default-14-black'], { marginLeft: 10, flex: 1 }]}
                  secureTextEntry={hidePassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!hidePassword)}>
                  <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.yellowGreen }]}
                  onPress={onRegisterBank}
                >
                  <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Navbar />
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRekeningList: (payload) => {
      dispatch({
        type: 'ADD_REKENING_LIST',
        payload
      });
    }
  };
}

export default connect(null, mapDispatchToProps)(AddBankAccount);
