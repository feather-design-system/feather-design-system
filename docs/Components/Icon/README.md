---
title: "Icon"
lang: en-US
pre: "@featherds/icon"
description: "Rich iconography to help make your content engage and inspire."
tags: ["Icon", "component"]
layout: ComponentLayout
---

## Examples

<Icon-Examples />

## Icon

### Props

| Name  | Description                                         | Type      | Required | Default |
| ----- | --------------------------------------------------- | --------- | -------- | ------- |
| icon  | should be Icon componet to be rendered              | `Object`  | `true`   | -       |
| flex  | should be used when Icon is inside a flex container | `Boolean` | `false`  | `false` |
| title | set this when you want to give a label to the Icon  | `String`  | `false`  | -       |

### Accessibility

If you are using an Icon that is described by the text alongside it or the labelling of the Icon is taken care of by a parent control (for example [Button](/Components/Button)) then you don't need to use the `title` property. If there is no text then you must use the `title` property to help describe what the Icon is for.

#### Import

```js
import AddAlert from "@featherds/icon/action/Add";
```

## Icons

<Icon-AllIcons />
