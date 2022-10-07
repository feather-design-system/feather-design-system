---
title: "Popover"
pre: "@featherds/popover"
description: "Popovers are overlays that contain detailed content that is triggered by the user by clicking on its associated element."
lang: en-US
tags: ["Popover", "component"]
menu: components
---

## Design

Popovers are overlays that have a look and feel similar to tooltips, however they are mutually exclusive. Tooltips are very short descriptions and shouldn’t exceed around 3 - 5 words. When the exceeding character limitation conditions are met, popovers should instead be used. Popovers can contain hyperlinks, buttons, media, and other sub-components. Since the primary color is white, an elevation (or drop shadow) is used to distinguish it from the main page.

## Examples
<ClientOnly>
<Popover-Examples />
</ClientOnly>

## Usage

Popovers are overlays that contain rich media and have many different use cases. They may contain interactive elements such as links, buttons, or other sub-components. Popovers serve as base layers for other components such as tooltips, dropdowns, and overflow menus. They should be used sparingly to prevent user cognitive overload. Popovers are used to highlight overflow, notifications, mini profiles, and tool boxes. Popovers should only be initiated when the user triggers the elements associated with it. The popover is to remain on the screen even if the user is idle, until it is user-dismissed by clicking anywhere outside of its container.

## Best Practices

### 1. Show one popover at a time.

Showing many popovers at once can confuse the user, convolute hierarchy, and clutter the interface. Keep one popover to keep the user focused on their task.

### 2. Popovers should only be user initiated

If popovers are open automatically users may find this annoying and intrusive to the tasks they are completing.

### 3. Avoid putting vital information in a popover

Always dispay neccessary information to the user when they are completling a task. Be sure to not include dismiss icons into interactive elements.

### 4. Avoid using a popover to show a warning

Instead, put warnings and other alerts in a modal since people can easily close popovers.

### 5. Avoid nesting popovers

This will disrupt exit flow, add more confusion, frustration, and, increase cognitive load to the user.

### 6. Don’t make popovers too big

Popovers shouldn’t take up the entire or a significant portion of the screen, and it should only be displayed in the place it came from. Limit the maximum dimentions to 274 x 252 pixels.

## Popover

### Props

| Name | Description | Type | Required | Default |
| ---- | ----------- | ---- | -------- | ------- |

| placement | determines the placement of the popover around the slot content | `PopoverPlacement` | `false` | `PopoverPlacement.top` |
| pointer-alignment | determines the alignment of the pointer on the popover | `PointerAlignment` | `false` | `PointerAlignment.center` |

### Slots

- `default` - content that should appear in the popover.
- `trigger` - element that the popover should appear around. This slot is scoped, it provides `attrs` and `on` which should be passed to `v-bind` and `v-on` respectively. See the example.

### Types

We expose two enums that you can use to define both `placement` and `pointer-alignment` props. You can import those enums alongside the `FeatherPopover` component.

```js
import {
  FeatherPopover,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/popover";
```

`PopoverPlacement` has the following properties:

- `top`, places the popover above the triggering element
- `bottom`, places the popover below the triggering element
- `left`, places the popover to the left of the triggering element
- `right`, places the popover to the right of the triggering element

`PointerAlignment` has the following properties:

- `center`, the pointer will appear in the center of the popover content
- `left`, the pointer will appear close to the left side of the popover content
- `right`, the pointer will appear close to the right side of the popover content
