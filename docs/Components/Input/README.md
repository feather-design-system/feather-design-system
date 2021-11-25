---
title: "Input"
pre: "@featherds/input"
description: "Text fields provide a way for users to enter and edit text. They can exist as singular objects in a layout, or they can be paired together to form a 'field-set' where users need to enter lots of related information."
lang: en-US
tags: ["Input", "component"]
layout: ComponentLayout
---

## Design

As of now, there is only one type of text field: The outlined text field.

The modern design trend with text fields is meant to promote minimalism. It’s very common to see text fields represented as either a shaded volume or an empty volume with a defined bottom border or 'stroke' meant to signify the line on which the user will enter information. User testing has shown that users tend to get confused by this as it doesn’t provide a strong enough visual affordance for an interactive text input element. The solution utilizes a border around the perimeter of the text field to draw on design cues from the past - ensuring optimal recognition, while respecting the modern push for minimalism.

## Examples

<Input-Examples />

## Input

### Props

| Name       | Description                                                                                       | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------------------- | --------- | -------- | ------------ |
| modelValue | value to be placed in the Input                                                                   | `String`  | `false`  | -            |
| label      | text label for the Input                                                                          | `String`  | `true`   | -            |
| hint       | hint text to be displayed below the Input                                                         | `String`  | `false`  | -            |
| error      | error text to be displayed below the Input                                                        | `String`  | `false`  | -            |
| clear      | label for the clear link that will appear at the end of the Input when it has a value             | `String`  | `false`  | `""`         |
| type       | type of underlying Input                                                                          | `String`  | `false`  | `"text"`     |
| background | sets the label background color to `$background`. Use this if control is on a background surface  | `Boolean` | `false`  | `false`      |
| disabled   | puts the Input into a disabled state                                                              | `Boolean` | `false`  | `false`      |
| maxlength  | maximum amount of characters this Input will accept                                               | `Number`  | `false`  | 0 - no limit |
| hideLabel  | hides the label for the Input in scenarios like tables where it would get in the way              | `Boolean` | `false`  | -            |

### Events

- `update:modelValue` - emitted when the Input value changes, payload is the new text

### Slots

- `pre` - content will appear before the Input but inside the border. Should only be used for icons
- `post` - content will appear after the Input but inside the border. Should only be used for icons

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-input-count` - on the div that wraps the character count
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the component root container `div`. All other attributes are inherited to the `input` where applicable. Some will be ignored if they conflict with attributes used for accessibility.

