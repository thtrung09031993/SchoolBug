import { Permissions, Notifications } from 'expo';

import API from 'common/api';
import { TOKEN, DEVICE_TOKEN_API } from 'constants/api';

export const getDeviceToken = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  return await Notifications.getExpoPushTokenAsync();
};

export const registerDevice = async () => {
  const token = await getDeviceToken();

  API.post(DEVICE_TOKEN_API, { [TOKEN]: token });
};

export const unregisterDevice = async () => {
  const token = await getDeviceToken();

  API.delete(DEVICE_TOKEN_API, { [TOKEN]: token });
};
