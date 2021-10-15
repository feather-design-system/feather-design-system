---
title: "Badge"
lang: en-US
tags: ["Badge", "component"]

layout: ComponentLayout
---

`@featherds/badge`

## FeatherBadge

### Badge Configuration

The `badges` property is configured using an `Object` or `Object[]`. An `Object` must have the following two properties:

- `type` - what type of badge to display. See [Types](#types) section.
- `title` - should be a string describing why the badge is appearing.

The following is a `badges` example:

```js
const error = {
  type: TYPES.ERROR,
  title: "Error has occurred",
};
const info = {
  type: TYPES.INFO,
  title: "Issue has occurred",
};

const badges = [error, info];
```

### Types

Currently there are only two types supported, `INFO` and `ERROR`. You may only have 1 of each type of badge at any given time.

```js
import { FeatherBadge, TYPES } from "@featherds/badge";
const error = {
  type: TYPES.ERROR,
  title: "Error has occurred",
};
const info = {
  type: TYPES.INFO,
  title: "Issue has occurred",
};
```

### Positioning

The default position of a badge is the top right. Use the `inline` property to make it appear at the end of the `default` slot. We use `flexbox` to align the slot contents with the badge along the center line.

### Examples

<Badge-Examples />

### Props

| Name   | Description                                                                           | Type                   | Required | Default |
| ------ | ------------------------------------------------------------------------------------- | ---------------------- | -------- | ------- |
| badges | configure what badges to display. See the [Badge Configuration](#badge-configuration) | `Object` or `Object[]` | `true`   | -       |
| inline | when `true` will position badges inline                                               | `Boolean`              | `false`  | `false` |

### Slots

- `default` - should contain content to have the badge applied to it.

## FeatherTextBadge

### Badge Configuration

The `type` property is configured using an `String`. The `String` must be from [types](#types).

### Types

Currently there are only two types supported, `INFO` and `ERROR`. You may only have 1 of each type of badge at any given time.

```js
import { FeatherTextBadge, TYPES } from "@featherds/badge";
```

### Example

<Badge-TextExamples />

### Props

| Name | Description                                                                          | Type     | Required | Default |
| ---- | ------------------------------------------------------------------------------------ | -------- | -------- | ------- |
| type | configure what badge to display. See the [Badge Configuration](#badge-configuration) | `String` | `true`   | -       |

### Slots

- `default` - should contain the text of the badge.
