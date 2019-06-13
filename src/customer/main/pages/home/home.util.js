import {
  SETTINGS, CHILDREN_MANAGEMENT
} from 'constants/screen';
import {
  SERVICE_REQUIREMENT, REQUIREMENTS
} from 'customer/constants/screen';

export const menus = [
  [
    {
      title: 'REQUIREMENT',
      icon: 'md-apps',
      action: 'push',
      page: REQUIREMENTS,
      params: {}
    },
    {
      title: 'CREATE_REQUIREMENT',
      icon: 'md-add',
      action: 'push',
      page: SERVICE_REQUIREMENT,
      params: {}
    },
    {
      title: 'MY_CHILDREN',
      icon: 'md-happy',
      action: 'push',
      page: CHILDREN_MANAGEMENT,
      params: {}
    }
  ],
  [
    {
      title: 'SETTINGS',
      icon: 'md-settings',
      action: 'push',
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
