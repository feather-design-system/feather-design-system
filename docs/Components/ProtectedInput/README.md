---
title: "Protected Input"
pre: "@featherds/protected-input"
design: "A variation of the standard text input field but used for discreet and confidential information."
lang: en-US
tags: ["ProtectedInput", "component"]
menu: components
---

## Design

Protected Input consist of a protected text string, a [Input](/Components/Input/) component, and an [Icon Button](/Components/Button/#icon-button) that acts as a toggle between protected and unprotected states. They should inherit all states as well as both internal and external padding specifications from the standard text input field.

## Example

<ProtectedInput-Examples />

## Usage

Used in scenarios where sensitive user information must be entered into a computer interface discreetly. Protected input components should primarily focus on keeping user information private.

## ProtectedInput

### Props

| Name       | Description                                                                                                                           | Type      | Required | Default                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue | Value to be placed in the input                                                                                                       | `String`  | `false`  | -                             |
| label      | Text label for the input                                                                                                              | `String`  | `true`   | -                             |
| hint       | Hint text to be displayed below the input                                                                                             | `String`  | `false`  | -                             |
| error      | Error text to be displayed below the input                                                                                            | `String`  | `false`  | -                             |
| background | Sets the label background color to `$background`. Use this if control is on a background surface                                      | `Boolean` | `false`  | `false`                       |
| disabled   | Puts the input into a disabled state                                                                                                  | `Boolean` | `false`  | `false`                       |
| labels     | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |

### Labels

Text labels for Protected Input can be customized via the `labels` property. The default `labels` values are:

```js
{
  show: "Show password",
  hide: "Hide password"
};
```

### Events

- `update:modelValue` - emitted when there is a new value

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-input-password-icon` - on the show password element

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.
