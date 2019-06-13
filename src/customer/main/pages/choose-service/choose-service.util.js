import { USER, CAR, SERVICE, FEEDBACK } from 'constants/api';

export const parseDriverServiceListAPI = res => {
  return res.map(driverService => ({
    driver: {
      id: driverService[USER.USER_ID],
      name: driverService[USER.NAME],
      phone: driverService[USER.PHONE_NUMBER],
      avatar: driverService[USER.IMAGE],
      score: driverService[FEEDBACK.AVG_SCORE]
    },
    car: {
      plateNo: driverService[CAR.PLATE_NUMBER],
      brand: driverService[CAR.BRAND],
      model: driverService[CAR.MODEL],
      color: driverService[CAR.COLOR],
      capacity: driverService[CAR.CAPACITY]
    },
    driverServiceID: driverService[SERVICE.DRIVER_SERVICE_ID],
    matchingRate: driverService.MatchingRate,
    missingTrip: (driverService.MissTrip || []).map(trip => trip.Day)
  })).sort((a, b) => b.matchingRate - a.matchingRate);
};
