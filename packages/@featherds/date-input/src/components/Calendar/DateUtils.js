import getYear from "date-fns/getYear";
import setYear from "date-fns/setYear";
import addYears from "date-fns/addYears";
import subYears from "date-fns/subYears";
import getMonth from "date-fns/getMonth";
import setMonth from "date-fns/setMonth";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import getDay from "date-fns/getDay";
import getDate from "date-fns/getDate";
import isSameDay from "date-fns/isSameDay";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import getDaysInMonth from "date-fns/getDaysInMonth";

const isDateDisabled = (config, date) => {
  if (!config) {
    return false;
  }

  if (config.dates && config.dates.length) {
    const dateFound = config.dates.some((d) => isSameDay(date, d));
    if (dateFound) {
      return true;
    }
  }
  if (config.to && date < config.to && !isSameDay(date, config.to)) {
    return true;
  }
  if (config.from && date > config.from && !isSameDay(date, config.from)) {
    return true;
  }
  if (config.ranges && config.ranges.length) {
    const rangeFound = config.ranges.some((range) => {
      if (range && range.from && range.to) {
        if (date < range.to && date > range.from) {
          return true;
        }
      }
      return false;
    });
    if (rangeFound) {
      return true;
    }
  }
  if (
    config.days &&
    config.days.length &&
    config.days.indexOf(getDay(date)) !== -1
  ) {
    return true;
  }
  if (
    config.daysOfMonth &&
    config.daysOfMonth.length &&
    config.daysOfMonth.indexOf(getDate(date)) !== -1
  ) {
    return true;
  }
  if (
    typeof config.customPredictor === "function" &&
    config.customPredictor(date)
  ) {
    return true;
  }
  return false;
};

const isValidDate = function (d) {
  return d instanceof Date && !isNaN(d);
};

export default {
  getYear,
  setYear,
  addYears,
  subYears,
  getMonth,
  setMonth,
  addMonths,
  subMonths,
  getDay,
  addDays,
  subDays,
  getDate,
  addWeeks,
  subWeeks,
  getDaysInMonth,
  isSameDay,
  isDateDisabled,
  isValidDate,
};
