import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

import {
  Header
} from '../components';

import CoinImage from '../assets/coin.png';
import fonts from '../themes/fonts';
import colors from '../themes/colors';

import getJSON from '../api/getJSON';
import patchJSON from '../api/patchJSON';
import thousandSeparator from '../utils/thousandSeparator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyWhite
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  overview: {
    alignSelf: 'center'
  },
  titleText: {
    ...fonts['Default-18'],
    textAlign: 'center',
    marginBottom: 8
  },
  profileBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 14,
    marginTop: 15
  },
  profileButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonOverview: {
    alignItems: 'center'
  },
  profileDetailContainer: {
    marginHorizontal: 16,
    marginTop: 20
  },
  bankList: {
    borderTopWidth: 1,
    borderTopColor: colors.black,
    marginTop: 8,
    paddingTop: 14
  },

  // Item Styles
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 12,
    backgroundColor: colors.silverChalice
  },
  rowRightContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bankStatusContainer: {
    alignItems: 'center',
    width: 70
  },
  bankStatus: {
    borderRadius: 12,
    width: 24,
    height: 24,
    backgroundColor: colors.yellowGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  }
});

function BankItem(props) {
  const { isActive, onReactivate, rekeningNumber, imageUrl, loading } = props;
  return (
    <View style={styles.rowContainer}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.imageContainer} source={{ uri: imageUrl }} />
        <Text style={fonts['Default-14-black']}>{rekeningNumber}</Text>
      </View>
      <View style={styles.rowRightContent}>
        {
          !isActive ?
            loading ? (
              <ActivityIndicator size="small" color={colors.yellowGreen} />
            ) : (
              <TouchableOpacity onPress={onReactivate}>
                <Icon name="reload-outline" size={24} style={{ marginBottom: 16 }} />
              </TouchableOpacity>
            ) : null
        }
        <View style={styles.bankStatusContainer}>
          <View style={[styles.bankStatus, !isActive && { backgroundColor: colors.candyPink }]}>
            <Icon name={isActive ? 'checkmark' : 'close'} size={20} color={colors.white} />
          </View>
          <Text style={fonts['Default-12']}>
            {isActive ? 'Aktif' : 'Tidak Aktif'}
          </Text>
        </View>
      </View>
    </View>
  );
}


function ProfileScreen(props) {
  const { triggerData } = props;
  const [fullName, setFullName] = useState('-');
  const [rekeningList, setRekeningList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [loadingActivate, setLoadingActivate] = useState(false);

  useEffect(() => {
    const getFullName = async () => {
      const savedName = await AsyncStorage.getItem('@name');
      if (savedName) {
        setFullName(savedName.toUpperCase());
      }
    };
    getFullName();
  }, []);

  useEffect(() => {
    const getRekeningData = async () => {
      setLoading(true);
      try {
        const result = await getJSON('/bank/account');
        const { data } = result;
        const { saldo: saldoRes, listRekening } = data;

        setSaldo(saldoRes);
        setRekeningList(listRekening);

      } catch (err) {
        alert('Failed To Get Rekening Data ', err.message);
      } finally {
        setLoading(false);
      }
    };
    getRekeningData();
  }, [triggerData]);

  const onAddPress = () => {
    Actions.addBankScreen();
  };

  const onEditPress = () => {
    Actions.deleteRekeningScreen();
  };

  const onSettingPress = () => {
    Actions.settingScreen();
  };

  const onReactivatePress = async (id) => {
    setLoadingActivate(true);
    try {
      const result = await patchJSON(`/bank/activate/${id}`);
      if (result) {
        alert('Success Activate Rekening');
      }
    } catch (error) {
      alert(`Failed to activate rekening, ${error.message}`);
    } finally {
      setLoadingActivate(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={CoinImage} style={styles.image} />
          <View style={styles.overview}>
            <Text style={styles.titleText}>{fullName}</Text>
            {
              isLoading ? (
                <ActivityIndicator size="small" color={colors.yellowGreen} />
              ) : (
                <Text style={styles.titleText}>{`Rp. ${thousandSeparator(saldo)}`}</Text>
              )
            }
          </View>
          <View style={styles.profileBtnContainer}>
            <View style={styles.buttonOverview}>
              <TouchableOpacity
                style={[styles.profileButton, { backgroundColor: colors.yellowGreen }]}
                onPress={onAddPress}
              >
                <Icon name="add-outline" size={60} color={colors.white} style={{ marginLeft: 2 }} />
              </TouchableOpacity>
              <Text style={[fonts['Default-12'], { marginTop: 6 }]}>Tambah</Text>
            </View>
            <View style={styles.buttonOverview}>
              <TouchableOpacity
                style={[styles.profileButton, { backgroundColor: colors.candyPink }]}
                onPress={onEditPress}
              >
                <Icon name="remove-outline" size={60} color={colors.white} style={{ marginLeft: 2 }} />
              </TouchableOpacity>
              <Text style={[fonts['Default-12'], { marginTop: 6 }]}>Ubah</Text>
            </View>
            <View style={styles.buttonOverview}>
              <TouchableOpacity
                style={[styles.profileButton, { backgroundColor: colors.black }]}
                onPress={onSettingPress}
              >
                <Icon name="settings" size={40} color={colors.white} style={{ marginLeft: 2 }} />
              </TouchableOpacity>
              <Text style={[fonts['Default-12'], { marginTop: 6 }]}>Pengaturan</Text>
            </View>
          </View>
          <View style={styles.profileDetailContainer}>
            <Text style={fonts['Default-14-black']}>Daftar Rekening</Text>
            <Text style={[fonts['Default-12'], { marginTop: 4 }]}>
              {`${rekeningList.length} Rekening Terdaftar`}
            </Text>
            <View style={styles.bankList}>
              {
                isLoading ? (
                  <ActivityIndicator size="large" color={colors.yellowGreen} />
                ) : rekeningList.map((data, index) => {
                  return (
                    <BankItem
                      key={index}
                      isActive={data.active}
                      rekeningNumber={data.no_rekening}
                      imageUrl={data.bank_image}
                      onReactivate={() => onReactivatePress(data.id)}
                      loading={loadingActivate}
                    />
                  );
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  const { triggerStore } = state;
  return {
    triggerData: triggerStore.triggerNewData
  };
}

export default connect(mapStateToProps)(ProfileScreen);
