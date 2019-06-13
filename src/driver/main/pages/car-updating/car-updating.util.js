import { Toast } from 'native-base';
import { EMPTY_STRING, MIN_CAPACITY, DECIMAL } from 'constants/common-data';
import { formatLanguage } from 'common/language';

const validateEmptyFields = car => {
  const isValidated = car.plateNo.length !== EMPTY_STRING && car.brand.length !== EMPTY_STRING &&
    car.model.length !== EMPTY_STRING && car.capacity.length !== EMPTY_STRING && car.color.length !== EMPTY_STRING;

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

const validateCapacity = car => {
  const isValidated = parseInt(car.capacity, DECIMAL) >= MIN_CAPACITY;

  isValidated
  ? null
  :
  Toast.show({
    text: formatLanguage('MIN_CAPACITY'),
    buttonText: 'OK',
    type: 'warning'
  });

  return isValidated;
};

export const validateUpdateCar = car => {
  return validateEmptyFields(car) && validateCapacity(car);
};