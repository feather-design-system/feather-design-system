---
title: "Toggle Button"
pre: "@featherds/togglebutton"
description: "Allow users to choose one option from a set of mutually exclusive options."
lang: en-US
tags: ["Togglebutton", "component"]
menu: components
---

## Design

The Toggle Button is designed to offer a single choice among two or more options.  Selecting an option in a Toggle Button will deselect other options.  A selection has an immediate effect and does not require the user to save or submit the selection.  A Toggle Button contains options that are clarified with a short label or in some cases an icon only.

## Examples

<Togglebutton-Examples/>

## Usage

The Toggle Button component is useful in situations where a user needs to select one option from a set of mutually exclusive options. This could include selecting a payment method, choosing a shipping option, or selecting a filter option.  Toggle Buttons should be used less often than other buttons and should not be used for page level view switching.

:::dos DO

* Use a Toggle Button to clarify the purpose of the control by using a set of related icons or labels that are clear.
* Use a Toggle Button for region-specific options in your UI.
:::

:::donts DON'T

* Don't use a Toggle Button with long labels or unrelated icons.
* Don't use a Toggle Button for view switching.  Instead use a tab component.
:::

### Props

| Name      | Description                           | Type                    | Required | Default |
| --------- | ------------------------------------- | ----------------------- | -------- | ------- |
| id        | identifier for Toggle Button group    | `string`                | `true`   | none    |
| buttons   | an array of ToggleButtons             | `Array<ToggleButton>`   | `true`   | none    |
| selected  | index of default selected button      | `number`                | `false`  | none    |
| muted     | use a muted color instead of primary  | `boolean`               | `false`  | none    |

### ToggleButton interface

```ts
import { DefineComponent } from "vue";

export interface ToggleButton {
  id: String;
  label?: String;
  icon?: DefineComponent;
  disabled?: boolean;
}
```
