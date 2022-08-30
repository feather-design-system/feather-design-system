---
title: "Autocomplete"
pre: "@featherds/autocomplete"
description: "Helps users to search for, select and provide valid answers from large datasets."
lang: en-US
tags: ["Autocomplete", "component"]
menu: components
---

## Design

Autocomplete is designed so that as the user types into a text box, a list of matching answers is shown in a drop-down menu below the text box. The user can then choose one or more items from the list instead of typing the whole answer.

Autocomplete is a compilation of three components: a text [Input](/Components/Input/) field, a [Dropdown](/Components/Dropdown/) menu and [Chips](/Components/Chips/). The hover and focus states for an Autocomplete pattern are inherited from the text Input field component. The hover, select and focus states for the menu are inherited from the Dropdown menu. The Chip component hover and focus states apply as well.

## Examples

<Autocomplete-Examples />

## Usage

Autocomplete should be used where users need to find information from across many different categories and locations. The autocomplete component provides a speed benefit for users looking for a specific, known topic and a context benefit to users that know some, but not all of the search criteria. Autocomplete may be used in many locations where a standard search would be suitable. Autocomplete is not recommended for filtering data or for searching a limited number of known items.

**When not to use:**

**Do not** use autocomplete where information has a very limited scope and few options.

**Instead use:**

- [Select](/Components/Select/) (when there are more than 5 options)
- [Radio Buttons](/Components/Radio/) / [Checkbox](/Components/Checkbox/) (when there are more than 5 options)

## Getting Started

### Item Display Text

It is expected that your `results` and `value` props will be Objects (or an Array of Objects) that have the display text you wish to use available as a property. You can configure which property you want to use as display text by setting the `text-prop` prop to the name of the property you want to use.

For example if your objects are structured like the following:

```js
const results = [
  {
    id: 1,
    name: "Rik",
  },
];
```

You would configure `text-prop` to be `name`.

### Search Event

The search event is throttled (debounce) out of the box. It will also adhere to any `minChar` restrictions you place on the Autocomplete. When you are handling the search event be sure to set the `loading` prop to `true` if you are making an asynchronous call. Once you have your results, make sure you have `_text` property set on each object and then set `results` prop to your results array and `loading` to `false`.

### Min Characters

When setting the `minChar` prop, be sure to add a `minChar` property on the `labels` prop to warn the user about this restriction. Note the token `${min}` will be replaced with the number specified in `minChar`.

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

To configure a 'pre' icon inside a selected [Chip](/Components/Chips/), you must add a `_pre` property on the `value` prop that is composed of an object containing a `title` and `icon` property. `title` should be a string detailing what the icon is for. `icon` should be a Feather DS [Icon](/Components/Icon/).

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

## Autocomplete

### Props

| Name           | Description                                                                                                                           | Type                | Required | Default                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | --------------------------------------- |
| label          | label for the Autocomplete                                                                                                            | `String`            | `true`   | -                                       |
| type           | type of Autocomplete to render. Allowed:`"multi"`,`"single"`                                                                          | `String`            | `true`   | -                                       |
| modelValue     | current value the Autocomplete has. In `multi` mode it will be an `Array`. In `single` it will be a `Object` selected                 | `Array` or `Object` | `false`  | `[]` or `undefined`                     |
| results        | array of search results to display in dropdown                                                                                        | `Array`             | `false`  | `[]`                                    |
| textProp       | property name that is used to get the display text from `value` and `results`.                                                        | `String`            | `false`  | `_text`                                 |
| error          | error string to display under Autocomplete                                                                                            | `String`            | `false`  | -                                       |
| hint           | hint string to display under Autocomplete                                                                                             | `String`            | `false`  | -                                       |
| loading        | when true, Autocomplete will be in a loading state                                                                                    | `Boolean`           | `false`  | `false`                                 |
| allowNew       | when true, Autocomplete will allow new items to be added. Only available in `single` mode                                             | `Boolean`           | `false`  | `false`                                 |
| highlight      | determines how the query is matched in the results. Allowed:`"off"`,`"ignore-case"`. See [Highlighting](#highlighting) section        | `String`            | `false`  | `"off"`                                 |
| minChar        | will only emit `search` even when query is atleast `minChar` long                                                                     | `Number`            | `false`  | `0`                                     |
| newMatcher     | if `allowNew` is enabled, this is the function that ascertains if the search term entered is unique/new                               | `function`          | `false`  | Compares query and item in lower case   |
| selectionLimit | limits the number of items that can be selected. Only takes effect in `multi`. Don't forget to set the label                          | `Number`            | `false`  | -                                       |
| labels         | object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`            | `false`  | See [Labels](#labels) example           |
| gridConfig     | array containing configuration for rendering the grid results. See [Grid Config](#grid-config) example                                | `Object`            | `false`  | See [Grid Config](#grid-config) example |
| hideLabel      | hides the label for the input in scenarios like tables where it would get in the way                                                  | `Boolean`           | `false`  | -                                       |
| schema         | a schema for use in validation                                                                                                        | `Object`            | `false`  | -                                       |

### Labels

Text labels for Autocomplete can be customized via the `labels` prop. The default `labels` values are:

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

- `search` - emits the `string` query coming from the Autocomplete. This event is throttled (debounced)
- `update:modelValue` - emits an array that is the new value of the Autocomplete
- `new` - emits `string` that should be the display text of the new element. This event is only used when `allowNew` is `true`

### Slots

- `pre` - define an icon that will appear before the input. Default is a search icon
- `min-char` - will override any `minCharText` value you provide. Use this or the property but **NOT** both

### data-ref-ids

- `feather-autocomplete-input` - on the `input` element
- `feather-form-element-label` - on the `label` text element
- `feather-form-element-hint` - on the hint text element
- `feather-form-element-error` - on the error text element
- `feather-form-element-clear` - on anchor tag surrounding the clear icon
- `feather-autocomplete-min-char` - on the min char element
- `feather-autocomplete-no-results` - on the no results element
- `feather-autocomplete-selection-limit` - on the selection limit element
- `feather-autocomplete-input-selected` - on the div that holds the selected element names for screen readers
- `feather-autocomplete-menu-container` - the root div of the menu container
- `feather-autocomplete-menu-container-dropdown` - the container div for the menu contents, note this uses our layering system and will be present as an immediate child of the `body` tag

### Attributes

Specifying a `class` or `data-ref-id` attribute will cause them to be applied to the component's root container `div`. All other attributes are inherited to the `input` where it makes sense. Some will be ignored if they conflict with some of the attributes used for accessibility.

## Accessibility

We are aware of the following issues with JAWS 2018:

- pressing enter to select turns on forms mode
- pressing enter to clear the token or input does not work

We are hoping updating to the latest JAWS version will resolve these issues.
