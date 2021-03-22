import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import colors from '../themes/colors';
import fonts from '../themes/fonts';
import formatThousand from '../utils/thousandSeparator';

import {
  Body,
  Header
} from '../components';
import GreyCard from '../assets/card_grey.png';

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
    backgroundColor: colors.dimGray,
  },
  rekeningLogo: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 15
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

function RekeningButton(props) {
  const {
    isActive,
    onPress,
    label
    // bankImage
  } = props;
  return (
    <TouchableOpacity
      style={[styles.rekeningWrapper, isActive && styles.activeRekening]}
      onPress={onPress}
    >
      <View style={styles.rekeningLogo} />
      <Text style={styles.rekeningButtonNumber}>{label}</Text>
    </TouchableOpacity>
  );
}

function TransactionGroup(props) {
  const { sumAmount } = props;
  const isNegative = sumAmount < 0;
  return (
    <View style={styles.dateGroupContainer}>
      <View style={styles.dateGroupTitle}>
        <Text style={styles.dateTitle}>24 Desember 2020</Text>
        <Text style={[styles.groupAmount, isNegative && { color: colors.candyPink }]}>
          {`${isNegative ? '-' : '+'} ${formatThousand(Math.abs(sumAmount))}`}
        </Text>
      </View>
      <View style={styles.listTransaction}>
        <TransactionItem
          amount={100000}
        />
        <TransactionItem
          amount={200000}
          isDebit
        />
      </View>
    </View>
  );
}

function TransactionItem(props) {
  const { isDebit, amount } = props;
  return (
    <View style={styles.transactionItem}>
      <View style={styles.rekeningLogo} />
      <View style={styles.transactionDetail}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ flex: 1, ...fonts['Default-12-bold'] }}>2948294</Text>
          <Text style={[styles.transactionAmountText, isDebit && { color: colors.yellowGreen }]}>
            {`${isDebit ? '+' : '-' } ${formatThousand(amount)}`}
          </Text>
        </View>
        <View style={{ width: '70%' }}>
          <Text style={fonts['Default-11']}>TRSF E-BANKING BELINDA CHAMORA</Text>
        </View>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.overview}>
            <Image source={GreyCard} style={styles.mainCard} />
            <View style={styles.cardContainer}>
              <Text style={styles.mainSaldo}>Rp. 2.365.786.490</Text>
              <Text style={styles.name}>JOHAN GANDA WIJAYA</Text>
              <Text style={styles.noRek}>Semua Rekening</Text>
            </View>
          </View>
          <ScrollView
            style={styles.rekeningListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.scrollWrapper}>
              {/* LATER REPEAT ALL THE BANKS BELOW */}
              <RekeningButton label={1323} />
              <RekeningButton label="Semua" isActive />

            </View>
          </ScrollView>
          <View style={styles.transactionListContainer}>
            <TransactionGroup
              sumAmount={-100000}
            />

          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
