---
title: "Variables"
pre: "@featherds/styles"
description: "Powerful theming and customisation"
lang: en-US
tags: ["Variables", "component"]
layout: ComponentLayout
---

`@featherds/styles` exposes SASS variables through `@featherds/styles/themes/variables`. These variables are used to build the themes and used across all the components. They are also exported as CSS variables at runtime.

## Using a variable

To use a variable that is defined as part of a theme, you first need to import the `variables` file into your `scss`. Then you should use the `var` keyword to load the variable for the proerty you want.

```scss
@import "@featherds/styles/themes/variables";

.my-component {
  color: var($primary);
}
```

### Why not use the var directly?

We recommend not using the CSS Variables syntax directly. SCSS doesn't have great support for CSS Variables and wouldn't catch any typos in variable names. By using this technique we provide a level of error-checking through the IDE that the variable does in fact exist and typos are caught at build time.

## Colors

Any time you are using a color you **MUST** use one of these variables.

- `$primary`
- `$primary-variant`
- `$secondary`
- `$secondary-variant`
- `$background`
- `$surface`
- `$error`
- `$success`
- `$warning`

### Shades of Gray

- `$shade-1`
- `$shade-2`
- `$shade-3`
- `$shade-4`

## Text Colors

Any text should have color defined by one of these variables.

### On Primary/Error/Success

- `$primary-text-on-color`
- `$secondary-text-on-color`
- `$disabled-text-on-color`

### On Surface/Background/Warning

- `$primary-text-on-surface`
- `$secondary-text-on-surface`
- `$disabled-text-on-surface`

## Border Colors

- `$border-on-color`
- `$border-light-on-color`
- `$border-on-surface`
- `$border-light-on-surface`
- `$border-on-warning`
- `$border-light-on-warning`

## States

In general, you should not need to use these. They are opacity levels applied over a color/surface to show a different state.

### On Color

- `$state-opacity-hover-on-color`
- `$state-opacity-pressed-on-color`
- `$state-opacity-selected-on-color`
- `$state-opacity-focus-on-color`
- `$state-border-focus-on-color`
- `$state-inner-border-color-focus-on-color`

### On Surface

- `$state-opacity-hover-on-surface`
- `$state-opacity-pressed-on-surface`
- `$state-opacity-selected-on-surface`
- `$state-opacity-focus-on-surface`

### Links

- `$clickable-normal`
- `$clickable-selected`
- `$clickable-visited`

## Typography

Instead of using these variables directly, you should be using the mixins provided. See [Typography](../Typography/) for more details.

- `$root-font-size`
- `$base-font-size`
- `$font-family`
- `$font-light`
- `$font-bold`
- `$font-normal`

## Layout

- `$content-width`
- `$zindex-dropdown`
- `$zindex-sticky`
- `$zindex-fixed`
- `$zindex-modal-backdrop`
- `$zindex-modal`
- `$zindex-popover`
- `$zindex-tooltip`

## Shadows

Instead of using these variables directly you should be using the mixins provided to create elevation. See [Elevation](../Elevation/) for more details.

- `$shadow-1`
- `$shadow-2`
- `$shadow-3`
- `$shadow-4`
- `$shadow-5`
- `$shadow-6`
- `$shadow-7`
- `$shadow-8`
- `$shadow-9`
- `$shadow-10`
- `$shadow-11`
- `$shadow-12`
- `$shadow-13`
- `$shadow-14`
- `$shadow-15`
- `$shadow-16`
- `$shadow-17`
- `$shadow-18`
- `$shadow-19`
- `$shadow-20`
- `$shadow-21`
- `$shadow-22`
- `$shadow-23`
- `$shadow-24`
