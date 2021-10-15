---
title: "Select"
lang: en-US
tags: ["Select", "component"]
layout: ComponentLayout
---

`@featherds/select`

## Examples

<Select-Examples />

## Getting Started

### Item Display Text

It is expected that your select options will be an Array of Objects. You can therefore specify which property you want to use as display text in the dropdown by setting the `text-prop` to the property name.

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

### Options Menu Height

You can configure the options menu height by setting the height style for `.feather-select-options-list`. Out of the box the height is configured to allow up to 6 rows before scrolling. We have provided a mixin for you to easily configure the height of the menu.

The following example allows `10` items to be displayed before scrolling.

```scss
@import "~@featherds/select/scss/mixins";

.my-component :deep(.feather-select-options-list) {
  @include select-menu-height(10);
}
```

## FeatherSelect

### Props

| Name       | Description                                                                              | Type            | Required | Default     |
| ---------- | ---------------------------------------------------------------------------------------- | --------------- | -------- | ----------- |
| label      | Label for the select                                                                     | `String`        | `true`   | -           |
| modelValue | Current value selected by select                                                         | `Object`        | `false`  | `undefined` |
| text-prop  | Property name that is used to get the display text from `value` and `options`.           | `String`        | `false`  | `_text`     |
| options    | Array of options to display in the dropdown                                              | `Array<Object>` | `false`  | `[]`        |
| error      | Error string to display under select                                                     | `String`        | `false`  | -           |
| clear      | Label for the clear link that will appear at the end of the input when this has a value. | `String`        | `false`  | `""`        |
| hint       | Hint string to display under select                                                      | `String`        | `false`  | -           |
| background | Sets label background color to `background`                                              | `Boolean`       | `false`  | `false`     |
| hideLabel  | Hides the label for the input in scenarios like tables where it would get in the way     | `Boolean`       | `false`  | -           |

### Events

- `update:modelValue` - Emits the new object that is selected.

### Slots

- `pre` - Use to insert a FeatherIcon.

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-select-list` - on the list element.

### Attributes

Specifying an `class` or `data-ref-id` attribute will cause them to be applied to the components root containing `div`. All other attributes are inherited to the `input` were it makes sense. Some will be ignored as they will conflict with some of the attributes we need to use for accessibility.

#### Class

Use the `class` attribute to specify custom spacing needed for the element.

#### data-ref-id

Use the `data-ref-id` attribute when you need to access the element for E2E testing.
