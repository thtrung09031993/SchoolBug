import { SET_USER_PROFILE, SET_CAR, RESET_USER_STORE } from 'constants/action';
import { PROFILE, CAR } from 'constants/store';

const initialState = {
  [PROFILE]: {},
  [CAR]: {}
};

/**
 * Handle setting user profile
 * @param {Object} state        Current state
 * @param {Object} payload      Action payload containing data
 * @return {Object}             New state after updated
 */
const setUserProfile = (state, payload) => ({
  ...state,
  [PROFILE]: payload.profile
});

/**
 * Handle setting user profile
 * @param {Object} state        Current state
 * @param {Object} payload      Action payload containing data
 * @return {Object}             New state after updated
 */
const setCar = (state, payload) => ({
  ...state,
  [CAR]: payload.car
});

/**
 * Handle setting user profile
 * @param {Object} state        Current state
 * @param {Object} payload      Action payload containing data
 * @return {Object}             New state after updated
 */
const resetUserStore = (state, payload) => ({
  ...state,
  [CAR]: payload.car,
  [PROFILE]: payload.profile
});


/**
 * Reducer to handle user store
 * @param {Object} state      Current state
 * @param {Action} action     Action { type, payload } to update store
 * @return {Object}           New state after updated
 */
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_PROFILE:
      return setUserProfile(state, payload);
    case SET_CAR:
      return setCar(state, payload);
    case RESET_USER_STORE:
      return resetUserStore(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
