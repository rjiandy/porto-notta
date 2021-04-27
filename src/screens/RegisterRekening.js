import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LeftArrow from '../assets/left_icon.png';
import patchJSON from '../api/patchJSON';

import { Success } from '../components';

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
  const { isChecked, onPress, rekeningNumber, imageUrl } = props;
  return (
    <View style={styles.rowItem}>
      <View style={styles.rowLeft}>
        <Image style={styles.imageContainer} source={{ uri: imageUrl }} />
        <Text style={fonts['Default-14-black']}>{rekeningNumber}</Text>
      </View>
      <TouchableOpacity style={styles.rowRight} onPress={onPress}>
        <View style={[styles.unchecked, isChecked && styles.checked]}>
          <Icon name="checkmark" size={18} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function SelectRekening(props) {
  const { rekeningList, bankImage, bankId } = props;

  const [selectedList, setSelectedList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const onRegisterRekening = async () => {
    setLoading(true);
    try {
      const result = await patchJSON(`/bank/activate/${bankId}`, {
        no_rekening: selectedList
      });
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          Actions.replace('homeScreen');
        }, 700);
      }
    } catch (error) {
      alert(`Failed to activate rekening, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inactiveList = rekeningList.filter((data) => !data.active);
  if (isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <Success label="Rekening Telah Berhasil Ditambahkan" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image style={{ width: 30, height: 22 }} source={LeftArrow} />
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
              {
                inactiveList.map((data, index) => {
                  return (
                    <RekeningItem
                      rekeningNumber={data.no_rekening}
                      key={index}
                      isChecked={selectedList.includes(data.no_rekening)}
                      onPress={() => {
                        if (selectedList.includes(data.no_rekening)) {
                          setSelectedList(selectedList.filter((id) => id !== data.no_rekening));
                        } else {
                          setSelectedList([...selectedList, data.no_rekening]);
                        }
                      }}
                      imageUrl={bankImage}
                    />
                  );
                })
              }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.yellowGreen }]}
              onPress={onRegisterRekening}
              disabled={isLoading || selectedList.length <= 0}
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
    );
  }
}

function mapStateToProps(state) {
  const { registerStore } = state;
  return {
    rekeningList: registerStore.rekeningList,
    bankImage: registerStore.registerBankPayload.data.bank.bank_image,
    bankId: registerStore.registerBankPayload.data.id
  };
}

export default connect(mapStateToProps)(SelectRekening);
