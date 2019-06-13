import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { USER_STORE, CAR, PROFILE } from 'constants/store';
import { setCar } from 'common/user/user.action';

import CarUpdating from './car-updating.component';

const getProfile = state => state[USER_STORE][PROFILE];
const getCar = state => state[USER_STORE][CAR];

const carUpdatingSelector = createSelector(
  getProfile,
  getCar,
  (profile, car) => ({ profile, car })
);

export default connect(carUpdatingSelector, { setCar })(CarUpdating);
