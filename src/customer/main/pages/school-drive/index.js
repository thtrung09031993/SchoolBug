import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { USER_STORE, PROFILE } from 'constants/store';

import SchoolDrive from './school-drive.component';

const getProfile = state => state[USER_STORE][PROFILE];

const schoolDriveSelector = createSelector(
  getProfile,
  profile => ({ profile })
);

export default connect(schoolDriveSelector, { })(SchoolDrive);
