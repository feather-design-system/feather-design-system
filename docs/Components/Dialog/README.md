---
title: "Dialog"
pre: "@featherds/dialog"
description: "Provides easy access to important information and/or limits focus to the interaction required for a user to complete a given task."
lang: en-US
tags: ["Dialog", "component"]
menu: components
---

## Design

Dialogs consist of a scrim/lightbox, an optional header, an optional close button, body content, at least one action button and an optional illustration. For Dialogs that require user action, the tertiary button style should be used by default. Complex workflows or destructive actions may require the use of the primary button style to communicate high priority actions. When Buttons are used on a dialog, they are always found at the bottom of the Dialog surface.

## Examples

<Dialog-Examples />

## Usage

This component appears when the application needs to give the user information in a manner that involves interruption, such as when an error occurs, or the program needs input or decision from the user.

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
