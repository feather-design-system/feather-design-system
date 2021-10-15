---
title: "Footer"
lang: en-US
tags: ["Footer", "component"]
layout: ComponentLayout
---

`@featherds/footer`

## Examples

<Footer-Examples />

## FeatherFooter

### Props

| Name      | Description                                                                      | Type     | Required | Default |
| --------- | -------------------------------------------------------------------------------- | -------- | -------- | ------- |
| copyright | a string where any instance of `${year}` will be replaced with the current year. | `String` | `true`   | -       |

### Slots

- `links` content will be displayed in a list. Should be `FeatherFooterLink`s.

### data-ref-ids

- `feather-footer` The main footer wrapper element

## FeatherFooterLink

A link component for the footer, simple encapsulation component

### Props

| Name | Description            | Type     | Required | Default |
| ---- | ---------------------- | -------- | -------- | ------- |
| href | url that link goes to. | `String` | `true`   | -       |

### Slots

- `default` Content to be displayed in the anchor tag.

### data-ref-ids

- `feather-footer-link` The anchor tag encapsulating the link

## FeatherFooterTelephone

A telephone link component for the footer, allowing for mobile users to click to dial

### Props

| Name   | Description                       | Type     | Required | Default |
| ------ | --------------------------------- | -------- | -------- | ------- |
| number | Telephone number to be displayed. | `String` | `true`   | -       |
