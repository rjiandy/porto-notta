import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from './BASE_URL';

export default async function getJSON(url) {
  try {
    const token = await AsyncStorage.getItem('@token');
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
      // ADD PARAMS
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw result;
    }
  } catch (err) {
    throw err;
  }
}
