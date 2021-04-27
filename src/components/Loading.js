import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';

import LoadingIcon from '../assets/loading.svg';

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
    marginTop: 34,
    alignItems: 'center',
    width: '50%'
  },
  textStyle: {
    textAlign: 'center',
    ...fonts['Default-12'],
    lineHeight: 18
  },
  loadContainer: {
    marginTop: 20
  }
});

function Loading(props) {
  const { label } = props;
  return (
    <View style={styles.container}>
      <LoadingIcon width={windowWidth * 0.8} />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          {label}
        </Text>
      </View>
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color={colors.jet} />
      </View>
    </View>
  );
}

Loading.propTypes = {
  label: PropTypes.string
};

export default Loading;
