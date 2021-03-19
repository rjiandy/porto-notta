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
  }
});

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
              <TouchableOpacity style={styles.rekeningWrapper}>
                <View style={styles.rekeningLogo} />
                <Text style={styles.rekeningButtonNumber}>1231</Text>
              </TouchableOpacity><TouchableOpacity style={styles.rekeningWrapper}>
                <View style={styles.rekeningLogo} />
                <Text style={styles.rekeningButtonNumber}>1231</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.rekeningWrapper, styles.activeRekening ]}>
                <View style={styles.rekeningLogo} />
                <Text style={styles.rekeningButtonNumber}>Semua</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
