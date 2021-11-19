---
title: "Back Button"
pre: "@featherds/back-button"
description: "This is a generic control that will allow the user to go back to a previous page. This is not intended to be a breadcrumb style of navigation, but simply provides a mechanism to return to a logical position within the transaction."
lang: en-US
tags: ["BackButton", "Back-Button", "component"]
layout: ComponentLayout
---

## Design

The Back Button has been designed to provide a persistent control for reverse navigation. The button appears as an outlined button in its default and active states and transforms into a solid contained button with elevation when the user hovers over it to elevate its priority in the layout.

## Example

<BackButton-Examples />

## Usage

## BackButton

### Props

| Name      | Description                                      | Type     | Required | Default |
| --------- | ------------------------------------------------ | -------- | -------- | ------- |
| longHover | number of milliseconds to qualify as long hover  | `Number` | `false`  | `500`   |

### Slots

- `default` text to display
