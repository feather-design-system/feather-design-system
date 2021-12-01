---
title: "Ripple"
lang: en-US
pre: "@featherds/ripple"
description: "Provides feedback on clickable elements that is both useful and beautiful."
tags: ["Ripple", "component"]
menu: components
---

`Ripple` applies a material style ripple to it's parent element when it is clicked.

## Usage

Color and opacity must be provided by the consuming component. These should always be CSS Variables from a theme.

:::tip NOTE
When using a ripple it will force its direct parent to have `overflow:hidden` in order for it to appear correctly.
:::

### Example

```scss
:deep(.ripple) {
  background-color: var($state-color-on-surface);
  opacity: var($state-opacity-pressed-on-surface);
}
```

### Props

| Name   | Description                                  | Type      | Required | Default |
| ------ | -------------------------------------------- | --------- | -------- | ------- |
| center | will center the ripple on the parent element | `Boolean` | `false`  | -       |
