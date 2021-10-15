---
title: "ProtectedInput"
lang: en-US
tags: ["ProtectedInput", "component"]
layout: ComponentLayout
---

`@featherds/protected-input`

## Example

<ProtectedInput-Examples />

## FeatherProtectedInput

### Props

| Name       | Description                                                                                                                           | Type      | Required | Default                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue | Value to be placed in the input                                                                                                       | `String`  | `false`  | -                             |
| label      | Text label for the input                                                                                                              | `String`  | `true`   | -                             |
| hint       | Hint text to be displayed below the input                                                                                             | `String`  | `false`  | -                             |
| error      | Error text to be displayed below the input                                                                                            | `String`  | `false`  | -                             |
| background | Sets the label background color to `$background`. Use this if control is on a background surface.                                     | `Boolean` | `false`  | `false`                       |
| disabled   | Puts the input into a disabled state                                                                                                  | `Boolean` | `false`  | `false`                       |
| labels     | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |

### Labels

Text labels for protected input can be customized via the `labels` property. The default `labels` values are:

```js
{
  show: "Show password",
  hide: "Hide password"
};
```

### Events

- `update:modelValue` - emitted when there is a new value.

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-input-password-icon` - on the show password element

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
