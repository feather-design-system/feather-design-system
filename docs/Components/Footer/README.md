---
title: "Footer"
pre: "@featherds/footer"
description: "Provides important links, licensing details and copyright information."
lang: en-US
tags: ["Footer", "component"]
layout: ComponentLayout
---

## Design

Footer is designed as the bottom-most element of an interface. It is a global element found across all screens and pages. In order to not overwhelm the page and take attention away from more important user tasks within any page, the Footer is designed with the balance of being essential yet minimal.

## Examples

<Footer-Examples />

## Usage

The Footer primarily serves as a container for important application-wide information such as legal links, copyright information and licensing details.

The Footer should be built with application appropriate links like:

* Terms of Use
* Privacy Policy
* Cookies
* Terms and Conditions
* Contact Details

Links should be used minimally and should never exceed 5 total links.

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
