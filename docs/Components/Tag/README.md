---
title: "Tag"
pre: ""
npm: "@featherds/tag"
description: "Tags are used to label, categorize, or organize items using keywords that describe them."
lang: en-US
tags: ["Tag", "component"]
menu: components
---

:::under-construction Not Published
FeatherTag is under review and has not yet been published.
:::

## Design

Tags help users quickly identify, filter, or group content by applying short, descriptive labels. They are commonly used in search interfaces, filters, and item lists to provide additional context or enable quick actions.

Tags should be concise, ideally a single word or short phrase. Avoid using tags as primary navigation or for actions unrelated to categorization.

## Example

<Tag-Examples />

## Usage

Use tags to:

- Categorize or group items (e.g., status, type, topic)
- Highlight key attributes or metadata
- Enable filtering or searching by tag

**Best practices:**

- Keep tag labels short and meaningful
- Avoid using too many tags on a single item
- Use consistent styling and capitalization
- Provide clear affordances for interactive tags

## TagList

The `FeatherTagList` component provides a simple container for displaying one or more tags in a horizontal row with consistent spacing and styling.

Wrap one or more `FeatherTag` components `FeatherTagList` to visually group them:

### Slots

- `default` - The unnamed default slot can hold one or more tags.

## Tag

The `FeatherTag` component displays a styled label with optional status indication and emphasis.

### Props

| Name      | Description                              | Type      | Required | Default   |
| --------- | ---------------------------------------- | --------- | -------- | --------- |
| `type`    | The status type for the tag (color/meaning) | `TagType` (`"success"`, `"normal"`, `"error"`, `"critical"`, `"major"`, `"minor"`, `"warning"`, `"indeterminate"`, `"info"`, `"cleared"`, `"ready"`, `"unknown"`, `"up"`, `"down"`, `"initializing"`, `"expired"`, `"allocated"`, `"online"`, `"offline"`) | Yes | `"unknown"` |
| `text`    | The text content of the tag              | `string`  | No       | `type`    |
| `emphasis`| Visual emphasis for the tag              | `TagEmphasis` (`"high"`, `"medium"`, `"low"`) | No | `"medium"`  |

### Accessibility

- The tag is rendered as a `role="img"` with an `aria-label` for screen readers.
- The tag is focusable (`tabindex="0"`) and supports keyboard interaction for popover/tooltip features.
- The status icon is marked `aria-hidden="true"` to avoid redundancy.

### Slots

- _No Tag slots are currently exposed; the tag content is controlled via props listed above._
