import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import colors from '../themes/colors';
import TabIcon from '../navigations/TabIcon';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  tabBar: {
    height: isAndroid ? 68 : 88,
    paddingTop: isAndroid ? 0 : 11,
    paddingBottom: isAndroid ? 0 : 30,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white
  }
});

const getTabDataByKey = (key) => {
  switch (key) {
    case 'homeScreen': {
      return {
        label: 'Utama',
        color: colors.eerieBlack
      };
    }
    case 'analyticScreen': {
      return {
        label: 'Analisa',
        color: colors.eerieBlack
      };
    }
    case 'profileScreen': {
      return {
        label: 'Akun',
        color: colors.eerieBlack
      };
    }
  }
};

function Navbar(props) {
  const keys = ['homeScreen', 'analyticScreen', 'profileScreen'];
  const [activeKey, setActiveKey] = useState('homeScreen');

  return (
    <View style={styles.tabBar}>
      {
        keys.map(key => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                Actions[key]();
                setActiveKey(key);
              }}
            >
              <TabIcon name={getTabDataByKey(key).label} active={key === activeKey} />
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}
export default Navbar;
