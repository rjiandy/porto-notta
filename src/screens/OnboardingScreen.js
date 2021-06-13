import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FirstOnboard from '../assets/onboarding_1.png';
import SecondOnboard from '../assets/onboarding_2.png';
import ThirdOnboard from '../assets/onboarding_3.png';
import colors from '../themes/colors';
import fonts from '../themes/fonts';

const windowHeight = Dimensions.get('window').height;
const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellowGreen,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 18,
    marginBottom: 20,
    width: '85%'
  },
  image: {
    height: windowHeight * 0.75,
    width: '100%',
    marginBottom: 24
  },
  androidImage: {
    height: windowHeight * 0.70,
    width: '100%',
    marginBottom: 8
  }
});



function OnboardingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        activeDotColor={colors.jet}
        dotColor={colors.lightGray}
        paginationStyle={{ marginBottom: isAndroid ? windowHeight * 0.07 : 40 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
            {
              isAndroid ? (
                <Image
                  source={FirstOnboard}
                  style={styles.androidImage}
                />
              ) : (
                <Image
                  source={FirstOnboard}
                  style={styles.image}
                />
              )
            }
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
                Semua Rekeningmu Dalam Satu Aplikasi. Kamu Bisa Memonitor Semua Rekeningmu Dalam Satu Aplikasi
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.maximumYellowRed }}>
            {
              isAndroid ? (
                <Image
                  source={SecondOnboard}
                  style={styles.androidImage}
                />
              ) : (
                <Image
                  source={SecondOnboard}
                  style={styles.image}
                />
              )
            }
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
                Analisa Pengeluaran Dan Pendapatanmu Dari Semua Rekening Yang Kamu Miliki
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.carolinaBlue }}>
            {
              isAndroid ? (
                <Image
                  source={ThirdOnboard}
                  style={styles.androidImage}
                />
              ) : (
                <Image
                  source={ThirdOnboard}
                  style={styles.image}
                />
              )
            }
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
                Monitor Semua Rekeningmu Di Notta Tempat Yang Bisa Kamu Percaya
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  AsyncStorage.setItem('@onboarded', 'true').then(() => {
                    Actions.replace('loginScreen');
                  });
                }}
              >
                <Text style={fonts['Default-14-white-bold']}>Masuk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swiper>
    </View>
  );
}

export default OnboardingScreen;
