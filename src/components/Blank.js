import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import BlankIcon from '../assets/blank.svg';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bodyWhite,
    justifyContent: 'center'
  },
  textContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center'
  },
  textStyle: {
    textAlign: 'center',
    ...fonts['Default-12'],
    lineHeight: 18
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 34
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellowGreen,
    borderRadius: 18,
    width: '100%'
  }
});

function Blank(props) {
  const { label, buttonLabel, onPress } = props;
  return (
    <View style={styles.container}>
      <BlankIcon width={deviceWidth * 0.8} style={{ alignSelf: 'center' }}/>
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
          <Text style={[styles.textStyle, fonts['Default-14-white-bold']]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Blank.propTypes = {
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  onPress: PropTypes.func
};

export default Blank;
