import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Header
} from '../components';

import CoinImage from '../assets/coin.png';
import fonts from '../themes/fonts';
import colors from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: 'green'
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
  const { isActive, onReactivate } = props;
  return (
    <View style={styles.rowContainer}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.imageContainer} />
        <Text style={fonts['Default-14-black']}>21314124</Text>
      </View>
      <View style={styles.rowRightContent}>
        {
          !isActive && (
            <TouchableOpacity onPress={onReactivate}>
              <Icon name="reload-outline" size={24} style={{ marginBottom: 16 }} />
            </TouchableOpacity>
          )
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


function ProfileScreen() {

  const onAddPress = () => {

  };

  const onEditPress = () => {

  };

  const onSettingPress = () => {

  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={CoinImage} style={styles.image} />
          <View style={styles.overview}>
            <Text style={styles.titleText}>JOHAN GANDA WIJAYA</Text>
            <Text style={styles.titleText}>Rp 2.378.967.988</Text>
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
              4 Rekening Terdaftar
            </Text>
            <View style={styles.bankList}>
              <BankItem />
              <BankItem />
              <BankItem />
              <BankItem />
              <BankItem />
              <BankItem />
              <BankItem isActive />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
