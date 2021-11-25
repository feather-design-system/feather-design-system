---
title: "List"
pre: "@featherds/list"
description: "Lists are convenient ways to group data elements."
lang: en-US
tags: ["List", "component"]
layout: ComponentLayout
---

## Design

:::warning WARNING

These components do not provide any keyboard functionality or accessibility features. These needs to applied based on the usecase.

:::

## Examples

<List-Examples />

## FeatherList

### Slots

- `default` - place `ListItem`, `ListSwitch`, `ListHeader` or `ListSeparator` here.

## ListItem

Creates a styled list item. Can be used to create an interactive list (`li` > `a`, default) or a static list (`li`, see `as-li` prop).

### Props

| Name        | Description                                                                                                   | Type      | Required | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| asLi        | when true will not render the `anchor` tag. Use with caution as you will not be responsible for navigation    | `Boolean` | `false`  | `false` |
| disabled    | when true will render disabled item                                                                           | `Boolean` | `false`  | `false` |
| selected    | when true will style the item in the Feather selected state                                                   | `Boolean` | `false`  | `false` |
| highlighted | when true will highligh the item. This is mainly used for keyboard navigation. (See autocomplete for example) | `Boolean` | `false`  | `false` |

### Slots

- `default` - main content of the item
- `icon` - left aligned icons should be placed here
- `post` - content to appear fixed to the end of the item

## ListSwitch

### Props

| Name       | Description                         | Type      | Required | Default |
| ---------- | ----------------------------------- | --------- | -------- | ------- |
| disabled   | when true will render disabled item | `Boolean` | `false`  | `false` |
| modelValue | when true, switch will be selected  | `Boolean` | `false`  | `false` |

### Slots

- `default` - main content of the item
- `icon` - left aligned icons should be placed here

### Events

- `update:modelValue` - called when modelValue is updated

## ListHeader

A styled header to be used in a list.

### Slots

- `default` - main content of the item

## ListSeparator

Used to provide separation in a list.
