import React from 'react';
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
  TouchableOpacity,
  Platform
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
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';

import TabIcon from './TabIcon';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  tabBar: {
    height: isAndroid ? 68 : 88,
    paddingTop: isAndroid ? 0 : 11,
    paddingBottom: isAndroid ? 0 : 30,
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

  const filteredRoutes = state.routes.filter(
    (element) => (element.key === 'homeScreen' || element.key === 'analyticScreen' || element.key === 'profileScreen')
  );

  const checkIndexByKey = (elementKey) => {
    switch (elementKey) {
      case 'homeScreen': {
        return 0;
      }
      case 'analyticScreen': {
        return 1;
      }
      case 'profileScreen': {
        return 2;
      }
      default: {
        return -1;
      }
    }
  };

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
              }}
            >
              <TabIcon
                name={getTabDataByKey(element.key).label}
                active={checkIndexByKey(element.key) === state.index}
              />
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
        <Scene key="forgetPasswordScreen" component={ForgetPasswordScreen} title="Forget Password" />
        <Tabs
          gesturesEnabled={false}
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
        </Tabs>
      </Stack>
    </Router>
  );
}

export default NottaNavigation;
