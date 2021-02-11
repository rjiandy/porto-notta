import React from 'react';
import {
  View,
  Text
} from 'react-native';

function LoginScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome To React Native</Text>
      </View>
    </View>
  );
}

export default LoginScreen;
