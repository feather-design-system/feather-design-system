export interface IDateDisabledConfig extends IDateRange {
  dates?: (Date | number)[];
  ranges?: IDateRange[];
  days?: number[];
  daysOfMonth?: number[];
  customPredictor?: (date: Date | number) => boolean;
}
interface IDateRange {
  to?: Date | number;
  from?: Date | number;
}
export const LABELS = {
  day: "Day",
  month: "Month",
  year: "Year",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  selectMonth: "Select month",
  selectYear: "Select year",
  inCalendar: "In calendar",
  calendar: "Click for calendar",
  clear: "Clear date",
  menu: "Use arrow keys to navigate dates. Page down and page up will navigate by month. Shift page down and shift page up will navigate by year. Press escape to exit the calendar.",
};
