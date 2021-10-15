---
title: "Input"
lang: en-US
tags: ["Input", "component"]
layout: ComponentLayout
---

`@featherds/input`

## Examples

<Input-Examples />

## FeatherInput

### Props

| Name       | Description                                                                                       | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------------------- | --------- | -------- | ------------ |
| modelValue | Value to be placed in the input                                                                   | `String`  | `false`  | -            |
| label      | Text label for the input                                                                          | `String`  | `true`   | -            |
| hint       | Hint text to be displayed below the input                                                         | `String`  | `false`  | -            |
| error      | Error text to be displayed below the input                                                        | `String`  | `false`  | -            |
| clear      | Label for the clear link that will appear at the end of the input when this has a value.          | `String`  | `false`  | `""`         |
| type       | Type of underlying input                                                                          | `String`  | `false`  | `"text"`     |
| background | Sets the label background color to `$background`. Use this if control is on a background surface. | `Boolean` | `false`  | `false`      |
| disabled   | Puts the input into a disabled state                                                              | `Boolean` | `false`  | `false`      |
| maxlength  | Maximum amount of characters this input will accept                                               | `Number`  | `false`  | 0 - no limit |
| hideLabel  | Hides the label for the input in scenarios like tables where it would get in the way              | `Boolean` | `false`  | -            |

### Events

- `update:modelValue` - emitted when there is a new value.

### Slots

- `pre` content will appear before the input but inside the border. Should only be used for icons.
- `post` content will appear after the input but inside the border. Should only be used for icons.

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
