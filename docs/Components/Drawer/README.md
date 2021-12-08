---
title: "Drawer"
pre: "@featherds/drawer"
description: "Used to provide relevant information or simple tasks on top of one or more pages in an application."
lang: en-US
tags: ["Drawer", "component"]
menu: components
---

## Design

Drawers consist of a background overlay (scrim), a surface, a header, an optional close icon and main content, which can consist of a variety of controls and text styles. Examples include text blocks, Menus, Checkboxes and Radio buttons.

## Examples

<Drawer-Examples />

## Usage

Drawers are used to provide a user with additional information or allow the user to perform simple tasks while never fully leaving the page. Drawer size can vary depending on the content needed but generally cover 40-60% of the page. A Drawer is placed on top of the existing page usually on the right, but they can exist on top or below. Drawers can be used for smaller forms or tasks with fewer than 5 form fields.

## Drawer

### Getting Started

You **must** configure the `labels` property to have a relevant title. See [Labels](#labels).

### Props

| Name       | Description                                                                                                                             | Type      | Required | Default                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue | use `v-model` to set modelValue property. This controls whether the Drawer is visible or not                                            | `Boolean` | -        | `false`                       |
| width      | can have value `"auto"` or must end with a `px,%,em,vw`. Controls the width of the Drawer                                               | `String`  | -        | `"auto"`                      |
| labels     | `Object` containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |
| left       | When true Drawer will appear to the left of the window                                                                                  | `Boolean` | -        | `false`                       |

### Labels

Text labels for Drawer can be customized via the `labels` property. The default `labels` values are:

```js
{
  title: "REQUIRED",
  close: "Close Drawer"
}
```

`title` **MUST** be set to an appropriate value.

### Events

- `update:modelValue` - uses this to trigger update to `v-model`
- `shown` - triggered after Drawer has finished showing itself
- `hidden` - triggered after Drawer has finished hiding itself

### Slots

- `default` - content that is displayed inside the Drawer

### data-ref-ids

- `feather-drawer` - main Drawer div

## DrawerTabContainer

A wrapper component for encapsulating the content of Drawers in tabs. This expects `DrawerTab` and `DrawerTabContent` components in the `tabs` and `default` slots respectively.

### Props

| Name       | Description           | Type     | Required | Default |
| ---------- | --------------------- | -------- | -------- | ------- |
| modelValue | index of selected tab | `Number` | `false`  | -       |

### Events

- `update:modelValue` - emitted when a tab is selected. Is given the index of the newly selected tab

### Slots

- `default` - tab content should be placed here. i.e. `tab-content` elements. **ORDER IS IMPORTANT** it should match the tab order in `tabs` slot
- `tabs` - tabs should be placed here. i.e. `TabMixin` elements. **ORDER IS IMPORTANT** it should match the tab order in `default` slot

## DrawerTab

A tab component, designed to be used in the `tabs` slot of a `DrawerTabContainer`. Takes a label prop which defines the slideout text.

### Props

| Name      | Description                             | Type      | Required   | Default     |
| --------- | --------------------------------------- | --------- | ---------- | ----------- |
| contentId | ID of the content that the tab controls | `String`  | `false`    | -           |
| tabId     | ID of the tab                           | `String`  | `false`    | -           |
| disabled  | `true` when the tab is disabled         | `Boolean` | `false`    | `false`     |
| label     | label for icon and slide out text       | `String`  | `required` | `undefined` |

### Slots

- `default` - content to be placed inside the tab, typically an [Icon](/components/icon)

## DrawerContent

A wrapper for Tab Content, designed to be used in the `default` slot of a `DrawerTabContainer`. Takes a header title either through the `label` prop or through the `header` slot.

### Props

| Name      | Description                                                                                   | Type      | Required | Default |
| --------- | --------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| header    | text that will be displayed as the header of the content aea unless the `header` slot is used | `String`  | `false`  | -       |
| contentId | id of the content that the tab controls                                                       | `String`  | `false`  | -       |
| tabId     | id tab                                                                                        | `String`  | `false`  | -       |
| disabled  | true when the tab is disabled                                                                 | `Boolean` | `false`  | `false` |

### Slots

- `default` - slot gets loaded as the content of the tab. Underneath the header
- `header` - slot gets loaded in the header area regardless of `header` prop

## DrawerTabSeparator

A simple presentational separator, designed to be used in the `tabs` slot of a `DrawerTabContainer`.
