import { START_LOADING, FINISH_LOADING } from 'constants/action';
import { LOADING } from 'constants/store';

const initialState = {
  [LOADING]: false
};

const startLoading = state => ({
  ...state,
  [LOADING]: true
});

const finishLoading = state => ({
  ...state,
  [LOADING]: false
});

/**
 * Handle action to update loading state
 * @param {Object} state    Current state
 * @param {Action} action   Dispatched action
 * @return {Object}         New state after processing
 */
export const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING:
      return startLoading(state, payload);
    case FINISH_LOADING:
      return finishLoading(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
