---
title: "Pagination"
pre: "@featherds/pagination"
description: "Pagination elements display information about the number of pages that exist of a list of items and provide controls to navigate through them."
lang: en-US
tags: ["Pagination", "component"]
menu: components
---

## Design

The Pagination design is very close to the Google Material Design standards. Keeping Pagination simple and styling it in a similar fashion to the table ensures that the Pagination component can be seamlessly added to a [Table](/components/table) component or used as a stand-alone component if necessary.

## Examples

<Pagination-Examples />

## Pagination

Pagination component that can be used in the footer of a [Table](/components/table) to help control navigation.

When setting up Pagination make sure to pass in a `pageSize` but also to listen for the `update-pageSize` event so that you can recieve new values for `pageSize`. We automatically reset the `value` to `1` when the `pageSize` is changed.

### Labels

Text labels for pagination can be customized via the `labels` property. The default `labels` values are:

```js
{
  rowsPerPage: "Rows per page",
  range: "${start} - ${end} of ${total}",
  first: "Go to first page",
  last: "Go to last page",
  next: "Go to next page",
  previous: "Go to previous page",
  paginationLabel: "Pagination controls"
}
```

**NOTE** for range `${start}`, `${end}` and `${total}` will be replaced with the corresponding values.

### Props

| Name       | Description                                                                                                                           | Type       | Required | Default                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------------------------- |
| modelValue | current page that is active. **First page is 1**                                                                                      | `Number`   | `true`   | -                             |
| total      | total number of items being displayed                                                                                                 | `Number`   | `true`   | -                             |
| pageSize   | current page size being displayed                                                                                                     | `Number`   | `true`   | -                             |
| pageSizes  | array containing number of available page sizes                                                                                       | `Number[]` | `false`  | `[10, 20, 50]`                |
| labels     | object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`   | `false`  | See [Labels](#labels) example |

### Events

- `update:modelValue` - emits new page value. Always a number
- `update:pageSize` - emits new page size value. Always a number

### data-ref-ids

- `feather-pagination-first-button` - on the `button` element that goes to first page
- `feather-pagination-previous-button` - on the `button` element that goes to previous page
- `feather-pagination-next-button` - on the `button` element that goes to next page
- `feather-pagination-last-button` - on the `button` element that goes to last page
