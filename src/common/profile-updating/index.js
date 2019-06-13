import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserProfile } from 'common/user/user.action';
import ProfileUpdating from './profile-updating.component';
import { USER_STORE, PROFILE } from 'constants/store';

const getUserProfile = state => state[USER_STORE][PROFILE];
const profileUpdatingSelector = createSelector(
  getUserProfile,
  (user) => ({ user })
);

export default connect(profileUpdatingSelector, { setUserProfile })(ProfileUpdating);