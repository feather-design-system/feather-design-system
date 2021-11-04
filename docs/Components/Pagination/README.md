---
title: "Pagination"
pre: "@featherds/pagination"
description: "Pagination will be used if technical limitations prevent infinite scrolling or if there is a clear benefit to the user over other methods of lateral navigation (moving through screens at the same level of hierarchy) or infinte scroll. Pagination elements display information about the number of pages that exist and provide controls to navigate through them."
lang: en-US
tags: ["Pagination", "component"]
layout: ComponentLayout
---

## Design

The pagination design is very close to the Google Material Design standards. Keeping pagination simple and styling it in a similar fashion to the table ensures that the pagination component can be seamlessly added to a table component or used as a stand-alone component if necessary.

## Examples

<Pagination-Examples />

## FeatherPagination

Pagination component that can be used in the footer of a table to help control navigation.

When setting up pagination make sure to pass in a `pageSize` but also to listen for the `update-pageSize` event so that you can recieve new values for `pageSize`. We automatically reset the `value` to `1` when the `pageSize` is changed.

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
| pageSizes  | array containing number of available page sizes.                                                                                      | `Number[]` | `false`  | `[10, 20, 50]`                |
| labels     | object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`   | `false`  | See [Labels](#labels) example |

### Events

- `update:modelValue` - emits new page value. Always a number.
- `update:pageSize` - emits new page size value. Always a number.

### data-ref-ids

- `feather-pagination-first-button` - on the `button` element that goes to first page
- `feather-pagination-previous-button` - on the `button` element that goes to previous page
- `feather-pagination-next-button` - on the `button` element that goes to next page
- `feather-pagination-last-button` - on the `button` element that goes to last page
