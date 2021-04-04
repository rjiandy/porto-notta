import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

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
    flex: 1,
    backgroundColor: colors.bodyWhite
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
    marginHorizontal: 10
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
    backgroundColor: colors.jet,
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
    imageUrl
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
          <Image style={styles.rekeningLogo} source={{ uri: imageUrl }} />
        )
      }
      <Text style={styles.rekeningButtonNumber}>
        {label !== 'Semua' ? label.slice(label.length - 4, label.length) : label}
      </Text>
    </TouchableOpacity>
  );
}

function TransactionGroup(props) {
  const { dataDate, sumAmount, transactionList, selectedRekening } = props;
  const isNegative = sumAmount < 0;

  return (
    <View style={styles.dateGroupContainer}>
      <View style={styles.dateGroupTitle}>
        <Text style={styles.dateTitle}>{moment(dataDate).format('DD MMMM YYYY')}</Text>
        <Text style={[styles.groupAmount, isNegative && { color: colors.candyPink }]}>
          {`${isNegative ? '-' : '+'} ${formatThousand(Math.abs(sumAmount))}`}
        </Text>
      </View>
      <View style={styles.listTransaction}>
        {
          transactionList.map((dataTrx, index) => {
            return (
              <TransactionItem
                key={index}
                amount={dataTrx.amount}
                isCredit={dataTrx.type === 'CR'}
                noRek={selectedRekening === 'Semua' ? dataTrx.no_rekening : selectedRekening}
                desc={dataTrx.description}
                imageUrl={dataTrx.bank_image}
              />
            );
          })
        }
      </View>
    </View>
  );
}

function TransactionItem(props) {
  const { isCredit, amount, desc, noRek, imageUrl } = props;
  return (
    <View style={styles.transactionItem}>
      <Image style={styles.rekeningLogo} source={{ uri: imageUrl }} />
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

function HomeScreen(props) {
  const { triggerData } = props;

  const [isBlank, setBlank] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [selectedRekening, setSelectedRekening] = useState('Semua');
  const [activeSaldo, setActiveSaldo] = useState('-');
  const [username, setUsername] = useState('-');
  const [listRekening, setListRekening] = useState([]);
  const [activeTrxGroup, setActiveTrxGroup] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchHome = async () => {
    setLoading(true);
    try {
      const result = await getHomeData();
      const { data } = result;
      const { listRekening: listRekeningRes, mutasi_all, saldo } = data;
      const groupedRekening = [];

      if (listRekeningRes.length <= 0) {
        setBlank(true);
      } else {
        setBlank(false);
        listRekeningRes.forEach((dataTrx) => {
          const { mutasi } = dataTrx;

          let newMutasi = {};
          Object.keys(mutasi).forEach((key) => {
            newMutasi[key] = mutasi[key].map((temp) => ({
              ...temp,
              bank_image: dataTrx.bank_image
            }));
          });

          groupedRekening.push({
            no_rekening: dataTrx.no_rekening,
            bank_code: dataTrx.bank_code,
            saldo: dataTrx.saldo,
            transactions: newMutasi,
            imageUrl: dataTrx.bank_image
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
      }
    } catch (error) {
      alert('Error Getting Home Data', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('@name').then((name) => {
      setUsername(name.toUpperCase());
    });

    fetchHome();

  }, [triggerData]);

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
            Actions.addBankScreen();
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
        <Header />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchHome().then(() => setRefreshing(false));
              }}
            />
          }
        >
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
                        imageUrl={data.imageUrl}
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
                Object.keys(activeTrxGroup).map((key, index) => {
                  const dataTrx = activeTrxGroup[key];
                  return (
                    <TransactionGroup
                      key={index}
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

function mapStateToProps(state) {
  const { triggerStore } = state;
  return {
    triggerData: triggerStore.triggerNewData
  };
}

export default connect(mapStateToProps)(HomeScreen);
