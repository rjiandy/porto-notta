import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';

import { Provider } from 'react-redux';

import store from './stores';
import MainNavigation from './navigations/Navigation';

// const DEV_APP_ID = '245b5b02-dfc4-48a7-9b19-752f6efb847b';
const PROD_APP_ID = 'a9543d8f-878d-400c-9a8a-d1ae1e36c14b';

function App() {
  useEffect(() => {
    OneSignal.setAppId(PROD_APP_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('res os', response);
    });
  }, []);
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
