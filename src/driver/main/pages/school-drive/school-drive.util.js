import { USER, CHILDREN, SCHOOL, ADDRESS, SERVICE, DAILY_TRIP, TRIP_DETAIL, REQUIREMENT } from 'constants/api';
import { TRIP_DETAIL_STATUS } from 'constants/status';

export const parseTripDetailAPI = res => {
  const school = res[SCHOOL.SCHOOL];
  const schoolAddress = school[ADDRESS.ADDRESS];
  const isGoingToSchool = res[DAILY_TRIP.TRIP_TYPE] === 'GO_TO_SCHOOL';
  const dailyTripID = res[DAILY_TRIP.ID];
  const schoolTime = isGoingToSchool ? res[SERVICE.ARRIVAL_TIME] : res[SERVICE.RETURN_TIME];

  const customerPoints = res.PickUpList.map(item => {
    const customer = item[USER.CUSTOMER];
    const address = item[REQUIREMENT.PICK_UP_ADDRESS];
    const pickUpTime = item[REQUIREMENT.PICK_UP_TIME];
    const returnTime = item[REQUIREMENT.RETURN_TIME];
    const children = item[CHILDREN.CHILDREN];
    const achieved = children
      .filter(child =>
        child[TRIP_DETAIL.STATUS] === TRIP_DETAIL_STATUS.WAITING ||
        (child[TRIP_DETAIL.STATUS] === TRIP_DETAIL_STATUS.PICKED_UP && !isGoingToSchool)
      ).length ? undefined : true;

    return {
      information: {
        id: customer[USER.USER_ID],
        name: customer[USER.NAME],
        avatar: customer[USER.IMAGE],
        phone: customer[USER.PHONE_NUMBER],
        type: 'customer'
      },
      time: isGoingToSchool ? pickUpTime : returnTime,
      address: address[ADDRESS.DETAIL],
      position: {
        latitude: address[ADDRESS.LATITUDE],
        longitude: address[ADDRESS.LONGITUDE]
      },
      children: children.map(child => ({
        tripDetailID: child[TRIP_DETAIL.TRIP_DETAIL_ID],
        id: child[CHILDREN.CHILD_ID],
        name: child[CHILDREN.NAME],
        avatar: child[CHILDREN.IMAGE],
        className: child[CHILDREN.CLASS_NAME],
        status: child[TRIP_DETAIL.STATUS]
      })),
      achieved
    };
  });

  const schoolPoint = {
    information: {
      name: school[SCHOOL.NAME],
      type: 'school'
    },
    time: schoolTime,
    address: schoolAddress[ADDRESS.DETAIL],
    position: {
      latitude: schoolAddress[ADDRESS.LATITUDE],
      longitude: schoolAddress[ADDRESS.LONGITUDE]
    }
  };
  const points = isGoingToSchool ? [...customerPoints, schoolPoint] : [schoolPoint, ...customerPoints];

  return { points, isGoingToSchool, dailyTripID };
};
