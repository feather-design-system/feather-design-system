---
title: "Radio"
pre: "@featherds/radio"
description: "Radio buttons allow users to choose one option from a list of mutually exclusive alternatives. A pair of radio buttons will provide a binary choice similar to a checkbox. An important difference between a pair of radio buttons and a checkbox is that the radio button group may start in a state where neither option is selected (neither yes nor no). This can be especially useful when an explicit choice is required of the user, where we cannot make a default assumption about their preference."
lang: en-US
tags: ["Radio", "component"]
layout: ComponentLayout
---

## Design

The radio button design has been kept minimal, while the animation during interaction provides another level of visual interest. As the radio button is selected, the inner-circle grows from the center and the radio button may inherit the product color. Radio buttons are closely aligned with Google’s Material Design standards.

## Example

<Radio-Examples />

## FeatherRadio

Radio buttons should be used in a [FeatherRadioGroup](#FeatherRadioGroup). The radio group will provide a lot more functionality that should be used in a form. FeatherRadio is simply a radio button without any functionality that the form will need.

### Props

| Name     | Description                                                | Type      | Required | Default |
| -------- | ---------------------------------------------------------- | --------- | -------- | ------- |
| value    | should contain the value assosciated with the radio button | `Any`     | `false`  | -       |
| disabled | when true radio button will be disabled                    | `Boolean` | `false`  | `false` |

### Events

| Name    | Description                             | Properties |
| ------- | --------------------------------------- | ---------- |
| checked | triggered with the radio buttons value. | `Any`      |
| blur    | triggered when blur occurs.             | `{Event}`  |

### Slots

| Name    | Description                       |
| ------- | --------------------------------- |
| default | content will be placed in a label |

### data-ref-ids

- `feather-radio` radio element that responds to click and key presses.
- `feather-radio-label` label element.

## FeatherRadioGroup

### Props

| Name       | Description                                           | Type      | Required | Default |
| ---------- | ----------------------------------------------------- | --------- | -------- | ------- |
| label      | Label for the radio group                             | `String`  | `true`   | -       |
| modelValue | Current value selected by the radio group.            | `Any`     | `false`  | -       |
| hint       | Hint text to be displayed below the group             | `String`  | `false`  | -       |
| error      | Error text to be displayed below the group            | `String`  | `false`  | -       |
| vertical   | When true will put radio buttons in a vertical layout | `Boolean` | `false`  | `false` |

### Events

| Name              | Description                                             | Properties |
| ----------------- | ------------------------------------------------------- | ---------- |
| update:modelValue | triggered with the selected radio buttons value.        | `Any`      |
| blur              | triggers when radio button loses focus inside the group | `{Event}`  |

### Slots

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| default | should be FeatherRadioButtons to be used in group. |

### data-ref-ids

- `feather-radio-group` group element that responds to key presses.

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
