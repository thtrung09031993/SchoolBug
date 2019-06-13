export const ARRAY_NOT_FOUND = -1;
export const ARRAY_EMPTY = 0;
export const ARRAY_FIRST = 0;
export const ARRAY_SECOND = 1;
export const ARRAY_STEP = 1;

export const EQUALITY = 0;

export const DECIMAL = 10;
export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;

export const getArrayLastElement = length => {
  return length - ARRAY_STEP;
};

export const DAYS_OF_WEEK_SHORT = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};

export const DAYS_OF_WEEK = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT'
};

export const MONTHS = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC'
};

export const MORNING_SHIFT = {
  START: '1970-01-02T23:30:00Z',
  ARRIVE: '1970-01-02T00:00:00Z',
  RETURN: '1970-01-02T04:30:00Z'
};

export const AFTERNOON_SHIFT = {
  START: '1970-01-02T05:00:00Z',
  ARRIVE: '1970-01-02T05:30:00Z',
  RETURN: '1970-01-02T10:15:00Z'
};

export const POPULAR_SCHOOL_DAYS = ['1', '2', '3', '4', '5'];

export const NEXT_DATE = 1;
export const FIRST_DAY = 0;
export const LAST_DAY = 6;
export const MONTH_GAP = 1;

export const SUGGESTION_TIMEOUT = 500;
export const ANIMATION_TIME = 300;

export const TWO_DIGIT_TIME = 10;
export const EMPTY_STRING = 0;
export const CURRENCY = "VND";

const x = 4;
const y = 4;

export const ASPECT_IMAGE = [x, y];
export const IMAGE_QUALITY = 1;

const phone1 = 10;
const phone2 = 11;

export const PHONE_NUMBER_LENGTH = [phone1, phone2];
export const MIN_CAPACITY = 4;

export const RATING = {
  TITLE: ["TERRIBLE", "BAD", "OK", "GOOD", "AMAZING"],
  COUNT: 5,
  DEFAULT: 3
};

export const OFF_REASON = [
  'CHILD_SICK',
  'PERSONAL_ISSUE',
  'SCHOOL_OFF',
  'FAMILY_EMERGENCY',
  'ANOTHER_REASON'
];

export const CANCEL_CONTRACT_REASON = {
  driver: [
    'CUSTOMER_NOT_GOOD',
    'PERSONAL_ISSUE',
    'BUSY',
    'NOT_CONVENIENT',
    'ANOTHER_REASON'
  ],
  customer: [
    'PERSONAL_ISSUE',
    'DRIVER_NOT_GOOD',
    'CHANGE_TIME',
    'CHANGE_PLACE',
    'ANOTHER_REASON'
  ]
};

export const RESPONSE_ERROR = {
  SERVER: 500,
  TOKEN: 401,
  BAD_REQUEST: 400
};
