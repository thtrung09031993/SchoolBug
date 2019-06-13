import { Toast } from 'native-base';
import { formatLanguage } from 'common/language';
import { EMPTY_STRING, PHONE_NUMBER_LENGTH } from 'constants/common-data';


const validateEmptyFields = (authorization, type) => {
  const isValidated = type === 'login'
    ?
    authorization.phone.length !== EMPTY_STRING && authorization.password.length !== EMPTY_STRING
    :
    authorization.phone.length !== EMPTY_STRING && authorization.password.length !== EMPTY_STRING
    && authorization.confirm.length !== EMPTY_STRING;

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

const validatePhoneFormat = authorization => {
  const isValidated = PHONE_NUMBER_LENGTH.includes(authorization.phone.length);

  isValidated
    ? null
    :
    Toast.show({
      text: formatLanguage('WRONG_PHONE_FORMAT'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

const validatePasswordMatching = authorization => {
  const isValidated = authorization.password === authorization.confirm;

  isValidated
    ? null
    :
    Toast.show({
      text: formatLanguage('PASSWORD_NOT_MATCH'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

export const validateLogin = authorization => {
  return validateEmptyFields(authorization, 'login') && validatePhoneFormat(authorization);
};

export const validateRegister = authorization => {
  return validateEmptyFields(authorization, 'register')
    && validatePhoneFormat(authorization) && validatePasswordMatching(authorization);
};