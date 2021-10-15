---
title: "Textarea"
lang: en-US
tags: ["Textarea", "component"]
layout: ComponentLayout
---

`@featherds/textarea`

## Example

<Textarea-Examples />

## FeatherTextarea

### Props

| Name       | Description                                                                                       | Type      | Required | Default      |
| ---------- | ------------------------------------------------------------------------------------------------- | --------- | -------- | ------------ |
| modelValue | Value to be placed in the textarea                                                                | `String`  | `false`  | -            |
| label      | Text label for the textarea                                                                       | `String`  | `true`   | -            |
| hint       | Hint text to be displayed below the textarea                                                      | `String`  | `false`  | -            |
| error      | Error text to be displayed below the textarea                                                     | `String`  | `false`  | -            |
| clear      | Label for the clear link that will appear at the end of the textarea when this has a value.       | `String`  | `false`  | `""`         |
| background | Sets the label background color to `$background`. Use this if control is on a background surface. | `Boolean` | `false`  | `false`      |
| disabled   | Puts the textarea into a disabled state                                                           | `Boolean` | `false`  | `false`      |
| maxlength  | Maximum amount of characters this textarea will accept                                            | `Number`  | `false`  | 0 - no limit |
| auto       | When true the textarea will automatically grow.                                                   | `Boolean` | `false`  | `false`      |
| hideLabel  | Hides the label for the input in scenarios like tables where it would get in the way              | `Boolean` | `false`  | -            |

### Events

- `update:modelValue` - emitted when there is a new value.

### data-ref-ids

- `feather-input` - on the `textarea` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-form-element-count` - on the maxlength text element

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `textarea` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
