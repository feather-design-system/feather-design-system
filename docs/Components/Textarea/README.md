---
title: "Textarea"
pre: "@featherds/textarea"
description: "A text field area is meant to provide users with a suitable field size to accomodate more than a single line of text."
lang: en-US
tags: ["Textarea", "component"]
menu: components
---

## Example

<Textarea-Examples />

## Usage

Use text field area when a user needs to provide more than a single line of input text.

In general, the height of the text field should be determined based on a number of factors such as context, expected input length and available space.

By default text field areas should be static, providing a scrollbar to users if the text falls outside the bounds of the container.

### When to use

- Use a text field area when the user input required may wrap to a second line
- Text field areas may be found in dialogs and forms often and are sometimes used on surfaces and in tables

### When Not to use

- Text field areas should never be used when the text input is expected to be shorter than 1 line of text
- Never use text field areas where the layout doesn’t support it - text field areas should be wide enough to accomodate at least 40 characters. In some very rare circumstances they may be used with as few as 20 characters, but this should be a last resort
- Text field areas should never be used when the input requires a mask. For example, if a user needs to input a series of phone numbers, a text field area with dash characters should not be used

## Textarea

### Props

| Name       | Description                                                                                      | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------------------ | --------- | -------- | ------------ |
| modelValue | value to be placed in the textarea                                                               | `String`  | `false`  | -            |
| label      | text label for the textarea                                                                      | `String`  | `true`   | -            |
| hint       | hint text to be displayed below the textarea                                                     | `String`  | `false`  | -            |
| error      | error text to be displayed below the textarea                                                    | `String`  | `false`  | -            |
| clear      | label for the clear link that will appear at the end of the textarea when this has a value       | `String`  | `false`  | `""`         |
| background | sets the label background color to `$background`. Use this if control is on a background surface | `Boolean` | `false`  | `false`      |
| disabled   | puts the textarea into a disabled state                                                          | `Boolean` | `false`  | `false`      |
| maxlength  | maximum amount of characters this textarea will accept                                           | `Number`  | `false`  | 0 - no limit |
| auto       | when true the textarea will automatically grow                                                   | `Boolean` | `false`  | `false`      |
| hideLabel  | hides the label for the input in scenarios like tables where it would get in the way             | `Boolean` | `false`  | -            |

### Events

- `update:modelValue` - emitted when there is a new value

### data-ref-ids

- `feather-input` - on the `textarea` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-form-element-count` - on the maxlength text element

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.
