import React from 'react';
import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';

import LoginScreen from '../screens/LoginScreen';

function NottaNavigation() {
  return (
    <Router>
      <Stack key="root" headerMode="none">
        <Scene key="loginScreen" component={LoginScreen} title="Login" initial/>
      </Stack>
    </Router>
  );
}

export default NottaNavigation;
