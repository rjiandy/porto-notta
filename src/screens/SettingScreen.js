import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Header,
  Success,
  Navbar
} from '../components';

import fonts from '../themes/fonts';
import colors from '../themes/colors';
import LeftArrow from '../assets/left_icon.png';

import patchJSON from '../api/patchJSON';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyWhite
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  whiteRow: {
    paddingVertical: 12,
    paddingLeft: 50,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.cultured,
    flexDirection: 'row',
    paddingRight: 20
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 32,
    paddingVertical: 30
  },
  button: {
    height: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 24,
    backgroundColor: colors.yellowGreen,
    marginHorizontal: 30
  },
  smallButtonGroup: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-evenly'
  },
  smallButton: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  supportContainer: {
    paddingLeft: 50
  },
  supportDetail: {
    marginTop: 20,
    paddingLeft: 25
  }
});

function SettingScreen() {
  const [changePassword, setChangePassword] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmationPassword, setConfirmationPassword] = useState('');

  const [hideOldPassword, setShowOldPassword] = useState(true);
  const [hidePassword, setShowPassword] = useState(true);
  const [hideConfirmPassword, setShowConfirmPassword] = useState(true);

  const onLogout = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@onboarded', 'true');
    Actions.loginScreen();
  };

  const onConfirmPress = async () => {
    setLoading(true);
    try {
      await patchJSON('/auth/update-password', {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_validate: newConfirmationPassword
      });
      setSuccess(true);
      setConfirmModal(false);
      setChangePassword(false);
      setNewPassword('');
      setOldPassword('');
      setConfirmationPassword('');

      setTimeout(() => {
        setSuccess(false);
      }, 700);

    } catch (err) {
      alert('Failed To Change Password ', err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAllFilled = () => {
    return (
      oldPassword && oldPassword.length > 0 &&
      newPassword && newPassword.length > 0 &&
      newConfirmationPassword && newConfirmationPassword.length > 0
    );
  };
  if (isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <Success label="Password Berhasil Diganti" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (changePassword || showSupport) {
                  setChangePassword(false);
                  setShowSupport(false);
                } else {
                  Actions.profileScreen();
                }
              }}
            >
              <Image style={{ width: 30, height: 22 }} source={LeftArrow} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[fonts['Default-14-black'], { marginLeft: -50 }]}>
                { showSupport ? 'Bantuan' : 'Pengaturan' }
              </Text>
            </View>
          </View>
        </View>
        {
          showConfirmModal && (
            <Modal
              presentationStyle="overFullScreen"
              transparent
            >
              <View style={styles.overlay}>
                <View style={styles.modalContent}>
                  <Text style={[fonts['Default-14-black'], { textAlign: 'center' }]}>
                    Apakah Anda Yakin Untuk Mengganti Password Anda?
                  </Text>
                  <View style={styles.smallButtonGroup}>
                    <TouchableOpacity
                      style={[styles.smallButton, { backgroundColor: colors.yellowGreen }]}
                      onPress={() => onConfirmPress()}
                      disabled={isLoading}
                    >
                      {
                        isLoading ? (
                          <ActivityIndicator size="small" color={colors.white} />
                        ) : (
                          <Text style={fonts['Default-14-white']}>Ganti</Text>
                        )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.smallButton, { backgroundColor: colors.candyPink }]}
                      onPress={() => setConfirmModal(false)}
                      disabled={isLoading}
                    >
                      <Text style={fonts['Default-14-white']}>Batal</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )
        }
        <View style={{ flex: 1 }}>
          {
            !changePassword && !showSupport && (
              <>
                <TouchableOpacity style={styles.whiteRow} onPress={() => setChangePassword(true)}>
                  <Text style={fonts['Default-14-black-bold']}>Ganti Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteRow} onPress={() => setShowSupport(true)}>
                  <Text style={fonts['Default-14-black-bold']}>Bantuan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteRow} onPress={() => onLogout()}>
                  <Text style={fonts['Default-14-black-bold']}>Logout</Text>
                </TouchableOpacity>
              </>
            )
          }
          {
            changePassword && (
              <View style={{ flex: 1 }}>
                <View style={styles.whiteRow}>
                  <TextInput
                    placeholder="Password Lama"
                    autoCapitalize="none"
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    secureTextEntry={hideOldPassword}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={() => setShowOldPassword(!hideOldPassword)}>
                    <Icon name={hideOldPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.lightGray} />
                  </TouchableOpacity>
                </View>
                <View style={styles.whiteRow}>
                  <TextInput
                    placeholder="Password Baru"
                    autoCapitalize="none"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry={hidePassword}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!hidePassword)}>
                    <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.lightGray} />
                  </TouchableOpacity>
                </View>
                <View style={styles.whiteRow}>
                  <TextInput
                    placeholder="Ulangi Password Baru"
                    autoCapitalize="none"
                    value={newConfirmationPassword}
                    onChangeText={(text) => setConfirmationPassword(text)}
                    secureTextEntry={hideConfirmPassword}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!hideConfirmPassword)}>
                    <Icon name={hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={colors.lightGray} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setConfirmModal(true)}
                    disabled={!isAllFilled()}
                  >
                    <Text style={fonts['Default-14-white-bold']}>Ganti Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
          {
            showSupport && (
              <View style={{ flex: 1 }}>
                <View style={styles.supportContainer}>
                  <Text style={fonts['Default-14-black-bold']}>
                    Silahkan menghubungi Kami untuk mendapatkan bantuan:
                  </Text>
                  <View style={styles.supportDetail}>
                    <Text style={[fonts['Default-14-black-bold'], { marginBottom: 10 }]}>
                      info@notta.id
                    </Text>
                    <Text style={fonts['Default-14-black-bold']}>
                      08123456789
                    </Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
        <Navbar />
      </View>
    );
  }
}

export default SettingScreen;
