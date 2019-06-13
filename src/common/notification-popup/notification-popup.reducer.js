import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from 'constants/action';
import { IS_SHOWED, CALL_BACK, TITLE, BODY } from 'constants/store';

const initialState = {
  [IS_SHOWED]: false,
  [TITLE]: '',
  [BODY]: '',
  [CALL_BACK]: () => {}
};

/**
 * Handle showing notification action
 * @param {Object} state        Current state
 * @param {Object} payload      Action payload containing data
 * @return {Object}             New state after updated
 */
const showNotification = (state, payload) => ({
  ...state,
  [IS_SHOWED]: true,
  [TITLE]: payload.title,
  [BODY]: payload.body,
  [CALL_BACK]: payload.callback
});

/**
 * Handle hiding notification action
 * @param {Object} state        Current state
 * @return {Object}             New state after updated
 */
const hideNotification = state => ({
  ...state,
  [IS_SHOWED]: false,
  [CALL_BACK]: () => {}
});

/**
 * Reducer to handle notification store
 * @param {Object} state      Current state
 * @param {Action} action     Action { type, payload } to update store
 * @return {Object}           New state after updated
 */
export const notificationPopupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_NOTIFICATION:
      return showNotification(state, payload);
    case HIDE_NOTIFICATION:
      return hideNotification(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
