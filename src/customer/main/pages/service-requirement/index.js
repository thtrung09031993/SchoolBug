import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { USER_STORE, PROFILE } from 'constants/store';

import ServiceRequirement from './service-requirement.component';

const getProfile = state => state[USER_STORE][PROFILE];

const serviceRequirementSelector = createSelector(
  getProfile,
  profile => ({ profile })
);

export default connect(serviceRequirementSelector, {})(ServiceRequirement);
