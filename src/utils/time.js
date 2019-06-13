import { EQUALITY, NEXT_DATE } from "constants/common-data";

export const compareDate = (firstDate, secondDate) => {
  const firstYear = firstDate.getFullYear();
  const firstMonth = firstDate.getMonth();
  const firstDateInMonth = firstDate.getDate();
  const secondYear = secondDate.getFullYear();
  const secondMonth = secondDate.getMonth();
  const secondDateInMonth = secondDate.getDate();

  const yearGap = firstYear - secondYear;

  if (yearGap) {
    return yearGap;
  }

  const monthGap = firstMonth - secondMonth;

  if (monthGap) {
    return monthGap;
  }

  const dateGap = firstDateInMonth - secondDateInMonth;

  return dateGap;
};

export const countDates = (startDate, endDate, daysOfWeek = [0, 1, 2, 3, 4, 5, 6]) => {
  const date = new Date(startDate.valueOf());

  let counter = 0;

  if (!startDate || !endDate) return counter;

  while (compareDate(date, endDate) <= EQUALITY) {
    if (daysOfWeek.includes(date.getDay())) {
      counter++;
    }
    date.setDate(date.getDate() + NEXT_DATE);
  }

  return counter;
};
