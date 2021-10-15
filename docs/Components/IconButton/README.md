---
title: "Icon Button"
lang: en-US
tags: ["Icon Button", "component"]
layout: ComponentLayout
---

`@featherds/button`

## Examples

<IconButton-Examples />

## FeatherIconButton

Icon button is a special configuration of our [FeatherButton](../Button/). It only supports text based styling, if you try and change the type it will be ignored. You should utilize the `icon` property to pass in an appropriate label for the icon button.

### Props

| Name     | Description                                                                                                               | Type      | Required | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| icon     | should be set to the label to be given to the icon. This option restricts the size of the button so only an icon can fit. | `String`  | `false`  | -       |
| disabled | applies the disabled styling to the button. Note button can still be interacted with as a normal button.                  | `Boolean` | `false`  | -       |
| asAnchor | when true will use an `anchor` element instead of a button. This allows you to set the `href` attribute.                  | `Boolean` | `false`  | -       |

### Events

- `click` emitted when button is clicked funny old thing. Though if button is disabled then `disabled-click` is emitted.
- `disabled-click` emitted when button is clicked and disabled.

### Slots

- `icon` icon to be displayed alongside the text content of default. It is a separate slot so we can ensure correct spacing.
