import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { USER_STORE, PROFILE, CAR } from 'constants/store';

import ServiceOpening from './service-opening.component';

const getProfile = state => state[USER_STORE][PROFILE];
const getCar = state => state[USER_STORE][CAR];

const serviceOpeningSelector = createSelector(
  getProfile,
  getCar,
  (profile, car) => ({ profile, car })
);

export default connect(serviceOpeningSelector, {})(ServiceOpening);
