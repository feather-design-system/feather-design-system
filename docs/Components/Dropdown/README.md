---
title: "Dropdown"
pre: "@featherds/dropdown"
description: "A small container for menus and options."
lang: en-US
tags: ["Dropdown", "component"]
menu: components
---

## Examples

<Dropdown-Examples />

## Dropdown

### Props

| Name       | Description                                         | Type      | Required | Default |
| ---------- | --------------------------------------------------- | --------- | -------- | ------- |
| modelValue | when `true` Dropdown will be open                   | `Boolean` | `false`  | -       |
| cover      | when `true` Dropdown will cover triggering element  | `Boolean` | `false`  | -       |
| right      | when `true` Dropdown will try to align to the right | `Boolean` | `false`  | -       |
| standard   | when `true` Dropdown appear in the standard width   | `Boolean` | `false`  | -       |

### Events

- `update:modelValue` - emitted when modelValue updates

### Slots

- `default` - slot to put Dropdown items in
- `trigger` - slot to put trigger in, typically a button

### Dropdown Menu Height

You can configure the Dropdown menu height by setting the height style for `.feather-dropdown`. Out of the box the height is configured to allow up to `6` rows before scrolling. We have provided a mixin for you to easily configure the height of the menu.

The following example allows `10` items to be displayed before scrolling.

```scss
@import "@featherds/dropdown/scss/mixins";

.my-component :deep(.feather-dropdown) {
  @include dropdown-menu-height(10);
}
```

## DropdownItem

### Props

| Name     | Description                                | Type      | Required | Default |
| -------- | ------------------------------------------ | --------- | -------- | ------- |
| disabled | when `true` dropdown item will be disabled | `Boolean` | `false`  | -       |

### Events

- `update:modelValue` - emitted when modelValue updates

### Slots

- `default` - slot to put text in
- `icon` - slot to put icon in
