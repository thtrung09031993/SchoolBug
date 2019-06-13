import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { USER_STORE, PROFILE } from 'constants/store';

import RouteMap from './route-map.component';

const getProfile = state => state[USER_STORE][PROFILE];

const routeMapSelector = createSelector(
  getProfile,
  profile => ({ profile })
);

export default connect(routeMapSelector, { })(RouteMap);
