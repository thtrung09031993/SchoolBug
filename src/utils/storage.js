import { AsyncStorage } from 'react-native';
import {
  AUTHORIZED_TOKEN, LANGUAGE
} from 'constants/storage';

export const saveToken = async token => {
  await AsyncStorage.removeItem(AUTHORIZED_TOKEN);
  await AsyncStorage.setItem(AUTHORIZED_TOKEN, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(AUTHORIZED_TOKEN);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(AUTHORIZED_TOKEN);
};

export const saveLanguage = async language => {
  await AsyncStorage.removeItem(LANGUAGE);
  await AsyncStorage.setItem(LANGUAGE, language);
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE);
};
