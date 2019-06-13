import { TWO_DIGIT_TIME, DAYS_OF_WEEK_SHORT, ARRAY_FIRST, MONTH_GAP, MONTHS } from 'constants/common-data';
import { formatLanguage } from 'common/language';

export const formatTime = time => {
  const dateObj = new Date(time);

  let hh = dateObj.getHours();

  let mm = dateObj.getMinutes();

  if (hh < TWO_DIGIT_TIME) {
    hh = `0${hh}`;
  }
  if (mm < TWO_DIGIT_TIME) {
    mm = `0${mm}`;
  }

  return `${hh}:${mm}`;
};

export const formatDate = date => {
  let dateObj = new Date(date);

  const yyyy = dateObj.getFullYear();

  let MM = dateObj.getMonth() + MONTH_GAP;

  let dd = dateObj.getDate();

  if (MM < TWO_DIGIT_TIME) {
    MM = `0${MM}`;
  }
  if (dd < TWO_DIGIT_TIME) {
    dd = `0${dd}`;
  }

  return `${dd}-${MM}-${yyyy}`;
};

const DAY_STEP = 1;
const MONTH_STEP = 1;
const YEAR_STEP = 1;
const JAN = 1;
const FEB = 2;
const MAR = 3;
const APR = 4;
const MAY = 5;
const JUN = 6;
const JUL = 7;
const AUG = 8;
const SEP = 9;
const OCT = 10;
const NOV = 11;
const DEC = 12;
const DAY_30_MONTH = [APR, JUN, SEP, NOV];
const DAY_1 = 1;
const DAY_28 = 28;
const DAY_29 = 29;
const DAY_30 = 30;
const DAY_31 = 31;
const MONTH_1 = 1;
const MONTH_12 = 12;
const DAY_31_MONTH = [JAN, MAR, MAY, JUL, AUG, OCT, DEC];
const DAY_28_29_MONTH = FEB;

export const getNextDay = day => {
  const today = new Date(day);
  const month = today.getMonth();

  if (DAY_30_MONTH.includes(month + MONTH_STEP)) {
    return new Date(today.getDate() === DAY_30
      ? today.setDate(DAY_1).setMonth(month + MONTH_STEP)
      : today.setDate(today.getDate() + DAY_STEP));
  }
  if (DAY_31_MONTH.includes(month + MONTH_STEP)) {
    if (today.getMonth() + MONTH_STEP === MONTH_12 && today.getDate() === DAY_31) {
      return new Date(today.setDate(DAY_1).setMonth(MONTH_1 - MONTH_STEP)
        .setFullYear(today.getFullYear() + YEAR_STEP));
    }

    return new Date(today.getDate() === DAY_31
      ? today.setDate(DAY_1).setMonth(month + MONTH_STEP)
      : today.setDate(today.getDate() + DAY_STEP));
  }
  if (DAY_28_29_MONTH.includes(month + MONTH_STEP)) {
    return new Date(today.getDate() === DAY_28 || today.getDate() === DAY_29
      ? today.setDate(DAY_1).setMonth(month + MONTH_STEP)
      : today.setDate(today.getDate() + DAY_STEP));
  }
};

export const isTimeBefore = (beforeTime, afterTime) => {
  if (beforeTime.getHours() === afterTime.getHours()) {
    return beforeTime.getMinutes() < afterTime.getMinutes();
  }

  return beforeTime.getHours() < afterTime.getHours();
};

export const isDayBefore = (beforeDay, afterDay) => {
  if (beforeDay.getFullYear() === afterDay.getFullYear()) {
    if (beforeDay.getMonth() === afterDay.getMonth()) {
      return beforeDay.getDate() < afterDay.getDate();
    }

    return beforeDay.getMonth() < afterDay.getMonth();
  }

  return beforeDay.getFullYear() < afterDay.getFullYear();
};

const getViDateString = date => {
  return `${formatLanguage(DAYS_OF_WEEK_SHORT[date.getDay()])},`
    + ` ${date.getDate()} ${formatLanguage(MONTHS[date.getMonth()])}`
    + `, ${date.getFullYear()}`;
};

const getEnDateString = date => {
  return `${formatLanguage(DAYS_OF_WEEK_SHORT[date.getDay()])},`
    + ` ${formatLanguage(MONTHS[date.getMonth()])} ${date.getDate()}`
    + `, ${date.getFullYear()}`;
};

export const toCustomizedDateString = (date, language) => {
  return language === 'VIETNAMESE' ? getViDateString(date) : getEnDateString(date);
};
