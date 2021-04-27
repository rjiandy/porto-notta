import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import colors from '../themes/colors';

const styles = StyleSheet.create({
  diagram: {
    alignItems: 'center',
    height: 450,
    backgroundColor: colors.grayScale,
    borderBottomWidth: 1,
    borderColor: colors.cultured
  },
  line: {
    borderWidth: 0.5,
    borderColor: colors.silverChalice,
    width: '100%',
    height: 40
  },
  GroupbarTop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  barTop: {
    marginHorizontal: 12,
    width: 40,
    borderWidth: 1,
    backgroundColor: colors.carolinaBlue,
    borderColor: colors.carolinaBlue
  },
  GroupbarBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 10
  },
  barBottom: {
    marginHorizontal: 12,
    width: 40,
    borderWidth: 1,
    backgroundColor: colors.candyPink,
    borderColor: colors.candyPink
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  itemLabel: {
    marginHorizontal: 10,
    width: 42
  }
});

function Charts(props) {
  const { data, lastDay } = props;
  return (
    <View style={styles.diagram}>
      <View style={{ width: '100%', height: 200 }}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.GroupbarTop}>
          {
            data.map((el, idx) => (<View key={idx} style={[styles.barTop, { height: `${el.credit}%` }]} /> ))
          }
        </View>
      </View>
      <View style={{ width: '100%', height: 200 }}>
        <View style={styles.GroupbarBottom}>
          {
            data.map((el, idx) => (<View key={idx} style={[styles.barBottom, { height: `${el.debit}%` }]} /> ))
          }
        </View>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={styles.label}>
        <Text style={styles.itemLabel}>1-6</Text>
        <Text style={styles.itemLabel}>7-12</Text>
        <Text style={styles.itemLabel}>13-18</Text>
        <Text style={styles.itemLabel}>9-24</Text>
        <Text style={styles.itemLabel}>24-{lastDay}</Text>
      </View>
    </View>
  );
}

export default Charts;
