---
title: "Snackbar"
pre: "@featherds/snackbar"
description: "A small, self-dismissing message container for displaying transient information that does not require user interaction."
lang: en-US
tags: ["Snackbar", "component"]
menu: components
---

## Design

Snackbars are designed to provide information to users at a glance without limiting application functionality. Snackbars are self-dismissing, and should be considered a ‘low priority’ status notification. Due to the transient nature of these messages, the design has been optimized to boost contrast, helping to ensure that the message can be acknowledged without forcing the user to interact.

## Examples

<Snackbar-Examples />

## Usage
Snackbars are best used to provide the status of a user-initiated background task. Snackbars may present redundant information to a user, mainly to inspire trust that the application is working as expected. Snackbars may alternatively present messages about the failure or delay of a process as long as it does not require immediate interaction.

## Snackbar

An individual Snackbar works only in the context of the entire viewport. It contains a small message and an optional button. Snackbars will auto-dismiss unless they are either dismissed by the optional button, or `esc` is pressed while they have focus. A Snackbar will cancel the auto-dismiss while it has focus or the user is hovering.

### Props

| Name       | Description                                                                             | Type            | Required | Default     |
| ---------- | --------------------------------------------------------------------------------------- | --------------- | -------- | ----------- |
| modelValue | current value that determines if the snackbar is visible                                | `Boolean`       | `false`  | `false`     |
| center     | when `true`, positions the Snackbar in the center of the containing element             | `Boolean`       | `false`  | `false`     |
| timeout    | time in ms a snackbar remains on the screen before auto-dismissing                      | `Number`        | `false`  | `4000`      |
| error      | when `true`, adds a special color to the Snackbar to indicate an error status           | `Boolean`       | `false`  | `false`     |

### Events

- `update:modelValue` - emits when the Snackbar has been dismissed
- `closed` - emits after the above when the Snackbar has furthermore completely finished its closing animation

### Slots

- `default` - use to insert the main text
- `button` - use to insert the optional button

### data-ref-ids

- `feather-snackbar` - the main Snackbar element
- `feather-snackbar-content` - the wrapper around the text content
- `feather-snackbar-button` - the wrapper around the button slot


## Snackbar Group

A Snackbar Group is simply a container that organises multiple Snackbars and enables them to be queued and optionally placed in a different relative container. Snackbars that are set to visible in a container will be queued automatically and displayed sequentially in order.

### Props

| Name   | Description                                                                                                                                                                                              | Type     | Required | Default |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------- |
| target | an optional DOM selector that determines where the snackbars should be rendered in the DOM. If the target container is `position: relative;` then the Snackbars will be positioned within its boundaries | `String` | `false`  |         |

### Slots

- `default` - use to insert the Snackbars

### data-ref-ids

- `feather-snackbar-group` - the main Snackbar Group element

