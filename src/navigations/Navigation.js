import React from 'react';
import {
  Router,
  Stack,
  Scene,
  Tabs
} from 'react-native-router-flux';
import {
  StyleSheet
} from 'react-native';


import colors from '../themes/colors';

import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AnalyticScreen from '../screens/AnalyticScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterBankAccountScreen from '../screens/RegisterBankAccount';
import RegisterRekeningScreen from '../screens/RegisterRekening';
import SettingScreen from '../screens/SettingScreen';

import DevScene from '../screens/DevScene'; //TODO: Remove this dev scene

import TabIcon from './TabIcon';

const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    paddingTop: 11,
    borderTopWidth: 0,
    elevation: 8,
    backgroundColor: colors.white
  }
});

function NottaNavigation() {
  return (
    <Router>
      <Stack key="root" headerMode="none">
        <Scene key="splashScreen" component={SplashScreen} title="Splash" intial/>
        <Scene key="onboardingScreen" component={OnboardingScreen} title="Onboarding" />
        <Scene key="loginScreen" component={LoginScreen} title="Login"/>
        <Scene key="registerScreen" component={RegisterScreen} title="Register" />
        <Scene key="registerBankScreen" component={RegisterBankAccountScreen} title="Register Bank Account" />
        <Scene key="registerRekening" component={RegisterRekeningScreen} title="Register Rekening" />
        <Scene key="settingScreen" component={SettingScreen} title="Setting Screen" />
        <Scene key="dev" component={DevScene} title="Dev" />
        <Tabs
          key="mainTabs"
          tabBarPosition="bottom"
          activeTintColor={colors.eerieBlack}
          inactiveTintColor={colors.grayWeb}
          tabBarStyle={styles.tabBar}
          type="replace"
          lazy
          showLabel={false}
        >
          <Scene
            key="homeScreen"
            component={HomeScreen}
            title="HomeScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Utama" tintColor={tintColor} />
            )}
          />
          <Scene
            key="analyticScreen"
            component={AnalyticScreen}
            title="AnalyticScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Analisa" tintColor={tintColor} />
            )}
          />
          <Scene
            key="profileScreen"
            component={ProfileScreen}
            title="ProfileScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Akun" tintColor={tintColor} />
            )}
          />
        </Tabs>
      </Stack>
    </Router>
  );
}

export default NottaNavigation;
