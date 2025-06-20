---
title: "Sidebar"
pre: ""
npm: "@featherds/sidebar"
description: "A collapsible side panel for organizing navigation and content in a space-efficient manner."
lang: en-US
tags: ["Sidebar", "component"]
menu: components
---

:::under-construction Under Construction
FeatherSidebar is under review and is subject to change.
:::

## Design

The Sidebar component provides a collapsible side panel interface that can be used to organize navigation, tools, and other content while preserving screen space. It uses panels to group related content and can be collapsed to show only icons when space is at a premium.

## Example

<Sidebar-Examples />

## Usage

Use the Sidebar to:

- Organize navigation and tools in a collapsible side panel
- Group related content into expandable sections
- Preserve screen space with a collapsible interface

**Best practices:**

- Use clear, descriptive titles for each panel
- Include icons to represent panels when collapsed
- Organize content logically into related groups
- Consider the expanded and collapsed states when designing content

## Sidebar

### Sidebar Props

| Name | Description | Type | Required | Default |
|------|-------------|------|----------|---------|
| `id` | Unique identifier for the sidebar | `string` | Yes | - |
| `items` | Array of panels to display | `Array<Panel>` | Yes | - |
| `pushedSelector` | CSS selector for elements that should be pushed when expanded | `string` | No | - |
| `modelValue` | Controls whether the sidebar is expanded (`true`) or collapsed (`false`) | `boolean` | No | `false` |
| `location` | Position of the sidebar (`'left'`, `'right'`, or `'none'`) | `string` | No | `'left'` |
| `expandedWidth` | Width of the sidebar when expanded | `string` | No | `'20rem'` |
| `collapsedWidth` | Width of the sidebar when collapsed | `string` | No | `'3rem'` |
| `mode` | Whether one panel (`'single'`) or multiple panels (`'multi'`) can be open | `string` | No | `'single'` |
| `menuHeader` | Whether to show the menu header | `boolean` | No | `false` |
| `menuFooter` | Whether to show the menu footer | `boolean` | No | `false` |
| `menuTitle` | Title text for the menu header | `string` | No | - |
| `menuIcon` | Icon to display in the menu header | `string` | No | - |
| `labels` | Accessibility labels for expand/collapse actions | `Object` | No | `{ expand: 'Expand dock', collapse: 'Collapse dock' }` |

### Dock Events

| Name | Description | Payload |
|------|-------------|---------|
| `update:modelValue` | Emitted when sidebar expand/collapse state changes | `boolean` |

### Sidebar Types

#### Panel

```ts
type Panel = {
  id: string;
  title?: string;
  icon?: typeof FeatherIcon;
  content?: string;
  component?: Component;
  componentProps?: Record<string, unknown>; // Custom props passed to the component
  open?: boolean;
  onClick?: () => void;
};
```

:::warning Warning
To use a Vue component in Panel items, you must apply markRaw to prevent enumeration errors. This stops Vue from making the component reactive and it avoids enumeration warnings and performance issues.
:::

:::tip
The `componentProps` field allows you to pass any custom props to your component.  For example:

```ts
{
  id: "my-panel",
  component: MyCustomComponent,
  componentProps: {
    color: "blue",
    size: "large",
    customData: { key: "value" }
  }
}
```

:::

### Accessibility

Use clear, descriptive panel titles
Include icons to represent panels when collapsed
Ensure custom components maintain keyboard navigation
Provide meaningful labels for expand/collapse actions

## Sidenav

<Sidebar-SidenavExamples />

### Sidenav Props

| Name | Description | Type | Required | Default |
|------|-------------|------|----------|---------|
| `id` | Unique identifier for the sidebar | `string` | Yes | - |
| `items` | Array of menus to display | `Array<MenuListEntry>` | Yes | - |
| `pushedSelector` | CSS selector for elements that should be pushed when expanded | `string` | No | - |
| `modelValue` | Controls whether the sidebar is expanded (`true`) or collapsed (`false`) | `boolean` | No | `false` |
| `location` | Position of the sidebar (`'left'`, `'right'`, or `'none'`) | `string` | No | `'left'` |
| `expandedWidth` | Width of the sidebar when expanded | `string` | No | `'20rem'` |
| `collapsedWidth` | Width of the sidebar when collapsed | `string` | No | `'3rem'` |
| `labels` | Accessibility labels for expand/collapse actions | `Object` | No | `{ expand: 'Expand dock', collapse: 'Collapse dock' }` |

| Name | Description | Payload |
|------|-------------|---------|
| `update:modelValue` | Emitted when sidebar expand/collapse state changes | `boolean` |
