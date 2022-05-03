---
title: "App Rail"
pre: "@featherds/app-Rail"
description: "The App Rail provides users with persistent access to the top level of application navigation."
lang: en-US
tags: ["AppRail", "component"]
menu: components
---

## Design

The App Rail is designed to take the place of the App Bar component when used. An App Rail provides persistent access to navigation while blocking as little of the application content as possible. In most cases, the App Rail will appear as a thin strip that is anchored to the side of the viewport. Navigation destinations are represented by icons. When users hover over the App Rail, the surface expands to reveal the icon labels. The App Rail surface collapses to the default state when a user leaves the surface area. Since the App Rail takes the place of the App Bar, it should inherit any brand or identity-related styles and assets generally used in the App Bar, such as color, typography and logo imagery.

## Example

<AppRail-Examples/>

## Usage

App Rails should be used in applications where users need frequent access to high level functions from anywhere in the user flow. App rails are best suited to content-heavy interfaces that provide many different top-level functions to users. The App Rail should not be used on mobile devices due to the size constraints. On mobile devices, the App Rail should be replaced with an App Bar and a Drawer, or with Bottom Navigation.

## AppRail

This component is responsible rail that appears to the left hand side. It will be the main container for all content that goes in the rail.

### Props

| Name    | Description                                                                    | Type     | Required | Default |
| ------- | ------------------------------------------------------------------------------ | -------- | -------- | ------- |
| content | ID of the main content of the page. Needed for accessibility                   | `String` | `true`   | -       |
| labels  | object containing labels used by this component. See [Labels](#labels) example | `Object` | `true`   | -       |

### Labels

```js
{
  skip: "REQUIRED",
}
```

### Slots

- `icon` place product icons or the [IconTextAnimate](#icontextanimate) component here.
- `nav` place [FeatherAppRailNavItem](#apprailnavitem) and [FeatherAppRailNavHeader](#apprailnavheader) here to create your navigation list

## AppRailNavItem

Creates a navigation link with expand and collapsed states.

### Props

| Name  | Description                                                                | Type     | Required | Default |
| ----- | -------------------------------------------------------------------------- | -------- | -------- | ------- |
| icon  | icon to be displayed                                                       | `Object` | `true`   | -       |
| href  | location passed to anchor tag                                              | `String` | `true`   | -       |
| title | title of the anchor tag, content of `default` slot if nothing is specified | `String` | `true`   | -       |

### Slots

- `default` content of anchor tag

## AppRailNavHeader

### Props

| Name  | Description                                       | Type     | Required | Default |
| ----- | ------------------------------------------------- | -------- | -------- | ------- |
| title | content of `default` slot if nothing is specified | `String` | `false`  | -       |

### Slots

- `default` content of header component when expanded

## AppHeader

:::warning NOTE
When placing form elements inside the `FeatherAppHeader` please be sure to set the `inline` property to `true`.
:::

### Props

| Name       | Description                                                                          | Type      | Required | Default |
| ---------- | ------------------------------------------------------------------------------------ | --------- | -------- | ------- |
| scrollHide | when `true` the header will hide when scrolling down and reappear if user scrolls up | `Boolean` | `false`  | -       |

### Slots

- `default` content of the app header. Positioning should be detailed in redlines. Currently only [Icon Buttons](../Button/#icon-button) and [Select](../Select/) are supported. Any form components should also have their `inline` property set to `true`.

## IconTextAnimate

Animates an icon and text in similar style to that of [FeatherAppRailNavItem](#apprailnavitem).

### Slots

- `icon` will always be present expanded or not
- `text` will fade in when expanding
