import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LOADING_STORE, LOADING } from 'constants/store';

import Loading from './loading.component';

import { finishLoading } from './loading.action';

const getLoadingStatus = state => state[LOADING_STORE][LOADING];

// Selector to get loading and modal state from store
const loadingSelector = createSelector(
  getLoadingStatus,
  isLoading => ({ isLoading })
);

export default connect(loadingSelector, { finishLoading })(Loading);
