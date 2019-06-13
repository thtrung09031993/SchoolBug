import { ONE, ARRAY_FIRST, ARRAY_STEP } from "constants/common-data";
import { CHILDREN } from 'constants/api';
import { formatLanguage } from 'common/language';

export const formatDisplayName = childrenList => {
  let displayName = '';

  if (childrenList.length) {
    if (childrenList.length === ONE) {
      displayName = childrenList[ARRAY_FIRST][CHILDREN.NAME];
    } else {
      displayName =
        `${
        childrenList.slice(ARRAY_FIRST, childrenList.length - ARRAY_STEP)
          .map(child => child[CHILDREN.NAME])
          .join(', ')
        } ${
        formatLanguage('AND')
        } ${
        childrenList[childrenList.length - ARRAY_STEP][CHILDREN.NAME]
        }`;
    }
  }

  return displayName;
};