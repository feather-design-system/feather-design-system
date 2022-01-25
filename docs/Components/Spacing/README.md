---
title: "Spacing"
pre: "Guide"
description: "Help and guidance around spacing, please mind the gap"
lang: en-US
tags: ["Spacing", "component"]
menu: components
---

## Spacing Units

All of our components and spacing variables are defined using the `rem` unit. This allows our UI to grow and shrink based on the users browser default font size whilst maintaining desirably spacing on the page.

## Component Spacing

Components have all their internal spacing already defined and these should not be altered. External spacing for components will not have been defined unless it is to enforce a common pattern, such as two buttons side by side. Whilst the external spacing can be modified, where it has been applied should be a sensible default for most usecases.

## Spacing Variables

When applying spacing between components we strongly recommend utilizing the following theme variables:

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
