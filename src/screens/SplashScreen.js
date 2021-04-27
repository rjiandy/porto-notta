import React, { useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../themes/colors';

import NottaSplash from '../assets/notta_logo_white.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.jet,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function SplashScreen() {
  useEffect(() => {
    setTimeout(async () => {
      const onboarded = await AsyncStorage.getItem('@onboarded');
      const token = await AsyncStorage.getItem('@token');
      if (onboarded && onboarded.length > 0) {
        if (token && token.length > 0) {
          Actions.replace('homeScreen');
        } else {
          Actions.replace('loginScreen');
        }
      } else {
        Actions.replace('onboardingScreen');
      }
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <NottaSplash width="400" height="200" />
    </View>
  );
}

export default SplashScreen;
