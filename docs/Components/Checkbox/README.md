---
title: "Checkbox"
pre: "@featherds/checkbox"
description: "Checkboxes are ideal for selection of items or indication of state"
lang: en-US
tags: ["Checkbox", "component"]
layout: ComponentLayout
---

## Design

WIP

## Examples

<Checkbox-Examples />

## Usage

Checkboxes are used when a user must make a selection from one or more options in a list of information. Checkboxes can be used as binary controls, allowing users to toggle specific options or functions. Indeterminate checkboxes can be used to present a parent object in a list of child check boxes.

## FeatherCheckbox

### Props

| Name          | Description                                                                      | Type      | Required | Default |
| ------------- | -------------------------------------------------------------------------------- | --------- | -------- | ------- |
| disabled      | will disable the control when true.                                              | `Boolean` | `false`  | -       |
| modelValue    | whether checkbox is checked or not.                                              | `Boolean` | `false`  | -       |
| indeterminate | whether checkbox is indeterminate or not.                                        | `Boolean` | `false`  | -       |
| label         | sets the `aria-label` attribute of the checkbox and hides the normal label slot. | `String`  | -        |         |
| noFocus       | sets the `tabindex` of the checkbox to `-1`, preventing tab focus                | `Boolean` | `false`  | -       |

### Events

| Name              | Description                                                                                           | Properties               |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------------------ |
| update:modelValue | emits new value (true, false or undefined). Undefined is only emitted when using indeterminate state. | `Boolean` or `undefined` |
| click             | emits underlying click event                                                                          | `{Event}`                |
| keydown           | emits underlying keydown event                                                                        | `{Event}`                |
| indeterminate     | emits new value                                                                                       | `Boolean`                |

### Slots

| Name    | Description                                          | Default Slot Content |
| ------- | ---------------------------------------------------- | -------------------- |
| default | contents will be placed in a label for the checkbox. | -                    |

### data-ref-id

- `feather-checkbox` selects the checkbox control. Responds to click and keydown events.
- `feather-checkbox-label` selects the checkbox label.

## FeatherCheckboxGroup

### Props

| Name     | Description                                           | Type      | Required | Default |
| -------- | ----------------------------------------------------- | --------- | -------- | ------- |
| label    | Label for the checkbox group                          | `String`  | `true`   | -       |
| hint     | Hint text to be displayed below the group             | `String`  | `false`  | -       |
| error    | Error text to be displayed below the group            | `String`  | `false`  | -       |
| vertical | When true will put radio buttons in a vertical layout | `Boolean` | `false`  | `false` |

### Slots

| Name    | Description                                      |
| ------- | ------------------------------------------------ |
| default | The FeatherCheckboxes to be used in the group.   |

### data-ref-ids

- `feather-checkbox-group` selects the wrapper div for the group

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component root container `div`. All other attributes are passed to the `input` where it makes sense. Some will be ignored if they conflict with attributes we need to use for accessibility.

