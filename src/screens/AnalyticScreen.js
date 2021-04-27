import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import moment from 'moment';

import {
  Charts,
  Header,
  Blank
} from '../components';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

import getJSON from '../api/getJSON';
import thousandSeparator from '../utils/thousandSeparator';

const styles = StyleSheet.create({
  monthButton: {
    marginHorizontal: 30,
    paddingTop: 20
  },
  monthText: {
    ...fonts['Default-14-lightGray']
  },
  mutationContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingHorizontal: 20
  },
  listContainer: {
    marginVertical: 20,
    paddingLeft: 14
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  rekeningLogo: {
    width: 50,
    height: 50,
    backgroundColor: colors.jet,
    borderRadius: 15,
    marginRight: 12
  },
  listDetails: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 36
  },
  sumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayScale,
    paddingVertical: 14,
    paddingHorizontal: 14
  }
});

function sumAmount(arrData, type) {
  let totalAmount = 0;
  arrData.forEach((data) => {
    if (type === 'credit') {
      totalAmount += data.credit;
    } else if (type === 'debit') {
      totalAmount += Math.abs(data.debit);
    }
  });
  return totalAmount;
}

function RekeningList(props) {
  const { rekeningNumber, debit, credit, imageUrl } = props;
  return (
    <View style={styles.listItem}>
      <Image style={styles.rekeningLogo} source={{ uri: imageUrl }} />
      <Text style={fonts['Default-14-black-bold']}>{rekeningNumber}</Text>
      <View style={styles.listDetails}>
        <Text style={[fonts['Default-12'], { color: colors.yellowGreen }]}>
          {`+ ${thousandSeparator(credit)}`}
        </Text>
        <Text style={[fonts['Default-12'], { color: colors.candyPink }]}>
          {`- ${thousandSeparator(debit)}`}
        </Text>
      </View>
    </View>
  );
}

function AnalyticScreen(props) {
  const { triggerData } = props;
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM'));
  const [monthsRange, setMonthsRange] = useState([]);

  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isBlank, setBlank] = useState(false);

  useEffect(() => {
    const tempMonths = [];
    for (let i = 0; i < 5; i++) {
      tempMonths.push(moment().subtract(i, 'month').format('YYYY-MM'));
    }
    setMonthsRange(tempMonths);
  }, []);

  useEffect(() => {
    const getAnalyticData = async () => {
      setLoading(true);
      try {
        const result = await getJSON('/bank/account/analytics', {
          date: selectedDate
        });
        const { data } = result;
        const { chart, rekening } = data;

        if (rekening.length <= 0) {
          setBlank(true);
        } else {
          const chartDataList = [];

          const arrNumbers = [];
          Object.keys(chart).forEach((key) => {
            arrNumbers.push(chart[key].debit);
            arrNumbers.push(chart[key].credit);
          });

          const highestNum = Math.max(...arrNumbers);
          Object.keys(chart).forEach((key) => {
            chartDataList.push({
              debit: (chart[key].debit / highestNum) * 100,
              credit: (chart[key].credit / highestNum) * 100
            });
          });
          setChartData(chartDataList);
          setTransactions(rekening);
        }

      } catch (err) {
        alert('Error Getting Analytics Data ', err.message);
      } finally {
        setLoading(false);
      }
    };

    getAnalyticData();
  }, [selectedDate, triggerData]);

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
        <ScrollView style={{ flex: 1 }}>
          <ScrollView horizontal style={{ minHeight: 60, backgroundColor: colors.white }}>
            {
              monthsRange.map((data, index) => {
                return (
                  <TouchableOpacity
                    style={styles.monthButton}
                    key={index}
                    onPress={() => setSelectedDate(data)}
                  >
                    <Text
                      style={[styles.monthText, data === selectedDate && fonts['Default-14-black-bold']]}
                    >
                      {moment(data).format('MMMM YYYY')}
                    </Text>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
          <Charts
            data={chartData}
            lastDay={moment(selectedDate).endOf('month').format('DD')}
          />
          <View style={styles.mutationContainer}>
            <View style={{ borderBottomWidth: 1, borderColor: colors.black, paddingBottom: 14 }}>
              <Text style={[fonts['Default-14-black-bold'], { marginLeft: 14 }]}>
                Rekening
              </Text>
            </View>
            <View style={styles.listContainer}>
              {
                isLoading ? (
                  <ActivityIndicator size="large" color={colors.yellowGreen} />
                ) : transactions.map((data, index) => {
                  return (
                    <RekeningList
                      key={index}
                      rekeningNumber={data.no_rekening}
                      bankCode={data.bank_code}
                      credit={data.credit}
                      debit={data.debit}
                      imageUrl={data.bank_image}
                    />
                  );
                })
              }
            </View>
          </View>
          <View style={styles.sumContainer}>
            <Text style={[fonts['Default-18'], { marginLeft: 14 }]}>
              Total
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={[fonts['Default-14-black-bold'], { color: colors.yellowGreen, marginBottom: 14 }]}>
                {`+ ${sumAmount(transactions, 'credit')}`}
              </Text>
              <Text style={[fonts['Default-14-black-bold'], { color: colors.candyPink }]}>
                {`- ${sumAmount(transactions, 'debit')}`}
              </Text>
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

export default connect(mapStateToProps)(AnalyticScreen);
