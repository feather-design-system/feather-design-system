---
title: "Dialog"
pre: "@featherds/dialog"
description: "Dialogs present additional information or make requests for input."
lang: en-US
tags: ["Dialog", "component"]
menu: components
---

## Design

Our Dialogs allow for the use of both raised and flat button styles within the button bar at the bottom of the dialogs. The more complex workflows of the healthcare space necessitate the use of multiple styles with our buttons in order to communicate the priority of the buttons/functions within our dialogs. For example, the primary action within a dialog may be called out using our primary button style, while lower priority functions such as “Cancel” use our more muted tertiary button styles.

## Examples

<Dialog-Examples />

## Dialog

### Getting Started

You **must** configure the `labels` property to have a relevant title. See [Labels](#labels).

### Props

| Name       | Description                                                                                                                             | Type      | Required | Default                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| v-model    | use to open and close Dialog                                                                                                            | `Boolean` | `true`   | -                             |
| labels     | `Object` containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |
| hide-close | hides the close icon/link in the top right                                                                                              | `Boolean` | -        | `true`                        |
| hide-title | hides the title text. Title text is still needed for accessibility but will not be visually displayed                                   | `Boolean` | `true`   | -                             |
| relative   | when `true` the dialog will appear absolutely positioned against the first `relative` ancestor                                          | `Boolean` | -        | `false`                       |

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

- `update:modelValue` - emitted with false when dialog is closed by ESC key or close button
- `shown` - emitted when the dialog is shown
- `hidden` - emitted when the dialog is hidden

### Slots

- `default` - main content of the dialog should go here. Header is specified via [Labels](#labels)
- `footer` - footer content should be placed in here

### data-ref-ids

- `feather-dialog` - div on modal
- `feather-dialog-header` - header in modal content
- `feather-dialog-footer` - footer in modal content

### Accessibility

During our testing we have found that clicking an item in Safari does not necessarily mean it recieves focus. Therefore, when closing the dialog refocusing the activating element does not function as expected.
