import getJSON from './getJSON';

export default async function getHomeData() {
  const result = await getJSON('/bank/account/home?page=1');
  return result;
}
