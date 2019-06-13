import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { NOTIFICATION_STORE, IS_SHOWED, CALL_BACK, TITLE, BODY } from 'constants/store';

import NotificationPopup from './notification-popup.component';
import { hideNotification } from './notification-popup.action';

const getNotificationStatus = state => state[NOTIFICATION_STORE][IS_SHOWED];
const getNotificationTitle = state => state[NOTIFICATION_STORE][TITLE];
const getNotificationBody = state => state[NOTIFICATION_STORE][BODY];
const getNotificationCallback = state => state[NOTIFICATION_STORE][CALL_BACK];

// Selector to get notification state from store
const notificationSelector = createSelector(
  getNotificationStatus,
  getNotificationTitle,
  getNotificationBody,
  getNotificationCallback,
  // eslint-disable-next-line
  (isShowed, title, body, callback) => ({ isShowed, title, body, callback })
);

export default connect(notificationSelector, { hideNotification })(NotificationPopup);
