---
title: "Badge"
pre: "@featherds/badge"
description: "Badges are small status descriptors for UI elements."
lang: en-US
tags: ["Badge", "component"]
menu: components
---

## Design

Badges have been designed with a similar look and feel to mobile operating system badges used to show status in application icon grids and status bars. Badges are meant to be minimal but impactful, providing a high-level status indication to a user. Feather design makes use of two distinct badge shapes: the circle badge which is meant to act as a general notification, informing the user that a change has taken place at a child level, and the diamond badge, which indicates an error or warning that exists at a child level.

## Badge (dot)

### Design

Badges should be used to indicate a state change that has occurred at a lower level of the application hierarchy. This is based on the notification paradigm employed in mobile phone platforms that has proliferated across modern human interface domains. Badges should only be used when the notification of a low-level state change will provide a benefit to the user.

### Badge Configuration

The `badges` property is configured using an `Object` or `Object[]`. An `Object` must have the following two properties:

- `type` - what type of badge to display. See [Types](#types) section
- `title` - should be a string describing why the badge is appearing

The following is a `badges` example:

```js
const error = {
  type: BadgeTypes.error,
  title: "Error has occurred",
};
const info = {
  type: BadgeTypes.info,
  title: "Issue has occurred",
};

const badges = [error, info];
```

### Types

Currently there are only two types supported, `info` and `error`. You may only have 1 of each type of badge at any given time.

```js
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
const error = {
  type: BadgeTypes.error,
  title: "Error has occurred",
};
const info = {
  type: BadgeTypes.info,
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

- `default` - should contain content to have the badge applied to it

## TextBadge

### Design

Text badges are used when context-specific notifications must be presented to a user. Text badges generally indicate the state of an element, component or sub-component. Text badges should always be positioned to the right of the most prominent text associated with the component, sub-component or element. Visually, the badge should seem as though it sits at the top level of the hierarchy.

### Badge Configuration

The `type` property is configured using a `String`. The `String` must be from [types](#types).

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

- `default` - should contain the text of the badge
