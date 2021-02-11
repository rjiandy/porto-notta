import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import firstOnboard from '../assets/first_onboard.png';

import TestSecond from '../assets/onboard_2.svg';
import TestThird from '../assets/onboard_3.svg';

// const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  topContent: {
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  imageStyle: {
    flex: 1
  }
});



function OnboardingScreen() {
  return (
    <ViewPager
      style={{ flex: 1, alignItems: 'center', padding: 0, margin: 0 }}
      initialPage={0}
    >
      <View key="1" style={styles.container} collapsable={false}>
        <View style={styles.topContent}>
          <Image source={firstOnboard} resizeMode="contain" style={styles.imageStyle} />
        </View>
      </View>
      <View key="2" style={styles.container} collapsable={false}>
        <TestSecond width={windowWidth} />
      </View>
      <View key="3" style={styles.container} collapsable={false}>
        <TestThird width={windowWidth}/>
      </View>
    </ViewPager>
    // <View key="2" style={styles.container} collapsable={false}>
    //   <TestSecond width={windowWidth} style={{ flex: 1 }} />
    // </View>
  );
}

export default OnboardingScreen;
