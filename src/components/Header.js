import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import colors from '../themes/colors';

import NottaLogo from '../assets/notta_black.png';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    height: 42,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.cultured
  }
});

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Image source={NottaLogo} />
    </View>
  );
}
