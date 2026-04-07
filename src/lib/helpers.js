import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const DEFAULT_TIME_ZONE = "America/Edmonton";

/**
 * 
 * @param {string} input 
 * @param {number} maxLength 
 * @returns {string}
 */
export function trimText(input, maxLength = 100) {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}

/**
 *
 * @param {Date | string | number | import("dayjs").Dayjs} dateInput
 * @param {string} [timeZone]
 * @returns {import("dayjs").Dayjs}
 */
function toZonedDateTime(dateInput, timeZone = DEFAULT_TIME_ZONE) {
  return dayjs(dateInput).tz(timeZone);
}

/**
 *
 * @returns {Date}
 */
export function getCurrentTime() {
  return new Date();
}

/**
 *
 * @param {Date | string | number | import("dayjs").Dayjs} dateInput
 * @param {string} [timeZone]
 * @returns {string}
 */
export function formatTime(dateInput, timeZone = DEFAULT_TIME_ZONE) {
  return formatTimeParts(dateInput, timeZone).full;
}

/**
 *
 * @param {Date | string | number | import("dayjs").Dayjs} dateInput
 * @param {string} [timeZone]
 * @returns {{ clock: string, dayPeriod: string, timeZone: string, full: string }}
 */
export function formatTimeParts(dateInput, timeZone = DEFAULT_TIME_ZONE) {
  const zonedDateTime = toZonedDateTime(dateInput, timeZone);
  const clock = zonedDateTime.format("hh:mm:ss");
  const dayPeriod = zonedDateTime.format("A");
  const timeZoneName = zonedDateTime.format("z");
  const full = `${clock} ${dayPeriod} ${timeZoneName}`.trim();

  return { clock, dayPeriod, timeZone: timeZoneName, full };
}

/**
 * 
 * @param {Date} date 
 * @returns {string}
 */
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
