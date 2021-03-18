import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LeftArrow from '../assets/left_icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  },
  mainBox: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingBottom: 20,
    marginHorizontal: 14,
    marginTop: 30,
    overflow: 'hidden'
  },
  headerBox: {
    backgroundColor: colors.platinum,
    justifyContent: 'center',
    marginBottom: 20,
    padding: 14
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 36
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
  // ROW STYLE
  rowItem: {
    marginBottom: 24,
    flexDirection: 'row',
    paddingHorizontal: 14
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowRight: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 14
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 15,
    marginRight: 10
  },
  unchecked: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checked: {
    backgroundColor: colors.yellowGreen
  }
});

function RekeningItem(props) {
  const { isChecked } = props;
  return (
    <View style={styles.rowItem}>
      <View style={styles.rowLeft}>
        <View style={styles.imageContainer} />
        <Text style={fonts['Default-14-black']}>12352252423</Text>
      </View>
      <TouchableOpacity style={styles.rowRight}>
        <View style={[styles.unchecked, isChecked && styles.checked]}>
          <Icon name="checkmark" size={18} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function SelectRekening() {

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image width="30" height="22" source={LeftArrow} />
            </TouchableOpacity>
            <Text style={[fonts['Default-14-black'], { textAlign: 'center', flex: 1 }]}>
              Pilih rekening yang ingin ditambahkan. Anda bisa memilih lebih dari satu rekening
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.mainBox}>
            <View style={styles.headerBox}>
              <Text style={fonts['Default-18']}>Rekening</Text>
            </View>
            <RekeningItem />
            <RekeningItem isChecked />

          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.yellowGreen }]}>
            <Text style={fonts['Default-14-white-bold']}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default SelectRekening;
