import { Toast } from 'native-base';
import { EMPTY_STRING } from 'constants/common-data';
import { formatLanguage } from 'common/language';

const validateEmptyFields = profile => {
  const isValidated = profile.name.length !== EMPTY_STRING && profile.id.length !== EMPTY_STRING &&
    profile.address.length !== EMPTY_STRING && profile.image.uri.length !== EMPTY_STRING;

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

export const validateUpdateProfile = profile => {
  return validateEmptyFields(profile);
};