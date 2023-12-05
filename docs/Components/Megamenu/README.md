---
title: "Megamenu"
pre: ""
npm: "@featherds/megamenu"
description: "An enhanced dropdown type menu but for more complex content."
lang: en-US
tags: ["Megamenu", "component"]
menu: components
---

## Examples

<Megamenu-Examples />

## FeatherMegamenu

Behaves like a dropdown menu except it takes up full width of screen. Typically for use in app-bars.

### Props

| Name      | Description                                                                                                          | Type     | Required | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------- |
| name      | this name is used to populate the large title to the LHS of the mega menu when it is opened                          | `String` | `true`   | -       |
| closeText | text for the close icon                                                                                              | `String` | `true`   | -       |
| role      | determines the role of the content. If there is advanced controls such as `input` can be better to use role `region` | `String` | `false`  | `menu`  |

### Events

- `opened` - triggered when menu is opened
- `closed` - triggered when menu is closed

### Slots

- `default` - content that is put inside the menu, to the right of the menu name. This has a scoped property of open, which will be true when the menu is open and false otherwise
- `button` - the button for opening the menu. This is a scoped slot and is passed two scope params - `open` and `clicked`. `open` is a boolean denoting current state. `clicked` is a method to call that will toggle the state
