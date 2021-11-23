---
title: "DateInput"
pre: "@featherds/date-input"
description: "Date Inputs allow users to select a date from the past, present or future."
lang: en-US
tags: ["DateInput", "component"]
layout: ComponentLayout
---

## Design

## Examples

<DateInput-Examples />

## DateInput

### Props

| Name          | Description                                                                                                                           | Type      | Required | Default                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------- |
| modelValue    | value of the input                                                                                                                    | `Date`    | `false`  | -                                     |
| minYear       | minimum year to show                                                                                                                  | `Number`  | `false`  | `1900`                                |
| maxYear       | maximum year to show                                                                                                                  | `Number`  | `false`  | `2030`                                |
| mondayFirst   | should monday be first day of the week.                                                                                               | `Boolean` | `false`  | -                                     |
| disabledDates | can be used to configure disabled dates. See [Disabled Dates](#disabled-dates)                                                        | `Object`  | `false`  | See [Disabled Dates](#disabled-dates) |
| labels        | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example         |

### Labels

Text labels for Date Input can be customized via the `labels` property. The default `labels` values are:

```js
{
  day: "Day",
  month: "Month",
  year: "Year",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  selectMonth: "Select month",
  selectYear: "Select year",
  inCalendar: "In calendar",
  calendar: "Click for calendar",
  menu:
    "Use arrow keys to navigate dates. Page down and page up will navigate by month. Shift page down and shift page up will navigate by year. Press escape to exit the calendar."
}
```

### Disabled Dates

| Name        | Description                                                                                                                                                        | Type                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| to          | will disable all dates up to this value                                                                                                                            | `Date`                   |
| from        | will disable all dates from this value                                                                                                                             | `Date`                   |
| ranges      | an array of objects. Each object must have a `to` and `from` property. Will disable `from` date `to` the next. It is used to disable inclusive values of the range | `{from:Date, to:Date}[]` |
| days        | will disable days of the week based on numbers in the array. `0-6`                                                                                                 | `number[]`               |
| daysOfMonth | will disable dates in a month based on numbers in the array. `1-31`                                                                                                | `number[]`               |

### Events

- `update:modelValue` - triggered with new value
- `blur` - triggered when control loses focus

### Slots

- `pre` - define an icon that will appear before the input

### data-ref-ids

- `feather-date-input-day` - day spin button
- `feather-date-input-month` - month spin button
- `feather-date-input-year` - year spin button
- `feather-date-input-button` - button to open calendar
- `feather-calendar-prev-month` - previous month button in calendar
- `feather-calendar-next-month` - next month button in calendar
- `feather-calendar-select-month` - month select element. It is a [FeatherSelect](../../Select/Components/FeatherSelect.html)
- `feather-calendar-select-year` - month select element. It is a [FeatherSelect](../../Select/Components/FeatherSelect.html)
- `feather-calendar-highlighted-day` - current day that is highlighted in the calendar

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.
