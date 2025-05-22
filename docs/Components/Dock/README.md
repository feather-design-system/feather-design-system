---
title: "Dock"
pre: ""
npm: "@featherds/dock"
description: "A collapsible side panel that can contain navigation, tools, or other content while preserving space."
lang: en-US
tags: ["Dock", "component"]
menu: components
---

## Design

The Dock component provides a collapsible side panel interface that can be used to display navigation menus, tools, or other content while preserving screen space. It can be positioned on the left or right side of the screen and can push adjacent content when expanded.

## Examples

<!-- <src>
./Examples.vue
</src> -->

<!-- <FeatherDemo :demos="demos" /> -->

## Usage

### Basic Usage

TODO:  Ask for Basic Usage verbiage

## Features

### Push vs. Overlay

TODO:  Use the pushedSelector to designate element to be pushed.  No pushedSelector specified or not selector not found will result in Overlay behavior.

### DockConfig

TODO:  FeatherDock provides a DockConfig to its children that can be used by child components to react to changes in FeatherDock.

### With PanelBar

TODO:
The Dock component is commonly used with the PanelBar component to create navigation sidebars:

### Pushing Adjacent Content

To make the dock push adjacent content when expanded:

## FeatherDock

### Props

| Name   | Description |Type | Required | Default |
| ------ |------       | --- | ---------| ------- |
| `id` | Optional ID attribute for the dock element. | `String` | `undefined` | `true`|
| `modelValue` | Controls whether the dock is expanded (`true`) or collapsed (`false`). Can be used with `v-model`.  | `Boolean` | `false` | `false`|
| `location` | The location of the dock. Options are `'left'` or `'right'`. | `String` | `'left'`  | `false`|
| `expandedWidth` | The width of the dock when expanded. | `String` | `'20rem'` | `false`|
| `collapsedWidth` | The width of the dock when collapsed. | `String` | `'4rem'`  | `false`|
| `pushedSelector`|  CSS selector for elements that should be pushed when the dock expands. | `String` | `undefined` | `false`|
| `labels` | Text labels for accessibility. | `Object` | `{ expand: 'Expand dock', collapse: 'Collapse dock' }` | `false`|

### Events

| Name | Description |
|------|-------------|
| `update:modelValue` | Emitted when the dock expanded/collapsed state changes. |
| `update:dock-expanded` | Emitted when the dock expands. |
| `update:dock-collapsed` | Emitted when the dock collapses. |

### Slots

| Name | Description |
|------|-------------|
| `docked` (default) | Content to be displayed inside the dock. |

### CSS Variables

| Variable | Description |
|----------|-------------|
| `--feather-dock-background-color` | Background color or gradient for the dock. |

### Provides

The dock provides two functions and a configuration object to children:

| Name | Description | Type |
|------|-------------| ---- |
| `DockConfig` | Dock configuration information | DockConfig |
| `scrollToElement` | Scroll to a specific element within the dock. | function |
| `requestDockExpansion` | Request the dock to expand. | function |

## Accessibility

The FeatherDock component includes the following accessibility features:

- Toggle button with proper `aria-expanded` state
- Customizable aria labels
- Keyboard navigation support
- Focus management when opening and closing
