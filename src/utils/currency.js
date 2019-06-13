import { CURRENCY, ARRAY_FIRST, ZERO } from 'constants/common-data';

const SPLITTING_RANGE = 3;

export const formatCurrency = currency => {
  if (currency === ZERO) return `${currency} ${CURRENCY}`;
  if (!currency) return '';

  let currencyStr = `${currency}`;

  let result = ` ${CURRENCY}`;

  while (currencyStr.length > SPLITTING_RANGE) {
    result = `.${currencyStr.substring(currencyStr.length - SPLITTING_RANGE)}${result}`;
    currencyStr = currencyStr.substring(ARRAY_FIRST, currencyStr.length - SPLITTING_RANGE);
  }

  result = `${currencyStr}${result}`;

  return result;
};
