---
title: "Card"
pre: ""
npm: "@featherds/card"
description: "Cards are self-contained UI regions that provide a high-level summary of a single topic."
lang: en-US
tags: ["Card", "component"]
menu: components
---

## Design

Cards are designed to act like a gateway or portal to detailed content around a singular topic. The physical analog for a card is the “trading card” – which usually features an image and/or statistics related to a single subject. Cards make use of outlines or surface boundaries to act as self-contained UI regions that can exist alone or in a group. Cards provide a lot of flexibility when used in UI layouts. If cards don’t contain any buttons, the entire card may act as a click-point, allowing the user to navigate to a dedicated page on the card topic.

## Examples

<Card-Examples />

## Usage

Cards should be used when a user needs a quick, high-level summary of a subject to make a decision about UI interaction. The content of cards should be kept to a minimum, as cards can quickly become overloaded with content due to their flexible nature. If the gestalt principle of “common region” is required to delineate UI content, the “persistent container” layout should be used instead of a card. A persistent container is not a component, but a type of styled primitive with a self-contained layout.

## Card

### Props

| Name     | Description                                                               | Type     | Required | Default |
| -------- | ------------------------------------------------------------------------- | -------- | -------- | ------- |
| title    | title of the card                                                         | `String` | `true `  | ``      |
| subtitle | optional subtitle appears after the optional image                        | `String` | `false`  | ``      |
| href     | converts card into an html anchor tag; cannot be used with `actions` slot | `String` | `false`  | ``      |

### Events

- none

### Slots

- `image` - use to insert an image
- `actions` - use to insert optional button(s)
- `default` - use to display card content

### data-ref-ids

- `feather-card` - the main card element
