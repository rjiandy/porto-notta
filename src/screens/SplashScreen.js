import React, { useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    setTimeout(() => {
      Actions.reset('loginScreen');
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <NottaSplash width="400" height="200" />
    </View>
  );
}

export default SplashScreen;
