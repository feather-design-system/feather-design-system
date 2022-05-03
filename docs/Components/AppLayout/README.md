---
title: "App Layout"
pre: "@featherds/app-layout"
description: "Provides common application layouts to quickly get started."
lang: en-US
tags: ["AppLayout", "App-Layout", "component"]
menu: components
---

## Getting Started

[AppLayout](#applayout) supports a few layouts out of the box. For more details on all of the layouts check out our [Guides page](../../Guides/AppLayout/).

## AppLayout

### Props

| Name          | Description                                                                            | Type     | Required | Default        |
| ------------- | -------------------------------------------------------------------------------------- | -------- | -------- | -------------- |
| contentLayout | layout that the main content will have. Allowed values are: `"center"`, `"full"`       | `String` | `false`  | `"center"`     |
| navLayout     | layout that the navigation will have. Allowed values are: `"horizontal"`, `"vertical"` | `String` | `false`  | `"horizontal"` |

### Slots

- `header` - slot should contain an [App Bar](../AppBar/) or an [App Header](../AppRail/#appheader)
- `rail` - slot should contain a [Navigation Rail](../NavigationRail/) or an [App Rail](../AppRail/)
- `footer` - slot should contain a [Footer](../Footer/)
- `default` - slot should the main app content. Slot content is contained within a `.feather-container` therefore you can start using `.feather-row`s to structure your content
