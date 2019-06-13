import { Toast } from 'native-base';
import { MORNING_SHIFT, AFTERNOON_SHIFT, EMPTY_STRING, ARRAY_EMPTY } from 'constants/common-data';
import { formatLanguage } from 'common/language';
import { isTimeBefore } from 'common/datetime-formatter';

const validateEmptyFields = service => {
  const isValidated = service.weekdays.length !== ARRAY_EMPTY && service.startAddress.length !== EMPTY_STRING
    && service.school.length !== EMPTY_STRING && service.className.length !== EMPTY_STRING
    && service.capacity.length !== EMPTY_STRING;

  isValidated
    ? null
    :
    Toast.show({
      text: formatLanguage('FIELDS_WARNING'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

const validateTime = service => {
  const isStartVsArrivalOK = isTimeBefore(service.startTime, service.arrivalTime);
  const isArrivalVsReturnOK = isTimeBefore(service.arrivalTime, service.returnTime);
  const isStartVsReturnOK = isTimeBefore(service.startTime, service.returnTime);

  isArrivalVsReturnOK && isStartVsArrivalOK && isStartVsReturnOK
    ?
    null
    :
    Toast.show({
      text: formatLanguage('SERVICE_TIME_ERROR'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isArrivalVsReturnOK && isStartVsArrivalOK && isStartVsReturnOK;
};

const validateCapacity = (service, car) => {
  const isValidated = service.capacity <= car.capacity;

  isValidated
    ?
    null
    :
    Toast.show({
      text: `${formatLanguage('CAR_CAPACITY_ERROR')} ${car.capacity}`,
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

export const initTime = type => {
  return {
    startTime: new Date(type === 'morning' ? MORNING_SHIFT.START : AFTERNOON_SHIFT.START),
    arrivalTime: new Date(type === 'morning' ? MORNING_SHIFT.ARRIVE : AFTERNOON_SHIFT.ARRIVE),
    returnTime: new Date(type === 'morning' ? MORNING_SHIFT.RETURN : AFTERNOON_SHIFT.RETURN)
  };
};

export const validateService = (service, car) => {
  return validateEmptyFields(service) && validateTime(service) && validateCapacity(service, car);
};
