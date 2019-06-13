import { DAILY_TRIP, SERVICE, SCHOOL, ADDRESS, TRIP_DETAIL, CHILDREN, USER, CAR } from "constants/api";
import { formatTime } from "common/datetime-formatter";

export const parseBillAPI = res => ({
  dailyTripID: res[DAILY_TRIP.TRIP_ID],
  driverServiceID: res[SERVICE.DRIVER_SERVICE_ID],
  date: new Date(res[DAILY_TRIP.CREATED_TIME]),
  startTime: formatTime(res[DAILY_TRIP.START_TIME]),
  endTime: formatTime(res[DAILY_TRIP.END_TIME]),
  school: {
    name: res[SCHOOL.SCHOOL][SCHOOL.NAME],
    address: res[SCHOOL.SCHOOL][ADDRESS.ADDRESS][ADDRESS._DETAIL]
  },
  children: res[TRIP_DETAIL.TRIP_DETAIL].map(tripDetail => ({
    tripDetailID: tripDetail[TRIP_DETAIL.ID],
    id: tripDetail[CHILDREN.CHILD][CHILDREN.CHILD_ID],
    name: tripDetail[CHILDREN.CHILD][CHILDREN.NAME],
    avatar: tripDetail[CHILDREN.CHILD][CHILDREN.IMAGE],
    address: tripDetail[ADDRESS.ADDRESS][ADDRESS._DETAIL],
    time: res[DAILY_TRIP.TRIP_TYPE] === 'GO_TO_SCHOOL'
      ? formatTime(tripDetail[TRIP_DETAIL.PICK_UP_TIME])
      : formatTime(tripDetail[TRIP_DETAIL.DROP_OFF_TIME]),
    status: tripDetail[TRIP_DETAIL.STATUS],
    fee: tripDetail[TRIP_DETAIL.FEE]
  })),
  completionImage: res[DAILY_TRIP.IMAGE],
  completionMessage: res[DAILY_TRIP.MESSAGE],
  type: res[DAILY_TRIP.TRIP_TYPE],
  status: res[DAILY_TRIP.TRIP_STATUS],
  totalFee: res[DAILY_TRIP.TOTAL_FEE]
});

export const parseDriverAPI = res => ({
  name: res[USER.DRIVER][USER.NAME],
  phone: res[USER.DRIVER][USER.PHONE_NUMBER],
  avatar: res[USER.DRIVER][USER.IMAGE],
  car: {
    plateNo: res[CAR.CAR][CAR.PLATE_NUMBER],
    brand: res[CAR.CAR][CAR.BRAND],
    model: res[CAR.CAR][CAR.MODEL],
    color: res[CAR.CAR][CAR.COLOR]
  }
});
