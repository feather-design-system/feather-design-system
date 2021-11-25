---
title: "Navigation Rail"
pre: "@featherds/navigation-rail"
lang: en-US
description: "A side rail for holding navigation elements and related information."
tags: ["NavigationRail", "component"]
layout: ComponentLayout
---

## Design

Provides the ability to select one of multiple navigation paths with each path being represented by an icon. It may be used within another control, such as a drawer, to provide access to all ‘top level’ panels within that drawer without the need to continually open and close it.

Navigation rails should only be used on desktop and tablet devices (not smaller format devices).

## Example

```html
<template>
  <FeatherNavigationRail>
    <div class="user" slot="header">
      <FeatherIcon :icon="account" class="user-icon" />
      <div>
        <p class="sub">Signed in as</p>
        <p class="user-name">Rik</p>
      </div>
    </div>
    <FeatherRailItem slot="main" href="#" :icon="app" title="App One" />
    <FeatherRailItem slot="main" href="#" :icon="app" title="App Two" />
    <FeatherRailItem slot="main" href="#" :icon="app" title="App Three" />
    <FeatherRailGroup label="Help Navigation">
      <FeatherRailItem href="#" :icon="app" title="Feedback" />
      <FeatherRailItem href="#" :icon="app" title="Sign out" />
    </FeatherRailGroup>
  </FeatherNavigationRail>
</template>
<script>
  import {
    FeatherNavigationRail,
    FeatherRailItem,
    FeatherRailGroup,
  } from "@featherds/navigation-rail";

  import App from "@featherds/icon/medical/Hospital";
  import Account from "@featherds/icon/action/AccountCircle";
  import { FeatherIcon } from "@featherds/icon";
  export default {
    computed: {
      app() {
        return App;
      },
      account() {
        return Account;
      },
    },
    components: {
      FeatherNavigationRail,
      FeatherRailItem,
      FeatherRailGroup,
      FeatherIcon,
    },
  };
</script>
```

## NavigationRail

### Getting Started

The `NavigationRail` has 2 states; expanded and collapsed. When expanded all menu items are visible and can be interacted with. When it is collapsed only the `main` group is visible. When using `NavigationRail` please only populate the `main` and `default` slot with `RailGroup` and `RailItem` components.

The `header` content should not exceed `40px` in height.

When collapsed the `NavigationRail` will take up `52px` in width, when expanded it will not move any content on the page due to its `fixed` position. Therefore you don't need to worry about page content shifting.

### Props

| Name       | Description                                                                                                                           | Type      | Required | Default                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue | when `true` menu will be full width                                                                                                   | `Boolean` | `false`  | -                             |
| labels     | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |

### Labels

Text labels for Navigation Rail can be customized via the `labels` property. The default `labels` values are:

```js
{
  main: "Main Navigation",
  expand: "Show full menu"
}
```

### Events

- `update:modelValue` - trigger when a change occurs to `modelValue`

### Slots

- `default` - this is where any menu groups that are not considered part of the `main` group should go. This content will be hidden when collapsed.
- `main` - this is where you should put `RailItem`s that are part of the `main` navigation group. These items will have there icon maintain visibility whilst the menu is collapsed
- `header` - this is where extra content should go that appears to the left of the expand/collapse button. This content will be hidden when collapsed

### data-ref-ids

- `feather-navigation-rail-expand` - button that triggers expand/collapse
- `feather-navigation-rail-main` - nav that contains the main navigation

## RailGroup

### Props

| Name  | Description                         | Type     | Required | Default |
| ----- | ----------------------------------- | -------- | -------- | ------- |
| label | label for the underlying menu group | `string` | `true`   | -       |

### Slots

- `default` - `RailItem`s should be placed here

## RailItem

This item should be used in the `main` slot of [NavigationRail](#NavigationRail) or as a child of [RailGroup](#RailGroup).

### Props

| Name  | Description             | Type     | Required | Default |
| ----- | ----------------------- | -------- | -------- | ------- |
| icon  | icon to be rendered     | `Object` | `false`  | -       |
| href  | href to be used by item | `String` | `true`   | -       |
| title | title of the item       | `String` | `true`   | -       |

### Slots

- `default` - can be used to set the content of the item to something other than `title`
