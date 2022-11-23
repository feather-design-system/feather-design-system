---
title: "WebdriverIO Testing"
pre: "Testing"
description: "Tooling and guidance forr WDIO"
lang: en-US
tags: ["WDIO", "guide", "testing", "WebdriverIO"]
menu: guides
---

## WebdriverIO

We strongly recommend the use of [WebdriverIO](https://webdriver.io/) for automated testing you applications. To help make the interaction with FeatherDS controls easier we are currently in the process of adding page object wrappers around core interactions with certain controls. This page will detail the current implementations available for use.

## Example

All our implementations follow the same page object pattern for construction and usage. Below is an example of how `FeatherAutocompleteMulti` is constructed and used.

```js
import { FeatherAutocompleteMulti } from "@featherds/autocomplete/wdio";

const autocomplete = new FeatherAutocompleteMulti("[data-ref-id=test]");
await autocomplete.selectByIndex(0);
```

## Autocomplete

Can be imported from `@featherds/autocomplete/wdio`.

### FeatherAutocompleteSingle

| Function      | Description                                                                                                                           | Params            | Result            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------- |
| contructor    | takes a string selector. Selector should be associated with the `<FeatherAutocomplete/>`                                              | selector:`String` | -                 |
| selectByText  | selects element that matches the string passed in. Should be exact match. Returns text content of selected item if a match is found.. | text:`String`     | `Promise<String>` |
| selectByIndex | selects element that matches the index passed in. Should be exact match. Returns text content of selected item if a match is found..  | index:`Number`    | `Promise<String>` |
| clearValue    | clears any value that is selected                                                                                                     | -                 | `Promise<void>`   |
| getValue      | gets string value of what is currently selected                                                                                       | -                 | `Promise<String>` |

### FeatherAutocompleteMulti

| Function      | Description                                                                                                                           | Params            | Result              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| contructor    | takes a string selector. Selector should be associated with the `<FeatherAutocomplete/>`                                              | selector:`String` | -                   |
| selectByText  | selects element that matches the string passed in. Should be exact match. Returns text content of selected item if a match is found.. | text:`String`     | `Promise<String>`   |
| selectByIndex | selects element that matches the index passed in. Should be exact match. Returns text content of selected item if a match is found..  | index:`Number`    | `Promise<String>`   |
| clearChip     | clears chip that matches string passed in.                                                                                            | text:`String`     | `Promise<void>`     |
| getValue      | gets string value of each chip and returns it in an array                                                                             | -                 | `Promise<String[]>` |

## Input

Can be imported from `@featherds/input/wdio`.

### FeatherInput

| Function   | Description                                                                        | Params            | Result            |
| ---------- | ---------------------------------------------------------------------------------- | ----------------- | ----------------- |
| contructor | takes a string selector. Selector should be associated with the `<FeatherInput />` | selector:`String` | -                 |
| setValue   | sets the value of the input to the passed in string                                | text:`String`     | `Promise<void>`   |
| clearValue | clears value of input                                                              | text:`String`     | `Promise<void>`   |
| getValue   | gets string value of input                                                         | -                 | `Promise<String>` |

## Select

Can be imported from `@featherds/select/wdio`.

### FeatherSelect

| Function      | Description                                                                                                                           | Params            | Result            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------- |
| contructor    | takes a string selector. Selector should be associated with the `<FeatherSelect />`                                                   | selector:`String` | -                 |
| selectByText  | selects element that matches the string passed in. Should be exact match. Returns text content of selected item if a match is found.. | text:`String`     | `Promise<String>` |
| selectByIndex | selects element that matches the index passed in. Should be exact match. Returns text content of selected item if a match is found..  | index:`Number`    | `Promise<String>` |
| getValue      | gets string value of what is currently selected                                                                                       | -                 | `Promise<String>` |
