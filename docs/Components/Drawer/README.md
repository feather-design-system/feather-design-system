---
title: "Drawer"
lang: en-US
tags: ["Drawer", "component"]
layout: ComponentLayout

---

`@featherds/drawer`

### Getting Started

You **must** configure the `labels` property to have a relevant title. See [Labels](#labels).


### Basic drawers

These are simple examples of just using the drawer component alone

@@@ Drawer-ExampleFeatherDrawer

### Fully completed drawer with menus and tabs

This example includes everything

@@@ Drawer-ExampleFeatherDrawerComplete

## FeatherDrawer

### Props

| Name       | Description                                                                                                                           | Type      | Required | Default                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue | use `v-model` to set modelValue property. This controls whether the drawer is visible or not.                                         | `Boolean` | -        | `false`                       |
| width      | can have value `"auto"` or must end with a `px,%,em,vw`. Controls the width of the drawer.                                            | `String`  | -        | `"auto"`                      |
| labels     | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |
| left       | When true drawer will appear to the left of the window.                                                                               | `Boolean` | -        | `false`                       |

### Labels

Text labels for autocomplete can be customized via the `labels` property. The default `labels` values are:

```js
{
  title: "REQUIRED",
  close: "Close Dialog"
}
```

`title` **MUST** be set to an appropriate value.

### Events

- `update:modelValue` uses this to trigger update to `v-model`.
- `shown` triggered after drawer has finished showing itself.
- `hidden` triggered after drawer has finished hiding itself.

### Slots

- `default` content that is displayed inside the drawer.

### data-ref-ids

- `feather-drawer` main drawer div.

## DrawerTabContainer

A wrapper component for encapsulating the content of drawers in tabs. This expects `DrawerTab` and `DrawerTabContent` components in the `tabs` and `default` slots respectively.



### Props

| Name       | Description           | Type     | Required | Default |
| ---------- | --------------------- | -------- | -------- | ------- |
| modelValue | index of selected tab | `Number` | `false`  | -       |

### Events

| Name              | Description                                                                   | Properties |
| ----------------- | ----------------------------------------------------------------------------- | ---------- |
| update:modelValue | emitted when a tab is selected. Is given the index of the newly selected tab. | `Number`   |

### Slots

| Name    | Description                                                                                                                          | Content |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| default | tab content should be placed here. i.e. `tab-content` elements. **ORDER IS IMPORTANT** it should match the tab order in `tabs` slot. | -       |
| tabs    | tabs should be placed here. i.e. `TabMixin` elements. **ORDER IS IMPORTANT** it should match the tab order in `default` slot.        | -       |

## DrawerTab

A tab component, designed to be used in the `tabs` slot of a `DrawerTabContainer`. Takes a label prop which defines the slideout text.


### Props

| Name      | Description                             | Type      | Required   | Default     |
| --------- | --------------------------------------- | --------- | ---------- | ----------- |
| contentId | id of the content that the tab controls | `String`  | `false`    | -           |
| tabId     | id tab                                  | `String`  | `false`    | -           |
| disabled  | `true` when the tab is disabled         | `Boolean` | `false`    | `false`     |
| label     | label for icon and slide out text.      | `String`  | `required` | `undefined` |


### Slots

| Name    | Description                                             | Default Slot Content |
| ------- | ------------------------------------------------------- | -------------------- |
| default | content to be placed inside the tab. Typically an icon. | -                    |


## DrawerContent

A wrapper for tab content, designed to be used in the `default` slot of a `DrawerTabContainer`. Takes a header title either through the `label` prop or through the `header` slot.

### Props

| Name      | Description                                                                                    | Type      | Required | Default |
| --------- | ---------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| header    | text that will be displayed as the header of the content aea unless the `header` slot is used. | `String`  | `false`  | -       |
| contentId | id of the content that the tab controls                                                        | `String`  | `false`  | -       |
| tabId     | id tab                                                                                         | `String`  | `false`  | -       |
| disabled  | true when the tab is disabled                                                                  | `Boolean` | `false`  | `false` |

### Slots

| Name    | Description                                                        | Content |
| ------- | ------------------------------------------------------------------ | ------- |
| default | slot gets loaded as the content of the tab. Underneath the header. | -       |
| header  | slot gets loaded in the header area regardless of `header` prop.   | -       |

## DrawerTabSeparator

A simple presentational separator, designed to be used in the `tabs` slot of a `DrawerTabContainer`.
