import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { setUserProfile, setCar } from 'common/user/user.action';

import Authorization from './authorization.component';

const authorizationSelector = createSelector(
  () => ({ })
);

export default connect(authorizationSelector, { setUserProfile, setCar })(Authorization);
