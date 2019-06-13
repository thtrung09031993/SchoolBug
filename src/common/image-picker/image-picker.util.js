import { Permissions } from 'expo';

const getIOSPermission = async source => {
  let finalStatus = 'granted';
  const { status: cameraRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  finalStatus = cameraRollStatus;
  if (source === 'storage') {
    return finalStatus === 'granted';
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);

  finalStatus = cameraStatus;

  return finalStatus === 'granted';
};

const getAndroidPermission = async () => {
  let finalStatus = 'granted';
  const { status: cameraRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  finalStatus = cameraRollStatus;
  if (finalStatus === 'granted') {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);

    finalStatus = cameraStatus;

    return finalStatus === 'granted';
  }

  return false;
};


export const getPermissions = (platform, source) => {
  if (platform === 'ios') {
    return getIOSPermission(source);
  }

  return getAndroidPermission(source);
};