import React from 'react';
import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';

import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';

import DevScene from '../screens/DevScene'; //TODO: Remove this dev scene

function NottaNavigation() {
  return (
    <Router>
      <Stack key="root" headerMode="none">
        <Scene key="splashScree" component={SplashScreen} title="Splash" />
        <Scene key="onboardingScreen" component={OnboardingScreen} title="Onboarding" />
        <Scene key="loginScreen" component={LoginScreen} title="Login" />

        <Scene key="dev" component={DevScene} title="Dev" initial />
      </Stack>
    </Router>
  );
}

export default NottaNavigation;
