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

## FeatherTabContainer

`FeatherTabContainer` is a container that groups `tabs` and `tab panels`. It binds them together so that clicking a specific tab will reveal the requisite container

### Props

| Name       | Description                                            | Type      | Required | Default |
| ---------- | ------------------------------------------------------ | --------- | -------- | ------- |
| modelValue | Can be set if you want to open a specific tab          | `Number`  | `false`  | `0`     |
| vertical   | Toggles vertical rather than default horizontal tabs   | `Boolean` | `False`  | `False` |

### Events

| Name              | Description                                                              | Properties |
| ----------------- | ------------------------------------------------------------------------ | ---------- |
| update:modelValue | Emitted when the tab has changed - payload is the new selected tab index | `index`    |

### Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| tabs    | Slot for the FeatherTab elements      |
| default | Slot for the FeatherTabPanel elements |

## FeatherTab

`FeatherTab` faciliates tab interactions in various containers and is re-used for drawer tabs and others. Tabs are hosted in Tab Containers.

### Props

Note that normally, all these props are automatically populated when used inside of a `FeatherTabContainer`. You normally have no need to give these values unless you want to override them.

| Name     | Description                                   | Type      | Required | Default |
| -------- | --------------------------------------------- | --------- | -------- | ------- |
| id       | ID of the element                             | `String`  | `false`  | -       |
| controls | ID of the element this control is influencing | `String`  | `false`  | -       |
| disabled | Toggles the disabled state for this tab       | `Boolean` | `false`  | `False` |

### Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | text displayed inside the tab element |

## FeatherTabPanel

`FeatherTabPanel` is a container for the content of a tab - it is implicitly paired with a tab within a `tab container` element

### Props

Note that normally, all these props are automatically populated when used inside of a `FeatherTabContainer`. You normally have no need to give these values unless you want to override them.

| Name | Description                                 | Type     | Required | Default |
| ---- | ------------------------------------------- | -------- | -------- | ------- |
| id   | ID of the element                           | `String` | `false`  | -       |
| tab  | ID of the tab element that opens this panel | `String` | `false`  | -       |

### Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | The content displayed for a given tab |
