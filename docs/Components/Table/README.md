---
title: "Table"
lang: en-US
tags: ["Table", "component"]

layout: ComponentLayout
---

`@featherds/table`

`@featherds/table` has predefined table classes that allow you to effectively style a basic table as required. It also provides a common component for sorting that you can include if you require.

## Example

<Table-Examples />

### Row Click

If the row is meant to have a click action you _must_ use the `rowAction` directive provided. The reason for using this over the `click` handler is we safe guard against menus and other action items inside the table from triggering the row action.

In the following example notice that clicking the checkbox or any menu item does not trigger the row action to be logged in the console. This is the benefit of the `rowAction` directive.

### Button Actions

:::warning Accessibility

In both of the actions examples above you will notice screen reader (`.sr-only`) only text as well as verbose labels. When providing actions in the table row it is important to provide some indicator as to what row the user is acting on. Just that little bit extra of information provides them with enough context to make an informed decision.

:::

## Styles

### Mixins

Table styling is exposed through various mixins that can be combined to produce the desired outcome.

#### Table

All tables must include at least this mixin in order to achieve the required styling.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
}
```

The `table` mixin provide basic table styling as well as the [Column alignment](#column-alignment), [Icon cells](#icon-cells) and [Checkbox cells](#checkbox-cells) classes.

#### row-select

The`row-select` mixin adds the `.selected` class which can be set on `tr` elements to show that the row is selected.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
  @include row-select();
}
```

#### row-hover

The`row-hover` mixin adds styling to each row when it is hovered over.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
  @include row-hover();
}
```

#### table-condensed

The`table-condensed` mixin reduces the sizing of the table.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
  @include table-condensed();
}
```

#### row-striped

The`row-striped` mixin adds striping pattern to the table.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
  @include row-striped();
}
```

#### tbody-striped

The`tbody-striped` mixin adds striping pattern to the table by striping the underlying tbody elements. This is useful when you need to stripe grouped rows. The best way to group rows is to use multiple `tbody`s.

```scss
@import "~@featherds/table/scss/table";
table {
  @include table();
  @include tbody-striped();
}
```

## Classes

These classes are available when you use the [Table](#table) mixin.

### Column alignment

There are a set of auto-generated classes to address the challenge of left/right/center alignment of columns. These classes take the format: `prefix | alignment | column number`

- **Prefix** is `t` (table)
- **Alignment** is a single letter - `l | r | c` - representing left, right and center respectively
- **Column Number** is the number of the column you wish to apply it to, starting at 1

`tl1` means the 1st column will be aligned left
`tr5` means the 5th column will be aligned right
`tc32` means the 32nd column will be aligned center

```html
<table
  id="feather-table"
  class="tl1 tr2 tl3 tr4 tr5 tr6 tl7 tc8 tc9 tl10 tr11 tc12 tc13"
  summary="A demo dataset to show feather-table"
></table>
```

Columns default to being left aligned.

### Icon cells

If you want to use a cell to only display an icon, and have it take the appropriate size/spacing etc, you can apply the `icon-cell` class to affected cells.

```html
<td class="icon-cell">
  <FeatherIcon :icon="icon" />
</td>
<td class="icon-cell">
  <font-awesome-icon title="test" :icon="icon2"></font-awesome-icon>
</td>
```

### Checkbox cells

Similarly, if your cell only contains a checkbox, you can have it styled accordingly with the checkbox class.

```html
<td class="checkbox-cell">
  <FeatherCheckbox v-model="checkbox1" label="Checkbox1" />
</td>
```

## FeatherSortHeader

### Props

| Name     | Description                                                                                                                              | Type                   | Required | Default                       |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------- | ----------------------------- |
| sort     | current applied sort to the column                                                                                                       | `asc`, `desc`, ` none` | `true`   | -                             |
| property | should be the name of the property that is to be sorted. This is only used to help you identify the sorting in the `sort-changed` event. | `String`               | `true`   | -                             |
| labels   | object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example    | `Object`               | `false`  | See [Labels](#labels) example |

### Labels

Text labels for sort header can be customized via the `labels` property. The default `labels` values are:

```js
{
  sortAscending: "Sorted Ascending",
  sortDescending: "Sorted Descending",
  sortNone: "Not Sorted",
  clickSort: "Click to Sort"
};
```

### Events

- `sort-changed` - triggered when sorting should be changed. Emits object `{ value: asc|desc|none, property }`

### Slots

- `default` The text content of the header

### data-ref-ids

- `feather-sort-header` - the base element of the header

### Accessibility

Current know issues:

- Announcement of `Sorted None` in the button name when not sorted. This is to handle the lack of announcement by NVDA which does not announce the `aria-sort` attribute when it is set to none.
- Duplicate announcement of sort changing in JAWS. This is due to NVDA not announcing a sort change we must announce our own which causes duplication in JAWS.
