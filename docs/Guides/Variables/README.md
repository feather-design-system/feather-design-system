---
title: "Variables"
pre: "@featherds/styles"
description: "Powerful theming and customisation."
lang: en-US
tags: ["Variables", "guide"]
menu: guides
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

## On Backgrounds

We have a standard hierarchy of colors that should only be used on certain backgrounds. This restriction provides assurance that accessibility compliance will be achieved when using the variables.

### On Primary/Error/Success

One of the following variables should be used for text color when on a background color of `$primary`, `$error` or `$success`:

- `$primary-text-on-color`
- `$secondary-text-on-color`
- `$disabled-text-on-color`
- `$border-on-color`
- `$border-light-on-color`

### On Surface/Background

One of the following variables should be used for text color when on a background color of `$surface` or `$background`:

- `$primary-text-on-surface`
- `$secondary-text-on-surface`
- `$disabled-text-on-surface`
- `$border-on-surface`
- `$border-light-on-surface`

### On Warning

One of the following variables should be used for text color when on a background color of `$warning`:

- `$primary-text-on-warning`
- `$secondary-text-on-warning`
- `$disabled-text-on-warning`
- `$border-on-warning`
- `$border-light-on-warning`

## Links

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
