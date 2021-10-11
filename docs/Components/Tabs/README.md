---
title: "Tabs"
pre: "@featherds/tabs"
description: "Tabs provide an easy way for users to navigate through information that shares a common context or theme at the same level of the application hierarchy."
lang: en-US
tags: ["Tabs", "component"]
layout: ComponentLayout
---

## Example

<Tabs-Examples />

## TabContainer

`TabContainer` is a container that groups `tabs` and `tab panels`. It binds them together so that clicking a specific tab will reveal the requisite container

### Props

| Name       | Description                                            | Type      | Required | Default |
| ---------- | ------------------------------------------------------ | --------- | -------- | ------- |
| modelValue | can be set if you want to open a specific tab          | `Number`  | `false`  | `0`     |
| vertical   | toggles vertical rather than default horizontal tabs   | `Boolean` | `False`  | `False` |

### Events

- `update:modelValue` - emitted when the tab has changed - payload is the new selected tab index

### Slots

- `tabs` - slot for the Tab elements
- `default` - slot for the TabPanel elements

## Tab

`Tab` faciliates Tab interactions in various containers and is re-used for drawer tabs and others. Tabs are hosted in Tab Containers.

### Props

Note that normally, all these props are automatically populated when used inside of a `TabContainer`. You normally have no need to give these values unless you want to override them.

| Name     | Description                                   | Type      | Required | Default |
| -------- | --------------------------------------------- | --------- | -------- | ------- |
| id       | ID of the element                             | `String`  | `false`  | -       |
| controls | ID of the element this control is influencing | `String`  | `false`  | -       |
| disabled | toggles the disabled state for this tab       | `Boolean` | `false`  | `False` |

### Slots

- `default` - text displayed inside the tab element

## TabPanel

`TabPanel` is a container for the content of a tab - it is implicitly paired with a tab within a `TabContainer` element

### Props

Note that normally, all these props are automatically populated when used inside of a `TabContainer`. You normally have no need to give these values unless you want to override them.

| Name | Description                                 | Type     | Required | Default |
| ---- | ------------------------------------------- | -------- | -------- | ------- |
| id   | ID of the element                           | `String` | `false`  | -       |
| tab  | ID of the tab element that opens this panel | `String` | `false`  | -       |

### Slots

- `default` - the content displayed for a given tab
