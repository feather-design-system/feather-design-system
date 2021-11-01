---
title: "BackButton"
pre: "@featherds/back-button"
description: "This is a generic control that will allow the user to go back to a previous page. This is not intended to be a breadcrumb style of navigation, simply provides a mechanism to return to a logical position within the transaction."
lang: en-US
tags: ["BackButton", "component"]
layout: ComponentLayout
---

## Design

The back button has been designed to provide a persistent control for reverse navigation. The button appears as an outlined button in it’s default, active state and transforms into a solid contained button with elevation when the user hovers over it to elevate it’s priority in the layout.

## Example

<BackButton-Examples />

## Usage

## FeatherBackButton

### Props

| Name      | Description                                      | Type     | Required | Default |
| --------- | ------------------------------------------------ | -------- | -------- | ------- |
| longHover | number of milliseconds to consider a long hover. | `Number` | `false`  | `500`   |

### Slots

- `default` should be text to display.
