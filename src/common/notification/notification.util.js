import { NOTIFICATION } from "constants/api";
import { formatDate, formatTime } from "common/datetime-formatter";

export const parseNotificationsAPI = res => res.map(notification => ({
  notificationID: notification[NOTIFICATION.ID],
  title: notification[NOTIFICATION.TITLE],
  body: notification[NOTIFICATION.BODY],
  date: formatDate(notification[NOTIFICATION.TIME]),
  time: formatTime(notification[NOTIFICATION.TIME]),
  page: notification[NOTIFICATION.PAGE],
  params: JSON.parse(notification[NOTIFICATION.PARAMS])
}));
