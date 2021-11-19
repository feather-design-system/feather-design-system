---
title: "App Bar"
pre: "@featherds/app-bar"
description: "The App Bar is anchored to the top of the application window and provides screen-specific information and actions to the user. The App Bar is also a prime location for brand and product identity. This is where company logos and product names are typically displayed."
lang: en-US
tags: ["AppBar", "App-Bar", "component"]
layout: ComponentLayout
---

## Design

## Example

<AppBar-Examples/>

## Usage

App bars are used on all applications at the highest level of hierarchy. The App Bar can serve as the top level of navigation in an application through the use of a “menu” button and can become a “contextual” App Bar to better serve user needs based on required functionality for a given application context.

## AppBar

This component is responsible for the header layout and positioning. [AppBarLink](#appbarlink) can be placed in its slots to achieve the desired layout.

### Props

| Name       | Description                                                                          | Type      | Required | Default |
| ---------- | ------------------------------------------------------------------------------------ | --------- | -------- | ------- |
| content    | ID of the main content of the page. Needed for accessibility                         | `String`  | `true`   | -       |
| labels     | object containing labels used by this component. See [Labels](#labels) example       | `Object`  | `true`   | -       |
| fullWidth  | when `true` the header content will take up the full width                           | `Boolean` | `false`  | -       |
| scrollHide | when `true` the header will hide when scrolling down and reappear if user scrolls up | `Boolean` | `false`  | -       |

### Labels

```js
{
  skip: "REQUIRED",
  expand: "Click to expand",
}
```

### Slots

- `left` - should be used for the product logo. `AppBarLink` as `home` type should be used
- `center` - used for bespoke scenarios where custom CSS is required for center-alignment or special responsive behaviour
- `right` - puts content to the right of the App Bar

## AppBarLink

`AppBarLink` provides link functionality in the header. Currently we only support the use of icons in this component. `round` icons will be the most frequently used. The `home` configuration is largely used for brand icons that would link to the home page.

### Props

| Name  | Description                               | Type     | Required | Default |
| ----- | ----------------------------------------- | -------- | -------- | ------- |
| icon  | icon to be displayed                      | `Object` | `true`   | -       |
| title | title of the icon                         | `String` | `true`   | -       |
| url   | location for navigating to                | `String` | `true`   | -       |
| type  | type of link to render. `round` or `home` | `String` | `false`  | `round` |
