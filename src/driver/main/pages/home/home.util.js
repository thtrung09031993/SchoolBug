import {
  SETTINGS
} from 'constants/screen';
import {
  CAR_UPDATING, FEEDBACK_REVIEW,
  SERVICES, SERVICE_OPENING
} from 'driver/constants/screen';

export const menus = [
  [
    {
      title: 'SERVICES',
      icon: 'md-apps',
      action: 'push',
      page: SERVICES,
      params: {}
    },
    {
      title: 'OPEN_SERVICE',
      icon: 'md-add',
      action: 'push',
      page: SERVICE_OPENING,
      params: {}
    },
    {
      title: 'CAR_UPDATING',
      icon: 'md-car',
      action: 'push',
      page: CAR_UPDATING,
      params: { isUpdatingCarAgain: true }
    },
    {
      title: 'FEEDBACK_REVIEW',
      icon: 'md-heart',
      action: 'push',
      page: FEEDBACK_REVIEW,
      params: {}
    }
  ],
  [
    {
      title: 'SETTINGS',
      icon: 'md-settings',
      action: 'navigate',
      page: SETTINGS,
      params: {}
    },
    {
      title: 'ABOUT_US',
      icon: 'md-information-circle',
      action: 'navigate',
      page: 'Home',
      params: {}
    }
  ],
  [
    {
      title: 'LOG_OUT',
      icon: 'md-exit',
      params: {}
    }
  ]
];
