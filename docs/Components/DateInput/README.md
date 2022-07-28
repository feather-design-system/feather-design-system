---
title: "Date Input"
pre: "@featherds/date-input"
description: "Allows users to select a date from the past, present or future."
lang: en-US
tags: ["DateInput", "component"]
menu: components
---

## Design

A Date Input consists of two primary methods of interaction:

The Date Input is a “spinner” control that appears as a text field and allows for a granular level of keyboard control with the arrow keys. The text field Date Input is best used when the user needs to enter a date from the distant past or far in the future. The text field date input allows for faster input thanks to the minimal number of clicks involved and the speed with which users can type.

The date picker is a graphical calendar that involves more clicks on the user’s behalf but provides a spatial context for the individual day and its relationship to all other days in each month. This can provide more context for a user but requires more cognitive overhead when used

## Examples

<DateInput-Examples />

## Usage

These components are often found in the form of workflows where data entry is the primary user objective. The text input Date Input does not work well on a mobile experience. The date entry field may take the form of a text field Date Input, but upon interaction, the user should be presented with either a spinner or a calendar Date Input. Any reconfiguration of the Date Input component on a mobile interface must refactor the area of the interactive elements to accommodate touch interactions.

## DateInput

### Props

| Name          | Description                                                                                                                           | Type       | Required | Default                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------- |
| modelValue    | value of the input                                                                                                                    | `Date`     | `false`  | -                                     |
| minYear       | minimum year to show                                                                                                                  | `Number`   | `false`  | `1900`                                |
| maxYear       | maximum year to show                                                                                                                  | `Number`   | `false`  | `2030`                                |
| mondayFirst   | should monday be first day of the week.                                                                                               | `Boolean`  | `false`  | -                                     |
| disabledDates | can be used to configure disabled dates. See [Disabled Dates](#disabled-dates)                                                        | `Object`   | `false`  | See [Disabled Dates](#disabled-dates) |
| labels        | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`   | `false`  | See [Labels](#labels) example         |
| schema        | a schema for use in validation                                                                                                        | `Object`   | `false`  | -                                     |
| pasteFormats  | checks pasted strings for allowed date formats                                                                                        | `String[]` | `false`  | See [Pasting](#pasting)               |

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

### Pasting

When pasting a string to `FeatherDateInput` we will attempt to parse it for a valid date based on the formats specified in the prop `pasteFormats`. The order of the array is important as that is the order they will be checked. We utilize `date-fns/parse` for handling parsing the string therefore all formats adhere to its syntax. Check out [parse](https://date-fns.org/v2.29.1/docs/parse) for details. The default formats are as follows:

```js
[
  "yyyy-MM-dd",
  "MM/dd/yyyy",
  "MM-dd-yyyy",
  "MMM/dd/yyyy",
  "MMM-dd-yyyy",
  "MM/dd/yy",
  "MM-dd-yy",
  "MMM/dd/yy",
  "MMM-dd-yy",
  "M/d/yyyy",
  "M-d-yyyy",
  "M/d/yy",
  "M-d-yy",
];
```

### Exposes

- `reset` - clears the value, like the clear icon, but also resets the spinners to their default states

This method is useful for example when clearing a form, you can use it within a clear method like the following;

```
clearAll() {
  ...
  (this.$refs.dateInput as typeof FeatherDateInput).reset();
  ...
}
```

### Slots

- `pre` - define an icon that will appear before the input

### data-ref-ids

- `feather-date-input-day` - day spin button
- `feather-date-input-month` - month spin button
- `feather-date-input-year` - year spin button
- `feather-date-input-button` - button to open calendar
- `feather-date-input-group` - the container around the spin buttons in the input
- `feather-calendar-prev-month` - previous month button in calendar
- `feather-calendar-next-month` - next month button in calendar
- `feather-calendar-select-month` - month select element. It is a [FeatherSelect](/Components/Select/)
- `feather-calendar-select-year` - month select element. It is a [FeatherSelect](/Components/Select/)
- `feather-calendar-highlighted-day` - current day that is highlighted in the calendar
- `feather-date-input-menu-container` - the root div of the menu container
- `feather-date-input-menu-container-dropdown` - the container div for the calendar contents, note this uses our layering system and will be present as an immediate child of the `body` tag

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.
