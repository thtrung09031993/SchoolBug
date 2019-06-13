import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { startLoading } from 'common/loading/loading.action';

import SchoolDrive from './school-drive.component';

const schoolDriveSelector = createSelector(
  () => ({ })
);

export default connect(schoolDriveSelector, { startLoading })(SchoolDrive);
