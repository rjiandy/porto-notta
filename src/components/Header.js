import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native';

import colors from '../themes/colors';

import NottaLogo from '../assets/notta_black.png';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isAndroid ? 15 : 40,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.cultured
  }
});

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Image source={NottaLogo} style={{ height: 42, width: 80 }} />
    </View>
  );
}
