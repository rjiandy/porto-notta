import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import SuccessIcon from '../assets/success.svg';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bodyWhite,
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
    ...fonts['Default-12'],
    lineHeight: 18
  }
});

function Success(props) {
  const { label } = props;
  return (
    <View style={styles.container}>
      <SuccessIcon width={windowWidth * 0.8} />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          {label}
        </Text>
      </View>
    </View>
  );
}

Success.propTypes = {
  label: PropTypes.string
};

export default Success;
