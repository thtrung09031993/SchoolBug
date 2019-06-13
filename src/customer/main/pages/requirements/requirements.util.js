import {
  SCHOOL, CHILDREN, USER,
  REQUIREMENT
} from 'constants/api';
import { formatTime } from 'common/datetime-formatter';

export const parseViewRequirementsAPI = res => {
  return res.map(requirement => ({
    id: requirement[REQUIREMENT.CUSTOMER_REQUIREMENT_ID],
    children: (requirement[CHILDREN.CHILD] || []).map(child => ({
      name: child[CHILDREN.NAME],
      avatar: child[CHILDREN.IMAGE]
    })),
    daysOfWeek: requirement[REQUIREMENT.DAYS_OF_WEEK].split(','),
    pickUpTime: formatTime(requirement[REQUIREMENT.PICK_UP_TIME]),
    contractStatus: requirement[REQUIREMENT.CONTRACT_STATUS],
    school: {
      name: requirement[SCHOOL.SCHOOL]
    },
    driver: requirement[USER.DRIVER] && {
      name: requirement[USER.DRIVER][USER.NAME],
      avatar: requirement[USER.DRIVER][USER.IMAGE]
    }
  }));
};
