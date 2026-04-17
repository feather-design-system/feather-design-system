---
title: "Panel Bar"
pre: ""
npm: "@featherds/panel-bar"
description: "A collapsible panel group for organizing content in expandable sections."
lang: en-US
tags: ["PanelBar", "panel-bar", "accordion", "component"]
menu: components
---
## Design

The Panel Bar component provides a way to organize content into expandable and collapsible panels. It is useful for presenting large amounts of information in a compact space, allowing users to focus on one section at a time. Panel Bars can be used for FAQs, settings, or any scenario where grouped, toggleable content is beneficial.

## Example

<PanelBar-Examples />

## Usage

Use the Panel Bar to:

- Group related content in a space-efficient manner
- Allow users to expand/collapse sections as needed
- Improve readability and navigation for long forms or documentation

**Best practices:**

- Use clear, descriptive titles for each panel
- Only include relevant content in each section
- Avoid nesting Panel Bars too deeply to maintain usability

## Panel Bar

The `FeatherPanelBar` component renders a group of panels, each of which can be expanded or collapsed. It supports single or multiple open panels at a time.

### Props

| Name      | Description                                                                 | Type                | Required | Default   |
|-----------|-----------------------------------------------------------------------------|---------------------|----------|-----------|
| `id`      | The unique id for the panel bar (used for accessibility).                   | `string`            | Yes      | -         |
| `items`   | Array of `Panel` objects. Each should have `id`, `title`, and `content`.      | `Array<PanelItem>`  | Yes      | -         |
| `mode`    | Whether only one panel can be open (`"single"`) or multiple (`"multiple"`). | `string`            | No       | `"single"`|
| `header`  | Show a header above the panel bar.                                          | `boolean`           | No       | `false`   |
| `title`   | The header text if `header` is true.                                        | `string`            | No       | `""`      |
| `footer`  | Show a footer below the panel bar.                                          | `boolean`           | No       | `false`   |

### Types

#### Panel

```ts
type Panel = {
  id: string;
  title?: string;
  icon?: typeof FeatherIcon;
  content?: string;
  component?: Component;
  componentProps?: Record<string, unknown>;
  open?: boolean;
  onClick?: () => void;
};
```

:::tip Tip
You can use the text-only `"content"` attribute, the Vue `"component"` attribute,  or a combination of both for the content of your panels.
:::

:::warning Warning
When using a Vue component in your Panel item, you **MUST** use `markRaw` to avoid 'enumerating' errors in the browser.  (See [Examples](#example).)

If you do not, you may see a warning like:
_[Vue warn]: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead._
:::

### Events

| Name      | Description                                              | Payload                                  |
|-----------|----------------------------------------------------------|------------------------------------------|
| `toggle`  | Emitted when a panel is toggled open or closed           | `(event, panelId, isOpen, panelTitle)`   |

### Slots

- `default` - Use to customize panel content if not using the `items` prop.

### data-ref-ids

- `feather-panel-bar` - The main Panel Bar container
- `feather-panel-bar-summary-{id}` - The summary element for each panel
- `feather-panel-bar-content-{id}` - The content element for each panel

## Accessibility

- The Panel Bar uses semantic HTML (`<details>` and `<summary>`) for built-in accessibility.
- The `role="region"` and `aria-labelledby` attributes are used for the container.
- Each panel summary is associated with its content via `aria-controls`.
