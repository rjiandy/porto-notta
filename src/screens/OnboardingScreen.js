import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import FirstOnboard from '../assets/onboarding_1.png';
import SecondOnboard from '../assets/onboarding_2.png';
import ThirdOnboard from '../assets/onboarding_3.png';
import colors from '../themes/colors';
import fonts from '../themes/fonts';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellowGreen,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 18,
    marginTop: 20
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
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.bodyWhite }}>
            <View style={styles.imageContainer}>
              <Image
                source={FirstOnboard}
                resizeMode="contain"
                style={{ width: '100%' }}
              />
            </View>
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
                Semua Rekeningmu Dalam Satu Aplikasi. Kamu Bisa Memonitor Semua Rekeningmu Dalam Satu Aplikasi
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.maximumYellowRed }}>
            <View style={styles.imageContainer}>
              <Image
                source={SecondOnboard}
                resizeMode="contain"
                style={{ width: '100%' }}
              />
            </View>
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
              Analisa Pengeluaran Dan Pendapatanmu Dari Semua Rekening Yang Kamu Miliki
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.carolinaBlue }}>
            <View style={styles.imageContainer}>
              <Image
                source={ThirdOnboard}
                resizeMode="contain"
                style={{ width: '100%' }}
              />
            </View>
            <View style={{ marginHorizontal: 60 }} >
              <Text style={{ textAlign: 'center', lineHeight: 24 }}>
                Monitor Semua Rekeningmu Di Notta Tempat Yang Bisa Kamu Percaya
              </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // CROSSCHECK IF EVER ONBOARD
                  Actions.mainTabs();
                }}
              >
                <Text style={fonts['Default-14-white-bold']}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swiper>
    </View>
  );
}

export default OnboardingScreen;
