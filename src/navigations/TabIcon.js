// activeTintColor={colors.eerieBlack}
//           inactiveTintColor={colors.grayWeb}

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import HomeActive from '../assets/home_active.svg';
import HomeInactive from '../assets/home_inactive.svg';
import AnalyticInactive from '../assets/analytic_inactive.svg';
import AnalyticActive from '../assets/analytic_active.svg';
import AccountActive from '../assets/account_active.svg';
import AccountInactive from '../assets/account_inactive.svg';

import fonts from '../themes/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    ...fonts['Default-10'],
    marginTop: 10
  }
});

function getImage({ name, active }) {
  if (name === 'Utama') {
    if (active) {
      return HomeActive;
    } else {
      return HomeInactive;
    }
  } else if (name === 'Analisa') {
    if (active) {
      return AnalyticActive;
    } else {
      return AnalyticInactive;
    }
  } else if (name === 'Akun') {
    if (active) {
      return AccountActive;
    } else {
      return AccountInactive;
    }
  }
}

function TabIcon(props) {
  const { tintColor, name, active } = props;
  let Image = getImage({ name, active });
  return (
    <View style={styles.container}>
      <Image width={26} height={26} />
      <View>
        <Text style={[styles.label, { color: tintColor }]}>
          {name}
        </Text>
      </View>
    </View>
  );
}

export default TabIcon;
