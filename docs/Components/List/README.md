---
title: "List"
pre: "@featherds/list"
lang: en-US
tags: ["List", "component"]
layout: ComponentLayout
---

## Design

:::warning WARNING

These components does not provide any keyboard functionality or accessibility standard. That needs to applied based on the usecase.

:::

## Examples

<List-Examples />

## FeatherList

### Slots

- `default` - place `FeatherListItem`, `FeatherListSwitch`, `FeatherListHeader` and `FeatherListSeparator` here.

## FeatherListItem

Creates a feather styled list. Can be used to create an interactive list (`li` > `a`, default) or a static list (`li`, see `as-li` prop).

### Props

| Name        | Description                                                                                                   | Type      | Required | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| asLi        | when true will not render the `anchor` tag. Use with caution as you will not be responsible for navigation .  | `Boolean` | `false`  | `false` |
| disabled    | when true will render disabled item                                                                           | `Boolean` | `false`  | `false` |
| selected    | when true will style the item in the Feather selected state.                                                  | `Boolean` | `false`  | `false` |
| highlighted | when true will highligh the item. This is mainly used for keyboard navigation. (See autocomplete for example) | `Boolean` | `false`  | `false` |

### Slots

- `default` - main content of the item.
- `icon` - left aligned icons should be placed here.
- `post` - content to appear fixed to the end of the item

## FeatherListSwitch

### Props

| Name       | Description                         | Type      | Required | Default |
| ---------- | ----------------------------------- | --------- | -------- | ------- |
| disabled   | when true will render disabled item | `Boolean` | `false`  | `false` |
| modelValue | when true, switch will be selected  | `Boolean` | `false`  | `false` |

### Slots

- `default` - main content of the item.
- `icon` - left aligned icons should be placed here.

### Events

- `update:modelValue` called when modelValue is updated.

## FeatherListHeader

A styled header to be used in a list.

### Slots

- `default` - main content of the item.

## FeatherListSeparator

Used to provide separation in a list.
