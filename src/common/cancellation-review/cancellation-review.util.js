import { DAILY_TRIP, CHILDREN, CONTRACT, SERVICE, USER, ADDRESS, CAR } from 'constants/api';

export const parseCancellationRequests = (requests, appType) => {
  return {
    customer: requests[DAILY_TRIP.CUSTOMER_CANCEL_REQUEST].map(request => ({
      children: request[CHILDREN.CHILDREN],
      offDay: request[DAILY_TRIP.OFF_DATE],
      description: request[DAILY_TRIP.DESCRIPTION]
    })),
    driver: requests[DAILY_TRIP.DRIVER_CANCEL_REQUEST].map(request => ({
      driverServiceID: request[SERVICE.DRIVER_SERVICE_ID],
      offDay: request[DAILY_TRIP.OFF_DATE],
      description: request[DAILY_TRIP.DESCRIPTION],
      tempContract: appType === 'driver' ? null : (request[CONTRACT.TEMP_CONTRACT] || null)
    }))
  };
};

export const parseTempContractDriver = tempContract => {
  return {
    avatar: tempContract ? tempContract[USER.DRIVER][USER.IMAGE] : '',
    name: tempContract ? tempContract[USER.DRIVER][USER.NAME] : '',
    address: tempContract ? tempContract[USER.DRIVER][ADDRESS.ADDRESS][ADDRESS.DETAIL] : '',
    phone: tempContract ? tempContract[USER.DRIVER][USER.PHONE_NUMBER] : '',
    car: tempContract ? `${tempContract[CAR.CAR][CAR.BRAND]} ` +
      `${tempContract[CAR.CAR][CAR.MODEL]} ` +
      `${tempContract[CAR.CAR][CAR.COLOR]} ` : '',
    capacity: tempContract ? tempContract[CAR.CAR][CAR.CAPACITY] : '',  
    plate: tempContract ? tempContract[CAR.CAR][CAR.PLATE_NUMBER] : ''
  };
};