import Settings from './settings.component';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { chooseLanguage } from 'common/language/language.action';
import { LANGUAGE_STORE, LANGUAGE } from 'constants/store';

const getLanguage = state => state[LANGUAGE_STORE][LANGUAGE];

const settingsSelector = createSelector(
  getLanguage,
  language => ({ language })
);

export default connect(settingsSelector, { chooseLanguage })(Settings);