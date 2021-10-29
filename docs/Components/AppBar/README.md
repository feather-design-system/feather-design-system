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

### Props

| Name    | Description                                                                    | Type     | Required | Default |
| ------- | ------------------------------------------------------------------------------ | -------- | -------- | ------- |
| content | ID of the main content of the page. Needed for accessibility.                  | `String` | `true`   | -       |
| labels  | Object containing labels used by this component. See [Labels](#labels) example | `Object` | `true`   | -       |

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

## FeatherAppBarButton

### Props

| Name      | Description                         | Type      | Required | Default  |
| --------- | ----------------------------------- | --------- | -------- | -------- |
| selected  | adds class and styles when selected | `Boolean` | `false`  | `false`  |
| expanded  | descriptive text for the button     | `Boolean` | `false`  | `false`  |
| icon      | switches to icon display mode       | `Boolean` | `false`  | `false`  |
| titleText | descriptive text for the button     | `String`  | `false`  | -        |
| popUp     | sets ARIA attributes for popUp mode | `String`  | `false`  | `"menu"` |

### Slots

- `default` - used to insert content into the button

## FeatherAppBarLink

### Props

| Name  | Description                               | Type     | Required | Default |
| ----- | ----------------------------------------- | -------- | -------- | ------- |
| icon  | icon to be displayed.                     | `Object` | `true`   | -       |
| title | title of the icon.                        | `String` | `true`   | -       |
| url   | location for navigating to.               | `String` | `true`   | -       |
| type  | type of link to render. `round` or `home` | `String` | `false`  | `round` |
