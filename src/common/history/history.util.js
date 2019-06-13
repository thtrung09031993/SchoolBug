import { DAILY_TRIP, SERVICE, SCHOOL } from "constants/api";
import { formatDate, formatTime } from "common/datetime-formatter/index";

export const parseTripsAPI = res => res.map(trip => ({
  tripID: trip[DAILY_TRIP.ID],
  driverServiceID: trip[SERVICE.DRIVER_SERVICE_ID],
  date: formatDate(trip[DAILY_TRIP.CREATED_TIME]),
  startTime: trip[DAILY_TRIP.START_TIME] && formatTime(trip[DAILY_TRIP.START_TIME]),
  endTime: trip[DAILY_TRIP.END_TIME] && formatTime(trip[DAILY_TRIP.END_TIME]),
  school: trip[SCHOOL.SCHOOL],
  status: trip[DAILY_TRIP.TRIP_STATUS],
  type: trip[DAILY_TRIP.TRIP_TYPE]
}));
