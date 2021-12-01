---
title: "App Layout"
pre: "@featherds/app-layout"
description: "Provides common application layouts to quickly get started."
lang: en-US
tags: ["AppLayout", "App-Layout", "component"]
menu: components
---

## Getting Started

[AppLayout](#applayout) supports a few layouts out of the box.

:::warning NOTE
In the following examples `AppHeader`, `AppFooter` and `AppRail` are all application implementations that use the [App Bar](/Components/AppBar/), [Footer](/Components/Footer/) and [Navigation Rail](/Components/NavigationRail/) components respectively. Using non Feather DS components in your implementation will have undersirable side effects. `AppContent` is the main content area of the application.
:::

### Centered Layout

This layout has the header and main content centered on the page. Max width of the content section is `1200px`.

```html
<FeatherAppLayout>
  <template v-slot:header>
    <AppHeader />
  </template>

  <AppContent />

  <template v-slot:footer>
    <AppFooter />
  </template>
</FeatherAppLayout>
```

### Full Width Layout

This layout has the header and main content taking up the full width of the page. In your `AppHeader` implementation you must use the `full-width` property for `FeatherAppBar`.

```html
<FeatherAppLayout content-layout="full">
  <template v-slot:header>
    <AppHeader />
  </template>

  <AppContent />

  <template v-slot:footer>
    <AppFooter />
  </template>
</FeatherAppLayout>
```

### Centered Rail Layout

This layout has the content being centered and utilizes a rail navigation. When using a rail navigation the header is defaulted to full width. Content however can be centered or full width.

```html
<FeatherAppLayout>
  <template v-slot:header>
    <AppHeader />
  </template>
  <template v-slot:rail>
    <AppRail />
  </template>

  <AppContent />

  <template v-slot:footer>
    <AppFooter />
  </template>
</FeatherAppLayout>
```

### Full Width Rail Layout

This layout has the content being full width and utilizes a rail navigation. When using a rail navigation the header is defaulted to full width.

```html
<FeatherAppLayout content-layout="full">
  <template v-slot:header>
    <AppHeader />
  </template>
  <template v-slot:rail>
    <AppRail />
  </template>

  <AppContent />

  <template v-slot:footer>
    <AppFooter />
  </template>
</FeatherAppLayout>
```

## AppLayout

### Props

| Name          | Description                                                                      | Type     | Required | Default    |
| ------------- | -------------------------------------------------------------------------------- | -------- | -------- | ---------- |
| contentLayout | layout that the main content will have. Allowed values are: `"center"`, `"full"` | `String` | `false`  | `"center"` |

### Slots

- `header` - slot should contain an [App Bar](../AppBar/)
- `rail` - slot should contain a [Navigation Rail](../NavigationRail/)
- `footer` - slot should contain a [Footer](../Footer/)
- `default` - slot should the main app content. Slot content is contained within a `.feather-container` therefore you can start using `.feather-row`s to structure your content
