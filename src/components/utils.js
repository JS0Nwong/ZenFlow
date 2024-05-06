import weekday from "dayjs/plugin/weekday";
import advanceFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

dayjs.extend(weekday);
dayjs.extend(advanceFormat);

const today = dayjs();

/**
 * @param {string} date
 * @returns {boolean}
 */
export function isYesterday(date) {
    return dayjs(date).format('MM/DD/YYYY') === 
        today.subtract(1, 'day').format('MM/DD/YYYY')
}

/**
 * @param {string} date
 * @returns {boolean}
 */
export function isToday(date) {
    return dayjs(date).format('MM/DD/YYYY') === 
        today.format('MM/DD/YYYY')
}

/**
 * @param {string} date
 * @returns {boolean}
 */
export function isLastWeek(date) {
  const diff = today.diff(date, "d");
  return (
    dayjs(date).add(7, "d").format("MM/DD/YYYY") ===
      today.format("MM/DD/YYYY") && diff < 8
  );
}

/**
 * @param {string} date
 * @returns {boolean}
 */
export function isMoreThanAWeekAgo(date) {
    return today.diff(date, 'd') > 14
}

/**
 * @param {string} date
 * @returns {string}
 */
export function formatDateToMonthDay(date) {
  return dayjs(date).format("MMMM") + " " + dayjs(date).format("Do");
}

/**
 * @param {string} date
 * @returns {string}
 */
export function formatDateToLastWeekDateName(date) {
  return "Last" + " " + dayjs(date).format("dddd");
}

/**
 * @param {string} date
 * @returns {string}
 */
export function getDayName(date) {
    return dayjs(date).format('dddd')
}

