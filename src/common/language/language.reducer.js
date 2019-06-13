import { CHOOSE_LANGUAGE } from 'constants/action.js';
import { TEXT, LANGUAGE } from 'constants/store.js';
import { VIETNAMESE, ENGLISH } from 'constants/language.js';

import * as VietnameseText from './languages/vi.json';
import * as EnglishText from './languages/en.json';

const initialState = {
  [TEXT]: VietnameseText,
  [LANGUAGE]: VIETNAMESE
};

/**
 * Handle choosing language action
 * @param {Object} state        Current state
 * @param {Object} payload      Action payload containing data
 * @return {Object}             New state after updated
 */
const chooseLanguage = (state, payload) => {
  switch (payload.language) {
    case VIETNAMESE:
      return { ...state, [TEXT]: VietnameseText, [LANGUAGE]: VIETNAMESE };
    default:
      return { ...state, [TEXT]: EnglishText, [LANGUAGE]: ENGLISH };
  }
};

/**
 * Reducer to handle language store
 * @param {Object} state      Current state
 * @param {Action} action     Action { type, payload } to update store
 * @return {Object}           New state after updated
 */
export const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHOOSE_LANGUAGE:
      return chooseLanguage(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
