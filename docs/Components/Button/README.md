---
title: "Button"
lang: en-US
pre: "@featherds/button"
tags: ["Button", "component"]
layout: ComponentLayout
---

## Examples

<Button-Examples />

## FeatherButton

### Props

| Name      | Description                                                                                                               | Type      | Required | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| primary   | applies the primary styling to the button.                                                                                | `Boolean` | `false`  | -       |
| secondary | applies the secondary styling to the button.                                                                              | `Boolean` | `false`  | -       |
| text      | applies the text-only styling to the button.                                                                              | `Boolean` | `false`  | -       |
| icon      | should be set to the label to be given to the icon. This option restricts the size of the button so only an icon can fit. | `String`  | `false`  | -       |
| fab       | applies necessary FAB styling with true.                                                                                  | `Boolean` | `false`  | -       |
| disabled  | applies the disabled styling to the button. Note button can still be interacted with as a normal button.                  | `Boolean` | `false`  | -       |
| asAnchor  | when true will use an `anchor` element instead of a button. This allows you to set the `href` attribute.                  | `Boolean` | `false`  | -       |

### Events

- `click` emitted when button is clicked funny old thing. Though if button is disabled then `disabled-click` is emitted.
- `disabled-click` emitted when button is clicked and disabled.

### Slots

- `default` content of the button. Place text in here or an icon when `icon` property is set.
- `icon` icon to be displayed alongside the text content of default. It is a separate slot so we can ensure correct spacing.

## Icons in Buttons

When using an icon alongside text you should **always** mark the icon as `aria-hidden="true"`. You may also notice that sometimes the text and icon are out of alignment. Unfortunately due to the different aspect ratios of some of our icons this will happen. Please use the following technique to adjust the vertical align.

```html
<style>
  .backup-button svg {
    margin-bottom: 3px;
  }
</style>

<FeatherButton :disabled="disabled" primary type="submit">
  <FeatherIcon slot="icon" :icon="backup" aria-hidden="true" focusable="false">
  </FeatherIcon>
  Submit Primary Button
</FeatherButton>
```
