---
title: "Input"
pre: "@featherds/input"
description: "Allows users to enter and edit text."
lang: en-US
tags: ["Input", "component"]
menu: components
---

## Design

Input consists of a label and an input field. Inputs follow a minimal design with stronger visual affordance given when a user is interacting with the field. For example, active state utilizes a strong border around the perimeter of the Input to provide strong contrast if being used within a field set or form. This ensures optimal recognition while respecting the modern push for minimalism.

## Examples

<Input-Examples />

## Usage

Inputs can be used as a singular object in a layout, or they can be paired together to form a “field-set” where information is closely related. For example, a field set might include an Input for ‘first name’ and an Input for ‘last name.’

**Label Guidelines:**

- keep label text descriptive, unambiguous and concise
- be consistent with capitalization of label text (title case or sentence case)
- labels should fit on a single line
- use natural language if necessary (e.g. instead of “Issued by” consider “Which bank issued your card?”)
- asterisks should be used on required fields

**Field Guidelines:**

- keep field sizes consistent within a page
- one field per row unless the fields are closely related (e.g. First Name and Last Name or City, State)
- where appropriate a max field size and character limit should be included

## Input

### Props

| Name       | Description                                                                           | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------- | --------- | -------- | ------------ |
| modelValue | value to be placed in the Input                                                       | `String`  | `false`  | -            |
| label      | text label for the Input                                                              | `String`  | `true`   | -            |
| hint       | hint text to be displayed below the Input                                             | `String`  | `false`  | -            |
| error      | error text to be displayed below the Input                                            | `String`  | `false`  | -            |
| clear      | label for the clear link that will appear at the end of the Input when it has a value | `String`  | `false`  | `""`         |
| type       | type of underlying Input                                                              | `String`  | `false`  | `"text"`     |
| disabled   | puts the Input into a disabled state                                                  | `Boolean` | `false`  | `false`      |
| maxlength  | maximum amount of characters this Input will accept                                   | `Number`  | `false`  | 0 - no limit |
| hideLabel  | hides the label for the Input in scenarios like tables where it would get in the way  | `Boolean` | `false`  | -            |
| id         | an ID that can be will be assigned to the input element                               | `String`  | `false`  | -            |
| schema     | a schema for use in validation                                                        | `Object`  | `false`  | -            |

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

## ValidationHeader

This is an element designed to be used in conjunction with forms using the `yup` validation library. This component displays a list of errors and links to the errored fields which helps in best practices for form validation. Please see the examples in the [Form Validation page](/Guides/FormValidation/#examples)

### Props

| Name      | Description                                                      | Type    | Required | Default |
| --------- | ---------------------------------------------------------------- | ------- | -------- | ------- |
| errorList | an array of yup `ValidationError` objects produced by validation | `Array` | `false`  | `[]`    |

### data-ref-ids

- `feather-validation-header` - the root element
