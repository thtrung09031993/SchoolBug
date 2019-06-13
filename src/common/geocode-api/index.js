import { GEOCODE_API_BASE_URL, MAP_API_KEY } from 'constants/api';
import { ARRAY_FIRST } from 'constants/common-data';

const geocode = async (address) => {
  let url = `${GEOCODE_API_BASE_URL}address=${address}&key=${MAP_API_KEY}`;
  const response = await fetch(url);
  const result = await response.json();

  return result.results[ARRAY_FIRST];
};

export default geocode;