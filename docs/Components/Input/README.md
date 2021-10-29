---
title: "Input"
pre: "@featherds/input"
description: "Text fields provide a way for users to enter and edit text. Text fields can exist as singular objects in a layout, or they can be paired together to form a “field-set” where users need to enter lots of related information."
lang: en-US
tags: ["Input", "component"]
layout: ComponentLayout
---

## Design

As of now, there is only one type of text field: The outlined text field

The modern design trend with text fields is meant to promote minimalism. It’s very common to see text fields represented as either a shaded volume or an empty volume with a defined bottom border or “stroke” meant to signify the line on which the user will enter information. User testing has shown that users tend to get confused by this as it doesn’t provide a strong enough visual affordance for an interactive text input element. The solution utilizes a border around the perimeter of the text field to draw on design cues from the past -- ensuring optimal recognition, while respecting the modern push for minimalism.

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
