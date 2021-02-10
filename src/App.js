import React from 'react';
import { SafeAreaView } from 'react-native';

import { Provider } from 'react-redux';

import store from './stores';
import MainNavigation from './navigations/Navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
