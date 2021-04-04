import React, { useState } from 'react';
import {
  Router,
  Stack,
  Scene,
  Tabs,
  Actions
} from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  TouchableOpacity
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
import AddBankAccount from '../screens/AddBankAccount';
import AddRekening from '../screens/AddRekening';
import DeleteRekeningScreen from '../screens/DeleteRekening';

import TabIcon from './TabIcon';

const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    paddingTop: 11,
    paddingBottom: 30,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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

function CustomTabBar(props) {
  const { state } = props.navigation;
  const [activeKey, setActiveKey] = useState('homeScreen');


  const filteredRoutes = state.routes.filter(
    (element) => (element.key === 'homeScreen' || element.key === 'analyticScreen' || element.key === 'profileScreen')
  );
  return (
    <View style={styles.tabBar}>
      {
        filteredRoutes.map(element => {
          return (
            <TouchableOpacity
              key={element.key}
              onPress={() => {
                Actions.pop();
                Actions[element.key]();
                setActiveKey(element.key);
              }}
            >
              <TabIcon name={getTabDataByKey(element.key).label} active={element.key === activeKey} />
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}

function NottaNavigation() {
  return (
    <Router>
      <Stack key="root" headerMode="none">
        <Scene key="splashScreen" component={SplashScreen} title="Splash" initial />
        <Scene key="onboardingScreen" component={OnboardingScreen} title="Onboarding" />
        <Scene key="loginScreen" component={LoginScreen} title="Login"/>
        <Scene key="registerScreen" component={RegisterScreen} title="Register" />
        <Scene key="registerBankScreen" component={RegisterBankAccountScreen} title="Register Bank Account" />
        <Scene key="registerRekening" component={RegisterRekeningScreen} title="Register Rekening" />

        <Scene key="addBankScreen" component={AddBankAccount} title="Add Bank Account" />
        <Scene key="addRekeningScreen" component={AddRekening} title="Add Rekening" />
        <Scene key="deleteRekeningScreen" component={DeleteRekeningScreen} title="Delete Rekening" />
        <Scene key="settingScreen" component={SettingScreen} title="Setting Screen" />
        <Tabs
          key="mainTabs"
          tabBarPosition="bottom"
          activeTintColor={colors.eerieBlack}
          inactiveTintColor={colors.grayWeb}
          tabBarStyle={styles.tabBar}
          lazy
          showLabel={false}
          type="replace"
          tabBarComponent={CustomTabBar}
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
          {/* <Scene key="addBankScreen" component={AddBankAccount} title="Add Bank Account" />
          <Scene key="addRekeningScreen" component={AddRekening} title="Add Rekening" />
          <Scene key="deleteRekeningScreen" component={DeleteRekeningScreen} title="Delete Rekening" />
          <Scene key="settingScreen" component={SettingScreen} title="Setting Screen" /> */}
        </Tabs>
      </Stack>
    </Router>
  );
}

export default NottaNavigation;
