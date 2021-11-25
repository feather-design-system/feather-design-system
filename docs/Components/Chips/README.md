---
title: "Chips"
pre: "@featherds/chips"
description: "Chips are delicious."
lang: en-US
tags: ["FeatherChip", "component"]
layout: ComponentLayout
---

## Design

Chips are compact components that represent input, attribute, or action. Chips allow users to enter information, make selections, filter content, or trigger actions. While Buttons are expected to appear consistently and with familiar calls to action, Chips should appear dynamically as a group of multiple interactive elements.

## Examples

<Chips-Examples />

## ChipList

There are 3 fundamental types, specified in the Chip List component. All lists can be displayed in `condensed` mode;

### Props

| Name       | Description                                                          | Type      | Required | Default |
| ---------- | -------------------------------------------------------------------- | --------- | -------- | ------- |
| label      | label for the chips group, directly maps to `aria-label` attribute   | `String`  | `true`   | -       |
| mode       | the type of Chips being displayed, can be `list` `radio` or `single` | `String`  | `false`  | `list`  |
| modelValue | current value selected by the radio group, only used in `radio` mode | `String`  | `false`  | -       |
| condensed  | toggles the condensed presentation mode                              | `Boolean` | `false`  | `false` |

### Events

- `update:modelValue` - only emitted when `modelValue` is updated in `radio` mode

### Slots

- `default` - should be Chips to be used in the list

### data-ref-ids

- `feather-chip-list` - list element


## Chip

### Props

| Name      | Description                                                        | Type      | Required | Default |
| --------- | ------------------------------------------------------------------ | --------- | -------- | ------- |
| disabled  | changes the Chip to disabled mode, no actions can occur            | `String`  | `true`   | -       |
| labels    | translation labels object                                          | `Object`  | `false`  | -       |
| condensed | toggles the condensed presentation mode, overridden if set at list | `Boolean` | `false`  | `false` |

### Slots

- `default` - the text displayed in the Chip
- `icon` -  icon to display on the left side if appropriate
