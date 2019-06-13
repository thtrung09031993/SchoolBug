import { Toast } from 'native-base';
import { MORNING_SHIFT, AFTERNOON_SHIFT, EMPTY_STRING, ARRAY_EMPTY } from 'constants/common-data';
import { formatLanguage } from 'common/language';
import { isTimeBefore, isDayBefore } from 'common/datetime-formatter';
const DAY_GAP = 7;

const validateEmptyFields = requirement => {
  const isValidated = requirement.weekdays.length !== ARRAY_EMPTY && requirement.pickUpAddress.length !== EMPTY_STRING
    && requirement.school.length !== EMPTY_STRING !== EMPTY_STRING && requirement.chosenChildren.length !== ARRAY_EMPTY;

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

const validateTime = requirement => {
  const isPickUpVsArrivalOK = isTimeBefore(requirement.pickUpTime, requirement.arrivalTime);
  const isArrivalVsReturnOK = isTimeBefore(requirement.arrivalTime, requirement.returnTime);
  const isPickUpVsReturnOK = isTimeBefore(requirement.pickUpTime, requirement.returnTime);

  isArrivalVsReturnOK && isPickUpVsArrivalOK && isPickUpVsReturnOK
    ?
    null
    :
    Toast.show({
      text: formatLanguage('REQUIREMENT_TIME_ERROR'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isArrivalVsReturnOK && isPickUpVsArrivalOK && isPickUpVsReturnOK;
};

const validateDate = requirement => {
  const isValidated = isDayBefore(requirement.startDate, requirement.endDate);

  isValidated
    ? null
    :
    Toast.show({
      text: formatLanguage('REQUIREMENT_DATE_ERROR'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

export const initTime = type => {
  return {
    pickUpTime: new Date(type === 'morning' ? MORNING_SHIFT.START : AFTERNOON_SHIFT.START),
    arrivalTime: new Date(type === 'morning' ? MORNING_SHIFT.ARRIVE : AFTERNOON_SHIFT.ARRIVE),
    returnTime: new Date(type === 'morning' ? MORNING_SHIFT.RETURN : AFTERNOON_SHIFT.RETURN)
  };
};

export const initDate = () => {
  const startDate = new Date();

  let endDate = new Date();

  endDate.setDate(endDate.getDate() + DAY_GAP);

  return {
    startDate,
    endDate
  };
};

export const validateRequirement = requirement => {
  return validateEmptyFields(requirement) && validateTime(requirement) && validateDate(requirement);
};
