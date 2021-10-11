---
title: "Footer"
pre: "@featherds/footer"
description: "A global Footer component that can contain various content, including copyright"
lang: en-US
tags: ["Footer", "component"]
layout: ComponentLayout
---

## Examples

<Footer-Examples />

## Footer

### Props

| Name      | Description                                                                     | Type     | Required | Default |
| --------- | ------------------------------------------------------------------------------- | -------- | -------- | ------- |
| copyright | a string where any instance of `${year}` will be replaced with the current year | `String` | `true`   | -       |

### Slots

- `contact` - contact information; displayed as the first row
- `links` -  content will be displayed in a list. Should be `FooterLink`s

### data-ref-ids

- `feather-footer` - the main Footer wrapper element

## FooterLink

A link component for the Footer, simple encapsulation component

### Props

| Name | Description            | Type     | Required | Default |
| ---- | ---------------------- | -------- | -------- | ------- |
| href | url that link goes to. | `String` | `true`   | -       |

### Slots

- `default` - content to be displayed in the anchor tag

### data-ref-ids

- `feather-footer-link` - the anchor tag encapsulating the link

## FooterTelephone

A telephone link component for the Footer, allowing for mobile users to click to dial

### Props

| Name   | Description                      | Type     | Required | Default |
| ------ | -------------------------------- | -------- | -------- | ------- |
| number | telephone number to be displayed | `String` | `true`   | -       |
