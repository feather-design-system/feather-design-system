---
title: "Expansion"
lang: en-US
tags: ["Expansion", "component"]
layout: ComponentLayout

---


`@featherds/expansion`

## FeatherExpansionPanel

@@@ Expansion-ExampleFeatherExpansionPanel

### Disabled State

@@@ Expansion-Disabled

### Loading State

@@@ Expansion-Loading


### Props

| Name       | Description                                                                | Type      | Required | Default |
| ---------- | -------------------------------------------------------------------------- | --------- | -------- | ------- |
| modelValue | when true expansion will be open. `v-model` can be used for 2 way binding. | `Boolean` | `false`  | -       |
| level      | should be set to fit inside the header flow. Accessbility requirement.     | `Number`  | `false`  | 2       |
| title      | will set the title of the header. Use this **OR** title slot.              | `String`  | `false`  | -       |
| loading    | when true will display loading spinner in the panel content.               | `Boolean` | `false`  | `false` |
| disabled   | when true the expansion panel will be disabled and not open                | `Boolean` | `false`  | `false` |

### Events

- `update:modelValue` emitted with `Boolean` value when panel is opened or closed.

### Slots

- `title` Optional slot. Will place content in the header. Use this **OR** title property.
- `default` Content that will be expanded.

### data-ref-id

- `feather-expansion-header-button` clicking this will expand content area.
- `feather-expansion-content` div containing content. Only in DOM if expanded.
