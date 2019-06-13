import { Toast } from 'native-base';
import { EMPTY_STRING } from 'constants/common-data';
import { formatLanguage } from 'common/language';

const validateEmptyFields = child => {
  const isValidated = child.name.length !== EMPTY_STRING && child.class.length !== EMPTY_STRING &&
    child.school.length !== EMPTY_STRING && child.image.uri.length !== EMPTY_STRING;

  isValidated
    ?
    null
    :
    Toast.show({
      text: formatLanguage('FIELDS_WARNING'),
      buttonText: 'OK',
      type: 'warning'
    });

  return isValidated;
};

export const validateChild = profile => {
  return validateEmptyFields(profile);
};