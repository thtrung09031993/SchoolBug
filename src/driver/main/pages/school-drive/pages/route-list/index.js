import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import RouteList from './route-list.component';

const routeListSelector = createSelector(
  () => ({ })
);

export default connect(routeListSelector, { })(RouteList);
