import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from './BASE_URL';

export default async function postJSON(url, body) {
  try {
    const token = await AsyncStorage.getItem('@token');
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw result;
    }
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}
