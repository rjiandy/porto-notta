import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import LeftArrow from '../assets/left_icon.png';
import patchJSON from '../api/patchJSON';
import getJSON from '../api/getJSON';

import { Success, Header } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 20,
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

function DeleteRekeningScreen(props) {
  const [rekeningList, setRekeningList] = useState([]);
  const [selectedRekeningId, setRekeningId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInitData, setInitData] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const getRekeningData = async () => {
      setInitData(true);
      try {
        const result = await getJSON('/bank/account');
        const { data } = result;
        const { listRekening } = data;

        setRekeningList(listRekening);

      } catch (err) {
        alert('Failed To Get Rekening Data ', err.message);
      } finally {
        setInitData(false);
      }
    };
    getRekeningData();
  }, []);

  const onDeleteRekening = async () => {
    setLoading(true);
    try {
      const result = await patchJSON(`/bank/activate/${selectedRekeningId}`);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          Actions.profileScreen();
        }, 700);
      }
    } catch (error) {
      alert(`Failed to activate rekening, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const activeList = rekeningList.filter((data) => data.active);

  if (isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <Success label="Rekening Telah Berhasil Dihapus" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        {
          deleteModal && (
            <Modal
              presentationStyle="overFullScreen"
              transparent
            >
              <View style={styles.overlay}>
                <View style={styles.modalContent}>
                  <Text style={[fonts['Default-14-black'], { textAlign: 'center' }]}>
                    Apakah Anda Yakin Untuk Menghapus Rekening Ini?
                  </Text>
                  <View style={styles.smallButtonGroup}>
                    <TouchableOpacity
                      style={[styles.smallButton, { backgroundColor: colors.yellowGreen }]}
                      onPress={() => onDeleteRekening()}
                      disabled={isLoading}
                    >
                      {
                        isLoading ? (
                          <ActivityIndicator size="small" color={colors.white} />
                        ) : (
                          <Text style={fonts['Default-14-white']}>Hapus</Text>
                        )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.smallButton, { backgroundColor: colors.candyPink }]}
                      onPress={() => setDeleteModal(false)}
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
        <Header />
        <ScrollView style={{ flex: 1, backgroundColor: colors.bodyWhite }} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20 }}>
                <TouchableOpacity onPress={() => Actions.profileScreen()}>
                  <Image width="30" height="22" source={LeftArrow} />
                </TouchableOpacity>
                <Text style={[fonts['Default-14-black'], { flex: 1, textAlign: 'center' }]}>
                  Pilih rekening yang ingin dihapus. Anda bisa memilih lebih dari satu rekening
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.mainBox}>
                <View style={styles.headerBox}>
                  <Text style={fonts['Default-18']}>Rekening</Text>
                </View>
                {
                  isInitData ? (
                    <ActivityIndicator size="large" color={colors.yellowGreen} />
                  ) : activeList.map((data) => {
                    return (
                      <RekeningItem
                        rekeningNumber={data.no_rekening}
                        isChecked={selectedRekeningId === data.id}
                        onPress={() => setRekeningId(data.id)}
                        imageUrl={data.bank_image}
                      />
                    );
                  })
                }
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.candyPink }]}
                onPress={() => setDeleteModal(true)}
                disabled={isInitData || isLoading || !selectedRekeningId}
              >
                {
                  isLoading ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Text style={fonts['Default-14-white-bold']}>Hapus</Text>
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DeleteRekeningScreen;
