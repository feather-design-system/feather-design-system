---
title: "FeatherChip"
pre: "@featherds/chips"
lang: en-US
tags: ["FeatherChip", "component"]
layout: ComponentLayout
---

## Design

Chips are compact components that represent input, attribute, or action. Chips allow users to enter information, make selections, filter content, or trigger actions. While buttons are expected to appear consistently and with familiar calls to action, chips should appear dynamically as a group of multiple interactive elements.

## Examples

<Chips-Examples />

## FeatherChipList

There are 3 fundamental types, specified in the chip list component. All lists can be displayed in `condensed` mode;

### Props

| Name       | Description                                                          | Type      | Required | Default |
| ---------- | -------------------------------------------------------------------- | --------- | -------- | ------- |
| label      | Label for the chips group, directly maps to `aria-label` attribute   | `String`  | `true`   | -       |
| mode       | The type of chips being displayed, can be `list` `radio` or `single` | `String`  | `false`  | `list`  |
| modelValue | Current value selected by the radio group, only used in `radio` mode | `String`  | `false`  | -       |
| condensed  | Toggles the condensed presentation mode                              | `Boolean` | `false`  | `false` |

### Events

- `update:modelValue` - only emitted when `modelValue` is updated in `radio` mode.

### Slots

| Name    | Description                                   |
| ------- | --------------------------------------------- |
| default | should be FeatherChips to be used in the list |

### data-ref-ids

- `feather-chip-list` list element

Use the `data-ref-id` attribute when you need to access the element for E2E testing.

## FeatherChip

### Props

| Name      | Description                                                        | Type      | Required | Default |
| --------- | ------------------------------------------------------------------ | --------- | -------- | ------- |
| disabled  | Changes the chip to disabled mode, no actions can occur            | `String`  | `true`   | -       |
| labels    | Translation labels object                                          | `Object`  | `false`  | -       |
| condensed | Toggles the condensed presentation mode, overridden if set at list | `Boolean` | `false`  | `false` |

### Slots

- `default` The text displayed in the chip
- `icon` Icon to display on the left side if appropriate
