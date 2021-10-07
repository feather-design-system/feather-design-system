---
title: "Checkbox"
lang: en-US
tags: ["Checkbox", "component"]
layout: ComponentLayout
---


`@featherds/checkbox`

## FeatherCheckbox

### Simple example

This is the basic usecase for a checkbox

@@@ Checkbox-ExampleFeatherCheckbox

### Indeterminate example

This example show cases how to use the indeterminate state for a tree like structure.

@@@ Checkbox-ExampleIndeterminate

### Inline example

This example shows how to use a checkbox that doesn't need a visibile label. This can be useful when displaying a checkbox in a table.

@@@ Checkbox-ExampleInline


### Props

| Name          | Description                                                                      | Type      | Required | Default |
| ------------- | -------------------------------------------------------------------------------- | --------- | -------- | ------- |
| disabled      | will disabled the control when true.                                             | `Boolean` | `false`  | -       |
| modelValue    | whether checkbox is checked or not.                                              | `Boolean` | `false`  | -       |
| indeterminate | whether checkbox is indeterminate or not.                                        | `Boolean` | `false`  | -       |
| label         | sets the `aria-label` attribute of the checkbox and hides the normal label slot. | `String`  | -        |
| noFocus       | sets the `tabindex` of the checkbox to `-1`.                                     | `Boolean` | `false`  | -       |

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

### Default Layout

@@@ Checkbox-ExampleCheckboxGroup

### Vertical Layout

@@@ Checkbox-ExampleCheckboxGroupVertical


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
| default | should be FeatherCheckboxes to be used in group. |

### data-ref-ids

- `feather-checkbox-group` group element

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
