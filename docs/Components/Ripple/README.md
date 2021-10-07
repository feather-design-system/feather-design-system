---
title: "Ripple"
lang: en-US
tags: ["Ripple", "component"]
layout: ComponentLayout

---


`@featherds/ripple`

`FeatherRipple` applies a material style ripple to it's parent element when it is clicked.

## Usage

Color and opacity must be provided by the consuming component. These should always be CSS Variables from our theme.

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

#### In a Button

@@@ Ripple-ExampleButton



### Props

| Name   | Description                                   | Type      | Required | Default |
| ------ | --------------------------------------------- | --------- | -------- | ------- |
| center | will center the ripple on the parent element. | `Boolean` | `false`  | -       |
