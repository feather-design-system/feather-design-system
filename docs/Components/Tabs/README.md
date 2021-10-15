---
title: "Tabs"
lang: en-US
tags: ["Tabs", "component"]
layout: ComponentLayout
---

`@featherds/tabs`

## Example

<Tabs-Examples />

### Tabs Only

There can be a need to have tabs control panels that cannot be directly encapsulated in a `FeatherTabContainer`. For instances like this you can use `FeatherTab` without a corresponding panel with a few caveats.

- You **must** specify the `controls` and `id` attribute on the `FeatherTab`. `controls` should be the ID of the panel it is responsible for.
- You are responsible for showing and hiding the correct panel.
- Panels **must** have correct aria labelling to maintain accessibility. See example below.

## FeatherTabContainer

`FeatherTabContainer` is a container that groups `tabs` and `tab panels`. It binds them together so that clicking a specific tab will reveal the requisite container

### Props

| Name       | Description                                            | Type      | Required | Default |
| ---------- | ------------------------------------------------------ | --------- | -------- | ------- |
| raised     | Raises the tab several pixels if required              | `Boolean` | `false`  | -       |
| modelValue | Can be set if you want to open a different default tab | `Number`  | `false`  | `0`     |
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

`FeatherTab` faciliates tab interactions in various containers, and is re-used for drawer tabs and others. Tabs are hosted in Tab Containers.

### Props

Note that normally, all these props are automatically populated when used inside of a `FeatherTabContainer`. You normally have no need to give these values unless you want to override them.

| Name     | Description                                   | Type      | Required | Default |
| -------- | --------------------------------------------- | --------- | -------- | ------- |
| id       | ID of the element                             | `String`  | `false`  | -       |
| controls | ID of the element this control is influencing | `String`  | `false`  | -       |
| disabled | Toggles the disabled state for this tab       | `Boolean` | `False`  | `False` |

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
