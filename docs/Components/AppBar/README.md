---
title: "AppBar"
lang: en-US
tags: ["AppBar", "component"]
layout: ComponentLayout
---

`@featherds/app-bar`

`AppBar` is responsible for the `NantBlue` bar along the top of the page. In order to add icons/drawers/menus to the app bar you will need to add components to the correct slots. The app bar will include a skip to content link needed for accessibility requirements.

## Example

<AppBar-Examples/>

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
