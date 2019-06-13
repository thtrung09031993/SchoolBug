import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { setUserProfile, resetUserStore } from 'common/user/user.action';

import Activating from './activating.component';

const activatingSelector = createSelector(
  () => ({ })
);

export default connect(activatingSelector, { setUserProfile, resetUserStore })(Activating);
