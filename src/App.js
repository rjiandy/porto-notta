import React from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';

import store from './stores';
import MainNavigation from './navigations/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
