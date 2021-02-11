import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import BlankIcon from '../assets/blank_icon.svg';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.jet,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '70%'
  },
  textStyle: {
    textAlign: 'center',
    ...fonts['Default-12-white'],
    lineHeight: 18
  },
  buttonContainer: {
    marginTop: 30
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellowGreen,
    borderRadius: 18
  }
});

function Blank(props) {
  const { label, buttonLabel, onPress } = props;
  return (
    <View style={styles.container}>
      <BlankIcon width="180" height="180" />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          {label}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.textStyle}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Blank.propTypes = {
  label: PropTypes.string,
  buttonLabel: PropTypes.stringg,
  onPress: PropTypes.func
};

export default Blank;
