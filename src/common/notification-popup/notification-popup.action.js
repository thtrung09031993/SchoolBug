import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "constants/action";

/**
 * Show the notification
 * @param {string} title        The notification title
 * @param {string} body         The notification body
 * @param {function} callback   Function when click on notification
 * @return {Action}           Action to dispatch store
 */
export const showNotification = (title, body, callback) => ({
  type: SHOW_NOTIFICATION,
  payload: { title, body, callback }
});

/**
 * Hide the notification
 * @return {Action}           Action to dispatch store
 */
export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
