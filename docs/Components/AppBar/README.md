---
title: "AppBar"
pre: "@featherds/app-bar"
description: "The app bar is anchored to the top of the application window and provides screen-specific information and actions to the user. The app bar is also a prime location for brand and product identity. This is where company logos and product names are typically displayed."
lang: en-US
tags: ["AppBar", "component"]
layout: ComponentLayout
---

## Design

## Example

<AppBar-Examples/>

## Usage

App bars are used on all applications at the highest level of hierarchy. The app bar can serve as the top level of navigation in an application through the use of a “menu” button and can become a “contextual” app bar to better serve user needs based on required functionality for a given application context.

## FeatherAppBar

This component is responsible for the header layout and positioning. `FeatherAppBarLink` and `FeatherAppBarButton` can be placed in it's slots to achieve the desired layout.

### Props

| Name       | Description                                                                          | Type      | Required | Default |
| ---------- | ------------------------------------------------------------------------------------ | --------- | -------- | ------- |
| content    | ID of the main content of the page. Needed for accessibility.                        | `String`  | `true`   | -       |
| labels     | Object containing labels used by this component. See [Labels](#labels) example       | `Object`  | `true`   | -       |
| fulLWidth  | When `true` the header content will take up the fullWidth                            | `Boolean` | `false`  | -       |
| scrollHide | When `true` the header will hide when scrolling down and reappear if user scrolls up | `Boolean` | `false`  | -       |

### Labels

```js
{
  skip: "REQUIRED",
  expand: "Click to expand",
}
```

### Slots

- `left` this slot should be used for the product logo. `FeatherAppBarLink` as `home` type should be used.
- `right` this slot puts content to the right of the app bar.
- `center` this slot puts contentin the center of the app bar.

## FeatherAppBarLink

`FeatherAppBarLink` provides link functionality in the header. Currently we only support the use of icons in this component. `round` icons will be the most frequently used. The `home` configuration is largely used for brand icons that would link to the home page.

### Props

| Name  | Description                               | Type     | Required | Default |
| ----- | ----------------------------------------- | -------- | -------- | ------- |
| icon  | icon to be displayed.                     | `Object` | `true`   | -       |
| title | title of the icon.                        | `String` | `true`   | -       |
| url   | location for navigating to.               | `String` | `true`   | -       |
| type  | type of link to render. `round` or `home` | `String` | `false`  | `round` |
