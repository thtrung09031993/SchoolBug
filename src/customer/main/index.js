import React from 'react';
import { Root } from 'native-base';
import { Provider, connect } from 'react-redux';
import { createSelector } from 'reselect';

import store from 'common/store';
import { setUserProfile } from 'common/user/user.action';
import { chooseLanguage } from 'common/language/language.action';

import Main from './main.component';

const appStore = store.configureStore();

const mainSelector = createSelector(
  () => ({})
);

const MainWrapper = connect(mainSelector, { setUserProfile, chooseLanguage })(Main);

export default class MainApp extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={appStore}>
          <MainWrapper />
        </Provider>
      </Root>
    );
  }
}
