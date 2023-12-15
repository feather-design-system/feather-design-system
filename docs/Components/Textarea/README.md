---
title: "Textarea"
pre: ""
npm: "@featherds/textarea"
description: "Provides users with a suitable field size to accommodate more than a single line of text."
lang: en-US
tags: ["Textarea", "component"]
menu: components
---

## Design

The text area consists of all the same general elements that the standard text field contains. The primary difference between the two is the omission of any icons inside the text field container.

## Example

<Textarea-Examples />

## Usage

Text areas should be used on forms, dialogs, background, and foreground surfaces and sometimes on tables. Use a text field area when the user input required may wrap to a second line. Text areas should be wide enough to accommodate at least 40 characters. In some exceedingly rare circumstances, they may be used with as few as 20 characters, but this should be a last resort.

## Textarea

### Props

| Name       | Description                                                                                | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------------ | --------- | -------- | ------------ |
| modelValue | value to be placed in the textarea                                                         | `String`  | `false`  | -            |
| label      | text label for the textarea                                                                | `String`  | `true`   | -            |
| hint       | hint text to be displayed below the textarea                                               | `String`  | `false`  | -            |
| error      | error text to be displayed below the textarea                                              | `String`  | `false`  | -            |
| clear      | label for the clear link that will appear at the end of the textarea when this has a value | `String`  | `false`  | `""`         |
| disabled   | puts the textarea into a disabled state                                                    | `Boolean` | `false`  | `false`      |
| maxlength  | maximum amount of characters this textarea will accept                                     | `Number`  | `false`  | 0 - no limit |
| auto       | when true the textarea will automatically grow                                             | `Boolean` | `false`  | `false`      |
| hideLabel  | hides the label for the input in scenarios like tables where it would get in the way       | `Boolean` | `false`  | -            |
| schema     | a schema for use in validation                                                             | `Object`  | `false`  | -            |

### Events

- `update:modelValue` - emitted when there is a new value

### data-ref-ids

- `feather-textarea-input` - on the `textarea` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-form-element-count` - on the maxlength text element

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.
