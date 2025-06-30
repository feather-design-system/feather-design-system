---
title: "Alert"
pre: ""
npm: "@featherds/alert"
description: "Alerts are used to communicate important information, warnings, or errors to users in a prominent way."
lang: en-US
tags: ["Alert", "component"]
menu: components
---
:::under-construction Not Published
FeatherAlert and FeatherAlertDock are under review and have not yet been published.
:::

## Design

Alerts provide contextual feedback messages for typical user actions, system events, or critical information. They are designed to be visually prominent and can be used for success, warning, error, or informational messages. Alerts may be dismissible, sticky, or docked to the top or bottom of the viewport.

## Example

<Alert-Examples />

## Usage

Use alerts to:

- Notify users of important information or status changes
- Communicate errors, warnings, or confirmations
- Draw attention to critical system messages

**Best practices:**

- Use clear, concise language
- Only use alerts for information that requires user attention
- Avoid overusing alerts to prevent user desensitization
- Use the appropriate alert type for the message context

## Alert Dock

The `FeatherAlertDock` component is an optional container for stacking one or more alerts at the top or bottom of the viewport.  These _docked_ alerts are _full bleed_ and styled to appear more prominant than non-docked alerts.

### Usage

Wrap one or more `FeatherAlert` components inside `FeatherAlertDock` to display docked alerts.  Alerts can be docked at the top or bottom of the page.

### Props

| Name         | Description                                      | Type                                  | Required | Default   |
| ------------ | ------------------------------------------------ | ------------------------------------- | -------- | --------- |
| `active`     | Controls whether the dock is rendered or visible via CSS | `boolean` | No       | `true`    |
| `dock`       | The dock location (`"top"`, `"bottom"`) determines whether the alerts are positioned at the top or bottom of the viewport. | `string` | Yes       | `"top"`  |
| `tag`        | Semantic HTML tag for the dock. The tag for this component defaults to `"aside"`, but can be overridden (i.e. `"header"`, `"footer"`, `"div"`, etc..).   | `string` | No       | `""`  |

### Slots

- The unnamed default slot accepts one or more `FeatherAlert` components, which are rendered in a stacked layout within the dock. Each alert is styled and positioned according to the dock's configuration and the alert's properties.

## Alert

The `FeatherAlert` component displays a styled alert message with optional actions and content.

### Props

| Name         | Description                                      | Type                                  | Required | Default   |
| ------------ | ------------------------------------------------ | ------------------------------------- | -------- | --------- |
| `type`       | The alert type (status). Use `"info"` for general information, `"success"` for confirmations or positive outcomes, `"warning"` for cautionary messages, and `"error"` for critical issues or failures. The default value is `"info"`. | `"info"`, `"success"`, `"warning"`, `"error"` | No       | `"info"`  |
| `message`    | The main alert message text. Defaults to `"Info"`, which is a placeholder. It is strongly recommended to replace this placeholder with meaningful content in production to avoid accidental use. | `string`                              | No       | `"Info"`  |
| `active`     | Controls whether the alert is rendered or visible via CSS                     | `boolean`                             | No       | `true`    |
| `banner`     | Display as a banner. As a standalone alert, it impacts styling by removing border-radius. When the alert is a child of a `FeatherAlertDock`, the `banner` prop is overridden by the dock context, which controls its behavior and styling. | `boolean`                             | No       | `false`   |
| `closeable`   | The alert can be dismissed.              | `boolean`                             | No       | `false`   |
| `tag`        | Semantic HTML tag for the alert container. Any block tag should be supported. When the alert is a child of `FeatherAlertDock`, this property is overridden based on the dock position. See `FeatherAlertDock` props. | `string`                              | No       | `"div"`   |

### Events

- `close` — Emitted when the alert is dismissed
- `update:active` — Emitted when the alert's active state changes

### Slots

- `default` — Custom content inside the alert
- `actions` — Slot for action buttons (e.g., dismiss, retry)
- `content` — Additional content below the main message

### Accessibility

- Uses appropriate ARIA roles: `alert`, `alertdialog`, or `banner` depending on context
- Sets `aria-live` for screen reader announcements
- Dismiss buttons have descriptive `aria-label`s
