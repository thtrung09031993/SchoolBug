import { SCHOOL, SERVICE } from 'constants/api';
import { formatTime } from 'common/datetime-formatter';

export const parseViewServicesAPI = res => {
  return res.map(service => ({
    id: service[SERVICE.DRIVER_SERVICE_ID],
    daysOfWeek: service[SERVICE.DAYS_OF_WEEK].split(','),
    startTime: formatTime(service[SERVICE.START_TIME]),
    returnTime: formatTime(service[SERVICE.RETURN_TIME]),
    status: service[SERVICE.EXPIRED_TIME] ? 'INACTIVE' : 'ACTIVE',
    numberOfCustomers: service[SERVICE.NUMBER_OF_CUSTOMER],
    capacityAvailable: service[SERVICE.CAPACITY_AVAILABLE],
    school: {
      name: service[SCHOOL.SCHOOL_NAME]
    }
  }));
};
