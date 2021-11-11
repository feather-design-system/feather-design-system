---
title: "AppLayout"
pre: "@featherds/app-layout"
description: "Provides common application layouts"
lang: en-US
tags: ["AppLayout", "component"]
layout: ComponentLayout

---

## Getting Started

`AppLayout` supports a few layouts out of the box.

:::warning NOTE
In the following examples `AppHeader`, `AppFooter` and `AppRail` are all application implementations that use the `FeatherAppBar`, `FeatherFooter` and `FeatherNavigationRail` components. Using non Feather components in your implementation will have undersirable side effects. `AppContent` is the main content area of the application.
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

## FeatherAppLayout

### Props

| Name          | Description                                                                      | Type     | Required | Default    |
| ------------- | -------------------------------------------------------------------------------- | -------- | -------- | ---------- |
| contentLayout | layout that the main content will have. Allowed values are: `"center"`, `"full"` | `String` | `false`  | `"center"` |

### Slots

- `header` - slot that should contain a [FeatherAppBar](../AppBar/)
- `rail` - slot that should contain a [FeatherNavigationRail](../NavigationRail/)
- `footer` - slot that should contain a [FeatherFooter](../Footer/)
- `default` - slot that should the main app content. Slot content is contained within a `.feather-container` therefore you can start using `.feather-row`s to structure your content.
