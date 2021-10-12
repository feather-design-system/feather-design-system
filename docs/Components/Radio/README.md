---
title: "Radio"
pre: "@featherds/radio"
description: "Enables a user to choose one option from a group of options."
lang: en-US
tags: ["Radio", "component"]
menu: components
---

## Design

The Radio button design has been kept minimal – understanding that the component will likely be used in a form with other components. The animation, however, has been built-in the add visual interest and to more importantly convey important feedback to the user.

## Example

<Radio-Examples />

## Usage

Radio buttons enable a user to make a single selection among a group of options. When using a Radio, it's recommended to list options in a logical order (alphabetically, numerically, etc.) and include at least 2 or more options. By default, it's recommended to have no Radio selected unless there is a most likely or recommended selection.

## Radio

Radio buttons should be used in a [RadioGroup](#RadioGroup). The Radio Group will provide a lot more functionality that should be used in a form. Radio is simply a radio button without any functionality that a form will need.

### Props

| Name     | Description                                                | Type      | Required | Default |
| -------- | ---------------------------------------------------------- | --------- | -------- | ------- |
| value    | should contain the value assosciated with the radio button | `Any`     | `false`  | -       |
| disabled | when true, radio button will be disabled                   | `Boolean` | `false`  | `false` |

### Events

- `checked` - emitted with the radio buttons value
- `blur` - emitted when blur occurs

### Slots

| Name    | Description                       |
| ------- | --------------------------------- |
| default | content will be placed in a label |

### data-ref-ids

- `feather-radio` - radio element that responds to click and key presses
- `feather-radio-label` - label element

## RadioGroup

### Props

| Name       | Description                                           | Type      | Required | Default |
| ---------- | ----------------------------------------------------- | --------- | -------- | ------- |
| label      | label for the radio group                             | `String`  | `true`   | -       |
| modelValue | current value selected by the radio group             | `Any`     | `false`  | -       |
| hint       | hint text to be displayed below the group             | `String`  | `false`  | -       |
| error      | error text to be displayed below the group            | `String`  | `false`  | -       |
| vertical   | when true will put radio buttons in a vertical layout | `Boolean` | `false`  | `false` |
| schema     | a schema for use in validation                        | `Object`  | `false`  | -       |

### Events

- `update:modelValue` - triggered with the selected radio buttons value
- `blur` - triggers when radio button loses focus inside the group

### Slots

- `default` - Radios to be used in group

### data-ref-ids

- `feather-radio-group` - group element that responds to key presses

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the component root container `div`. All other attributes are inherited to the `input` where applicable. Some will be ignored if they conflict with attributes used for accessibility.
