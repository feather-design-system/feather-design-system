---
title: "Select"
pre: "@featherds/select"
description: "A dropdown list control that presents the user with a list of options allowing them to select a single option from the menu. "
lang: en-US
tags: ["Select", "component"]
menu: components
---

## Design

The Select component consists of a label, helper text, and input field and a drop-down arrow. The menu consists of a leading icon, a menu item label, and a menu item row.

## Examples

<Select-Examples />

## Usage

Use the select dropdown as a form element where the user can choose one item of more than 5 predefined options.

**When to consider something else:**

A user can choose one option from a set of 2 options

- Instead use [Radio](/Components/Radio/)

A user can choose more than one option

- Instead use [Checkbox](/Components/Checkbox/)

A user has more than 20 predefined options

- Instead use [Autocomplete](/Components/Autocomplete/)

## Select

### Getting Started

#### Item Display Text

It is expected that your select options will be an `Array` of `Object`s. You can therefore specify which property you want to use as display text in the dropdown by setting the `text-prop` to the property name.

For example if you objects is:

```js
const options = [
  {
    id: 1,
    name: "Rik",
  },
];
```

You would configure the `text-prop` to be `name`.

#### Options Menu Height

You can configure the options menu height by setting the height style for `.feather-select-options-list`. Out of the box, the height is configured to allow up to 6 rows before scrolling. We have provided a mixin for you to easily configure the height of the menu.

The following example allows `10` items to be displayed before scrolling.

```scss
@import "@featherds/select/scss/mixins";

.my-component :deep(.feather-select-options-list) {
  @include select-menu-height(10);
}
```

### Props

| Name       | Description                                                                             | Type            | Required | Default     |
| ---------- | --------------------------------------------------------------------------------------- | --------------- | -------- | ----------- |
| label      | label for the select                                                                    | `String`        | `true`   | -           |
| modelValue | current value selected by select                                                        | `Object`        | `false`  | `undefined` |
| text-prop  | property name that is used to get the display text from `value` and `options`           | `String`        | `false`  | `_text`     |
| options    | array of options to display in the dropdown                                             | `Array<Object>` | `false`  | `[]`        |
| error      | error string to display under select                                                    | `String`        | `false`  | -           |
| clear      | label for the clear link that will appear at the end of the input when this has a value | `String`        | `false`  | `""`        |
| hint       | hint string to display under select                                                     | `String`        | `false`  | -           |
| background | sets label background color to `background`                                             | `Boolean`       | `false`  | `false`     |
| hideLabel  | hides the label for the input in scenarios like tables where it would get in the way    | `Boolean`       | `false`  | -           |
| schema     | a schema for use in validation                                                          | `Object`        | `false`  | -           |

### Events

- `update:modelValue` - emits the new object that is selected

### Slots

- `pre` - use to insert an [Icon](/Components/Icon)

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-select-list` - on the list element.

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.
