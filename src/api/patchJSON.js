import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from './BASE_URL';

export default async function patchJSON(url, body, params) {
  try {
    const token = await AsyncStorage.getItem('@token');
    let paramsString = '';
    if (params) {
      Object.keys(params).forEach((key) => {
        paramsString += `${key}=${params[key]}&`;
      });
    }
    const response = await fetch(`${BASE_URL}${url}${paramsString}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(body)
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
