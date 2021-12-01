---
title: "Checkbox"
pre: "@featherds/checkbox"
description: "Allows users to select one or many options."
lang: en-US
tags: ["Checkbox", "component"]
layout: ComponentLayout
---

## Design

Checkbox allows a user to select one or many options. There are multiple design variations available to be used based on application needs.

## Examples

<Checkbox-Examples />

## Usage

Checkboxes are used in scenarios where the user has the option and need to select multiple values from a list of options. When using a Checkbox, it’s recommended to list options in a logical order (alphabetically, numerically, etc.) and include at least 2 or more options.

**When to use**

Do not use Checkbox in scenarios where a user has more than 5 options.

Instead use:
[Select](/Components/Select/)

Do not use Checkbox when a user can only choose one option out of 2 options.

Instead use:
[Radio](/Components/Radio/)


## Checkbox

### Props

| Name          | Description                                                                     | Type      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | --------- | -------- | ------- |
| disabled      | will disable the control when true                                              | `Boolean` | `false`  | -       |
| modelValue    | whether Checkbox is checked or not                                              | `Boolean` | `false`  | -       |
| indeterminate | whether Checkbox is indeterminate or not                                        | `Boolean` | `false`  | -       |
| label         | sets the `aria-label` attribute of the Checkbox and hides the normal label slot | `String`  | -        |         |
| noFocus       | sets the `tabindex` of the Checkbox to `-1`, preventing tab focus               | `Boolean` | `false`  | -       |

### Events

- `update:modelValue` - emits new value (`true`, `false` or `undefined`). Undefined is only emitted when using indeterminate state
- `click` - emits underlying click event
- `keydown` - emits underlying keydown event
- `indeterminate` - emits new value

### Slots

- `default` - contents will be placed in a label for the Checkbox

### data-ref-id

- `feather-checkbox` - selects the Checkbox control. Responds to click and keydown events
- `feather-checkbox-label` - selects the Checkbox label

## CheckboxGroup

### Props

| Name     | Description                                           | Type      | Required | Default |
| -------- | ----------------------------------------------------- | --------- | -------- | ------- |
| label    | label for the Checkbox group                          | `String`  | `true`   | -       |
| hint     | hint text to be displayed below the group             | `String`  | `false`  | -       |
| error    | error text to be displayed below the group            | `String`  | `false`  | -       |
| vertical | when true will put Radio buttons in a vertical layout | `Boolean` | `false`  | `false` |

### Slots

- `default` - the Checkboxes to be used in the group

### data-ref-ids

- `feather-checkbox-group` - selects the wrapper div for the group

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component root container `div`. All other attributes are passed to the `input` where it makes sense. Some will be ignored if they conflict with attributes we need to use for accessibility.

