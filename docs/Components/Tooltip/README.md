---
title: "Tooltip"
pre: "@featherds/tooltip"
description: "A small content box triggered by hovering or focusing over a certain area."
lang: en-US
tags: ["Tooltip", "component"]
menu: components
---

## Design

A tooltip is a highly contextual form of an overlay. Triggered on hover, tooltips are designed to provide a small amount of additive information within a high contrast background to provide a clear visual indicator to the user. Tooltips also have several options for pointer position depending on where the tooltip is needed and where the trigger falls within viewport.

## Examples

<Tooltip-Examples />

## Usage

A tooltip should be used in scenarios where a user might need additional information to describe an icon or provice a 1-2 sentence description or instruction. If more than 1-2 lines of text is needed, consider providing the information on screen or through a dialog.

### Trigger Scenarios

#### Unlabeled Icons (Most Common)

Additional Information or to define a term that is unique to the product
Text should be semibold to indicate an action and be paired with the “i” icon (16x16) or another relevant icon

### Position Guidelines

Position Tooltips so they don’t block relevant information. Some scenarios, like within a block of text or in a table cell, a tooltip may slightly cover other elements or text. It’s recommended to test your tooltip position to determine which position will provide the least amount of interference to the user’s task.

## Tooltip

### Props

| Name      | Description                                                     | Type               | Required | Default                   |
| --------- | --------------------------------------------------------------- | ------------------ | -------- | ------------------------- |
| title     | text to be displayed in the tooltip                             | `String`           | `true`   | `false`                   |
| placement | determines the placement of the tooltip around the slot content | `TooltipPlacement` | `false`  | `TooltipPlacement.top`    |
| alignment | determines the alignment of the pointer on the tooltip          | `TooltipAlignment` | `false`  | `TooltipAlignment.center` |

### Slots

- `default` - element that the tooltip should appear around

### Types

We expose two enums that you can use to define both `placement` and `alignment` props. You can import those enums alongside the `FeatherTooltip` component.

```js
import {
  FeatherTooltip,
  TooltipAlignment,
  TooltipPlacement,
} from "@featherds/tooltip";
```

`TooltipPlacement` has the following properties:

- `top`, places the tooltip above the triggering element
- `bottom`, places the tooltip below the triggering element
- `left`, places the tooltip to the left of the triggering element
- `right`, places the tooltip to the right of the triggering element

`TooltipAlignment` has the following properties:

- `center`, the pointer will appear in the center of the tooltip content
- `left`, the pointer will appear close to the left side of the tooltip content
- `right`, the pointer will appear close to the right side of the tooltip content
