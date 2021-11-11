---
title: "Autocomplete"
pre: "@featherds/autocomplete"
description: "The Autocomplete pattern will help users to search for, select and provide valid answers from large datasets. As the user types into a text box, a list of matching answers is shown in a drop-down menu below the text box. The user can then choose one or more items from the list instead of typing the whole answer."
lang: en-US
tags: ["Autocomplete", "component"]
layout: ComponentLayout
---

## Design

Autocomplete consists of three components:

- a text input field
- a drop-down select menu
- one or more chips

The hover and focus states for the autocomplete pattern are inherited from the `input` component.<br />
The hover, select and focus states for the menu are inherited from the `dropdown` component.<br />
Chips are used directly from the `chip` component.

## Examples

<Autocomplete-Examples />

## Getting Started

### Item Display Text

It is expected that your `results` and `value` will be Objects (or an Array of Objects) that have the display text you wish to use available as a property. You can configure which property you want to use as display text by setting the `text-prop` property to the name of the object property you want to use.

For example if your objects are structured like the following:

```js
const results = [
  {
    id: 1,
    name: "Rik",
  },
];
```

You would configure the `text-prop` to be `name`.

### Search Event

The search event is throttled (debounce) out of the box. It will also adhere to any `minChar` restrictions you place on the autocomplete. When you are handling the search event be sure to set the `loading` property to `true` if you are making an asynchronous call. Once you have your results, make sure you have `_text` property set on each object and then set `results` property to your results array and `loading` to `false`.

### Min Characters

When setting the `minChar` property, be sure to add a `minChar` property on the `labels` prop to warn the user about this restriction. Note the token `${min}` will be replaced with the number specified in the `minChar` property.

### No Results

If an empty results set is passed, the `noResults` property of the `labels` prop will be used for the message displayed.

### Results Menu Height

You can configure the results menu height by setting the height style for `.feather-autocomplete-results-list`. Out of the box the height is configured to allow up to 6 rows before scrolling. We have provided a mixin for you to easily configure the height of the results menu.

The following example allows `10` items to be displayed before scrolling.

```scss
.my-component :deep(.feather-autocomplete-results-list) {
  @include autocomplete-results-height(10);
}
```

### Chip Pre Icon

To configure a 'pre' icon inside a selected chip, you must add a `_pre` property on the `value` prop that is composed of an object containing a `title` and `icon` property. `title` should be a string detailing what the icon is for. `icon` should be a Feather icon.

If you know ahead of time that a selection will require an icon, you can populate this `_pre` property when you are creating your `results` array.

#### After Selection

If your item is already selected, you will need to update your `value` array to have the correct `_pre` property. The following code snippet can help you achieve this. Please note the use of `$set` is necessary.

```js
this.$set(this.value, index, {
  _pre: {
    icon: icon,
    title: "There is an issue with this selection",
  },
  ...this.value[index],
});
```

In the example above, we update the value array at the index where the icon needs to be inserted.

## FeatherAutocomplete

### Props

| Name           | Description                                                                                                                           | Type                | Required | Default                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | --------------------------------------- |
| label          | Label for the autocomplete                                                                                                            | `String`            | `true`   | -                                       |
| type           | Type of autocomplete to render. Allowed:`"multi"`,`"single"`                                                                          | `String`            | `true`   | -                                       |
| modelValue     | Current value the autocomplete has. In `multi` mode it will be an `Array`. In `single` it will be a `Object` selected                 | `Array` or `Object` | `false`  | `[]` or `undefined`                     |
| results        | Array of search results to display in dropdown                                                                                        | `Array`             | `false`  | `[]`                                    |
| textProp       | Property name that is used to get the display text from `value` and `results`.                                                        | `String`            | `false`  | `_text`                                 |
| error          | Error string to display under autocomplete                                                                                            | `String`            | `false`  | -                                       |
| hint           | Hint string to display under autocomplete                                                                                             | `String`            | `false`  | -                                       |
| loading        | When true autocomplete will be in a loading state                                                                                     | `Boolean`           | `false`  | `false`                                 |
| allowNew       | When true autocomplete will allow new items to be added. Only available in `single` mode                                              | `Boolean`           | `false`  | `false`                                 |
| highlight      | Determines how the query is matched in the results. Allowed:`"off"`,`"ignore-case"`. See [Highlighting](#highlighting) section        | `String`            | `false`  | `"off"`                                 |
| background     | Sets label background color to `background`                                                                                           | `Boolean`           | `false`  | `false`                                 |
| minChar        | Will only emit `search` even when query is atleast `minChar` long                                                                     | `Number`            | `false`  | `0`                                     |
| newMatcher     | If `allowNew` is enabled, this is the function that ascertains if the search term entered is unique/new                               | `function`          | `false`  | Compares query and item in lower case   |
| selectionLimit | Limits the number of items that can be selected. Only takes effect in `multi`. Don't forget to set the label                          | `Number`            | `false`  | -                                       |
| labels         | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`            | `false`  | See [Labels](#labels) example           |
| gridConfig     | Array containing configuration for rendering the grid results. See [Grid Config](#grid-config) example                                | `Object`            | `false`  | See [Grid Config](#grid-config) example |
| hideLabel      | Hides the label for the input in scenarios like tables where it would get in the way                                                  | `Boolean`           | `false`  | -                                       |

### Labels

Text labels for autocomplete can be customized via the `labels` property. The default `labels` values are:

```js
{
  noResults: "No results found",
  minChar: "Enter ${min} characters to search",
  clear: "Clear value", //used for clear icon in single mode
  selectionLimit: "Selection limit reached",
  new: "New"
}
```

### Grid Config

An Array of custom objects that contain configuration for each column. Allowed properties are:

- `title` - this should be the display name of the column
- `prop` - the name of the value contained within the `results` object that is to be rendered in this column
- `align` - Optional, can be used to configure the column to be `right` aligned. Default layout is `left` aligned.

#### Example Config

```js
[
  {
    title: "Name",
    prop: "name",
  },
  {
    title: "Email",
    prop: "email",
  },
  {
    title: "Car",
    prop: "car",
  },
  {
    title: "Order",
    prop: "order",
    align: "right",
  },
];
```

Result object structure:

```js
{
  name: "Clarke",
  email: "cwinwright0@test.com",
  car: "Porsche",
  order: 20
},

```

### Highlighting

Highlighting can be used to showcase what part of the string matched the search query. By default the `highlight` prop is set to off. Currently the only other option is `ignore-case`, this will match the first instance of the query string in the `textProp` regardless of case.

### Events

- `search` - Emits the `string` query coming from the autocomplete. This event is throttled (debounced).
- `update:modelValue` - Emits an array that is the new value of the autocomplete.
- `new` - Emits `string` that should be the display text of the new element. This event is only used when `allowNew` is `true`.

### Slots

- `pre` - define an icon that will appear before the input. Default is a search icon.
- `min-char` - will override any `minCharText` value you provide. Use this or the property but **NOT** both.

### data-ref-ids

- `feather-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-form-element-clear` - on anchor tag surrounding the clear icon
- `feather-autocomplete-min-char` - on the min char element
- `feather-autocomplete-no-results` - on the no results element
- `feather-autocomplete-selection-limit` - on the selection limit element

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.

## Accessibility

We are aware of the following issues with JAWS 2018:

- Pressing enter to select turns on forms mode.
- Pressing enter to clear the token or input does not work.

We are hoping updating to the latest JAWS version will resolve these issues.
