---
title: "Spacing"
pre: "Guide"
description: "Help and guidance around spacing, please mind the gap."
lang: en-US
tags: ["Spacing", "component"]
menu: components
---

## Spacing Units

All of our components and spacing variables are defined using the `rem` unit. This allows our UI to grow and shrink based on the users browser default font size whilst maintaining desirably spacing on the page.

## Component Spacing

Components have all their internal spacing already defined and these should not be altered. External spacing for components will not have been defined unless it is to enforce a common pattern, such as two buttons side by side. There are a couple of mechanisms we provide for helping space components;

### Spacing Variables

You can use our spacing variables within SCSS wherever needed. These can be applied to `margin`, `padding` or other spaces as neccessary;

```scss
  $spacing-xxs;
  $spacing-xs;
  $spacing-s;
  $spacing-m;
  $spacing-l;
  $spacing-xl;
  $spacing-xxl;
```

You can use these variables like our other theme variables:

```scss
@import "@featherds/styles/themes/variables";

.component-with-spacing {
  margin-bottom: var($spacing-m);
}
```

### Spacing Classes

We have also provided a number of utility classes, named with the following format `{property}{direction}-{size}`.

`property` can be one of;

- `m` - for setting margin
- `p` - for padding

`direction` can be one of;

- `t` - sets the top
- `b` - bottom
- `l` - left
- `r` - right
- `x` - x-axis, so both left and right
- `y` - y-axis, so both top and bottom
- blank - all 4 sides of the element

`size` can be any of the SCSS variable suffixes;

- xxs
- xs
- s
- m
- l
- xl
- xxl

### Spacing mixin

For just setting default form spacing in common scenarios, you can use the `form-spacing` mixing, as below

```
<style lang="scss" scoped>
@import "@featherds/input-helper/scss/spacing";
form {
  @include form-spacing();
}
</style>
```

## Examples

<Spacing-SpacingExamples />
