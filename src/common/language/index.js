import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import store from 'common/store';

import Language from './language.component';

import { LANGUAGE_STORE, TEXT } from 'constants/store';

const getLanguageText = state => state[LANGUAGE_STORE][TEXT];

const languageSelector = createSelector(
  getLanguageText,
  text => ({ text })
);

export const formatLanguage = key => getLanguageText(store.store.getState())[key] || key;

export default connect(languageSelector, { })(Language);
