import getJSON from './getJSON';

export default async function getBankList() {
  const result = await getJSON('/config/bank-lists');
  return result;
}

