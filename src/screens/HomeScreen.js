import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../themes/colors';
import fonts from '../themes/fonts';
import formatThousand from '../utils/thousandSeparator';

import getHomeData from '../api/getHomeData';
import thousandSeparator from '../utils/thousandSeparator';

import {
  Header,
  Blank,
  Loading
} from '../components';
import GreyCard from '../assets/card_grey.png';
import CCIcon from '../assets/cc_icon.png';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignSelf: 'center'
  },
  container: {
    flex: 1
  },
  cardContainer: {
    position: 'absolute',
    width: deviceWidth - (46 * 2),
    marginHorizontal: 46,
    marginTop: 50,
    flex: 1,
    paddingLeft: 32
  },
  overview: {
    flex: 1,
    marginTop: 20
  },
  mainSaldo: {
    ...fonts['Default-28-white-bold']
  },
  name: {
    ...fonts['Default-14-white'],
    marginTop: 50
  },
  noRek: {
    ...fonts['Default-12-white'],
    marginTop: 10
  },
  scrollWrapper: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: colors.jet,
    flexDirection: 'row'
  },
  rekeningListContainer: {
    flex: 1,
    marginHorizontal: 10,
  },

  rekeningWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 10
  },
  activeRekening: {
    backgroundColor: colors.dimGray
  },
  rekeningLogo: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 15
  },
  rekeningAllButton: {
    backgroundColor: colors.skyBlueCrayola,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rekeningButtonNumber: {
    ...fonts['Default-12-white'],
    marginTop: 10
  },
  transactionListContainer: {
    flex: 1,
    marginTop: 30
  },
  dateGroupContainer: {
    marginHorizontal: 20
  },
  dateGroupTitle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.silverChalice,
    paddingRight: 10
  },
  dateTitle: {
    flex: 1,
    ...fonts['Default-14-black'],
    paddingBottom: 10
  },
  listTransaction: {
    marginTop: 20
  },
  transactionItem: {
    marginBottom: 16,
    flexDirection: 'row'
  },
  transactionDetail: {
    marginLeft: 14,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center'
  },
  transactionAmountText: {
    ...fonts['Default-12-bold'],
    color: colors.candyPink
  },
  groupAmount: {
    ...fonts['Default-12-bold'],
    color: colors.yellowGreen
  }
});

function countSumAmount(dataObj) {
  let totalAmount = 0;
  if (dataObj) {
    Object.keys(dataObj).forEach((key) => {
      const dataList = dataObj[key];
      dataList.forEach((eachData) => {
        const { type, amount } = eachData;
        if (type === 'DB') {
          totalAmount -= amount;
        } else {
          totalAmount += amount;
        }
      });
    });
  }

  return totalAmount;
}

function countSumArr(transactions) {
  let totalAmount = 0;
  if (transactions) {
    transactions.forEach((trx) => {
      if (trx.type === 'CR') {
        totalAmount += trx.amount;
      } else {
        totalAmount -= trx.amount;
      }
    });
  }

  return totalAmount;
}

function RekeningButton(props) {
  const {
    isActive,
    onPress,
    label,
    bankCode, // TODO use for images
  } = props;
  return (
    <TouchableOpacity
      style={[styles.rekeningWrapper, isActive && styles.activeRekening]}
      onPress={onPress}
    >
      {
        bankCode === 'Semua' ? (
          <View style={[styles.rekeningLogo, styles.rekeningAllButton]}>
            <Image source={CCIcon} style={{ width: 30, height: 25 }} />
          </View>
        ) : (
          <View style={styles.rekeningLogo} />
        )
      }
      <Text style={styles.rekeningButtonNumber}>{label}</Text>
    </TouchableOpacity>
  );
}

function TransactionGroup(props) {
  const { dataDate, sumAmount, transactionList, selectedRekening } = props;
  const isNegative = sumAmount < 0;
  return (
    <View style={styles.dateGroupContainer}>
      <View style={styles.dateGroupTitle}>
        <Text style={styles.dateTitle}>{dataDate}</Text>
        <Text style={[styles.groupAmount, isNegative && { color: colors.candyPink }]}>
          {`${isNegative ? '-' : '+'} ${formatThousand(Math.abs(sumAmount))}`}
        </Text>
      </View>
      <View style={styles.listTransaction}>
        {
          transactionList.map((dataTrx) => {
            return (
              <TransactionItem
                amount={dataTrx.amount}
                isCredit={dataTrx.type === 'CR'}
                noRek={selectedRekening === 'Semua' ? dataTrx.no_rekening : selectedRekening}
                desc={dataTrx.description}
              />
            );
          })
        }
      </View>
    </View>
  );
}

function TransactionItem(props) {
  const { isCredit, amount, desc, noRek } = props;
  return (
    <View style={styles.transactionItem}>
      <View style={styles.rekeningLogo} />
      <View style={styles.transactionDetail}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ flex: 1, ...fonts['Default-12-bold'] }}>{noRek}</Text>
          <Text style={[styles.transactionAmountText, isCredit && { color: colors.yellowGreen }]}>
            {`${isCredit ? '+' : '-' } ${formatThousand(amount)}`}
          </Text>
        </View>
        <View style={{ width: '70%' }}>
          <Text style={fonts['Default-11']}>{desc}</Text>
        </View>
      </View>
    </View>
  );
}

function HomeScreen() {
  const [isBlank, setBlank] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [selectedRekening, setSelectedRekening] = useState('Semua');
  const [activeSaldo, setActiveSaldo] = useState('-');
  const [username, setUsername] = useState('-');

  const [listRekening, setListRekening] = useState([]);

  const [activeTrxGroup, setActiveTrxGroup] = useState({});

  useEffect(() => {
    setLoading(true);

    AsyncStorage.getItem('@name').then((name) => {
      setUsername(name.toUpperCase());
    });

    getHomeData()
      .then((result) => {
        const { data } = result;

        const { listRekening: listRekeningRes, mutasi_all, saldo } = data;

        const groupedRekening = [];

        listRekeningRes.forEach((dataTrx) => {
          groupedRekening.push({
            no_rekening: dataTrx.no_rekening,
            bank_code: dataTrx.bank_code,
            saldo: dataTrx.saldo,
            transactions: dataTrx.mutasi
          });
        });

        groupedRekening.push({
          no_rekening: 'Semua',
          bank_code: 'Semua',
          saldo,
          transactions: mutasi_all
        });

        setActiveSaldo(`Rp ${thousandSeparator(saldo)}`);
        setListRekening(groupedRekening);
        setActiveTrxGroup(mutasi_all);

      })
      .catch((error) => {
        alert('Error Getting Home Data', error.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Loading label="Mohon Tunggu Sebentar, Kami Membutuhkan Beberapa Saat Untuk Memproses" />
      </View>
    );
  }
  if (isBlank) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Blank
          label="Kamu Tidak Memiliki Rekening yang Terhubung, Silahkan Tambahkan Rekening"
          buttonLabel="Tambah"
          onPress={() => {
            alert('Navigate to Add Rekening');
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.overview}>
              <Image source={GreyCard} style={styles.mainCard} />
              <View style={styles.cardContainer}>
                <Text style={styles.mainSaldo}>{activeSaldo}</Text>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.noRek}>
                  {selectedRekening === 'Semua' ? 'Semua Rekening' : selectedRekening}
                </Text>
              </View>
            </View>
            <ScrollView
              style={styles.rekeningListContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.scrollWrapper}>
                {
                  listRekening.map((data, index) => {
                    return (
                      <RekeningButton
                        key={index}
                        label={data.no_rekening}
                        bankCode={data.bank_code}
                        isActive={data.no_rekening === selectedRekening}
                        onPress={() => {
                          setSelectedRekening(data.no_rekening);
                          setActiveSaldo(`Rp ${thousandSeparator(data.saldo)}`);
                          setActiveTrxGroup(data.transactions);
                        }}
                      />
                    );
                  })
                }

              </View>
            </ScrollView>
            <View style={styles.transactionListContainer}>
              {
                Object.keys(activeTrxGroup).map((key) => {
                  const dataTrx = activeTrxGroup[key];
                  return (
                    <TransactionGroup
                      selectedRekening={selectedRekening}
                      sumAmount={countSumArr(dataTrx)}
                      dataDate={key}
                      transactionList={dataTrx}
                    />
                  );
                })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
