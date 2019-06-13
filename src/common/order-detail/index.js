import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { USER_STORE, PROFILE, CAR, LANGUAGE_STORE, LANGUAGE } from 'constants/store';

import OrderDetail from './order-detail.component';

const getProfile = state => state[USER_STORE][PROFILE];
const getCar = state => state[USER_STORE][CAR];
const getLanguage = state => state[LANGUAGE_STORE][LANGUAGE];

const orderDetailSelector = createSelector(
  getProfile,
  getCar,
  getLanguage,
  (profile, car, language) => ({ profile, car, language })
);

export default connect(orderDetailSelector, {})(OrderDetail);
