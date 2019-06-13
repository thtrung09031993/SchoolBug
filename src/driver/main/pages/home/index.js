import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { USER_STORE, PROFILE } from 'constants/store';

import Home from './home.component';

import { showNotification } from 'common/notification-popup/notification-popup.action';
import { resetUserStore } from 'common/user/user.action';

const getUserProfile = state => state[USER_STORE][PROFILE];

const homeSelector = createSelector(
  getUserProfile,
  (user) => ({ user })
);

export default connect(homeSelector, { showNotification, resetUserStore })(Home);
