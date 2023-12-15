---
title: "Elevation"
pre: "NOT USED"
npm: "@featherds/styles"
description: "Helps define heirarchy through a sense of depth."
lang: en-US
tags: ["Elevation", "component"]
menu: components
---

:::warning NOTE
Generally you should not have to use Elevation directly unless you are creating custom components or objects
:::

## Design

Elevation is a method of establishing visual hierarchy in a layout using the perception of depth. Feather DS utilizes Google Material Design across components to show relationships based on the shadows certain objects cast on other objects and their environment.

## Examples

`@featherds/styles` has predefined elevation mixins that allow you to define an elevation to an element. The mixin is exposed through `@featherds/styles/mixins/elevation` and takes one of the following numbers as a parameter: `0, 1, 2, 3, 4, 6, 8, 12, 16, 24`

<Styles-ElevationMixin />
