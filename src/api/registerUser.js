import BASE_URL from './BASE_URL';

export default async function postJSON(url, body) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
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
    throw err;
  }
}
