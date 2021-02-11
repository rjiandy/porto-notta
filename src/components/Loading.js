import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { BubblesLoader } from 'react-native-indicator';

import LoadingIcon from '../assets/loading.svg';

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
    marginTop: 34,
    alignItems: 'center',
    width: '50%'
  },
  textStyle: {
    textAlign: 'center',
    ...fonts['Default-12-white'],
    lineHeight: 18
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Loading(props) {
  const { label } = props;
  return (
    <View style={styles.container}>
      <LoadingIcon width="180" height="180" />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          {label}
        </Text>
      </View>
      <View style={styles.loadingContainer}>
        <BubblesLoader size={60} color={colors.white} />
      </View>
    </View>
  );
}

Loading.propTypes = {
  label: PropTypes.string
};

export default Loading;
