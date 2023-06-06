import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isSameDay,
  setMonth,
  setYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { IDateDisabledConfig } from "../types";

const isDateDisabled = (
  config: IDateDisabledConfig | undefined,
  date: Date
) => {
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

const isValidDate = function (d: Date | undefined) {
  return d instanceof Date && !isNaN(d as unknown as number);
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
