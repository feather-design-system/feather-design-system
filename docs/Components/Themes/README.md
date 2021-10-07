---
title: "Themes"
lang: en-US
tags: ["Themes", "component"]
layout: ComponentLayout

---


`@featherds/styles`


`@featherds/styles` exposes 2 different themes that can be used. They are located in the `@featherds/styles/themes` in the following css files:

- `open-light.css`
- `open-dark.css`

Each theme file styles the `:root` element with CSS Variables that are configured for the given them. [CSS Variables](https://caniuse.com/#feat=css-variables) can be used in all major browsers except IE ofcourse! It is extremely important that you utilize all of the variables below. Failure to do so could result in an unthemed part of the UI.

## Light Theme

<Styles-ExampleThemeRender theme="open-light"/>

##  Dark Theme

<Styles-ExampleThemeRender theme="open-dark"/>

## Usage

To get started using our theme you will want to import `@featherds/styles` directly. After that you can import the `css` file that contains the theme you want to use.

```js
import { createApp } from "vue";
import App from "./App.vue";

import "@featherds/styles";//loads base level typography and minor reset
import "@featherds/styles/themes/open-light.css"; // load css theme directly

createApp(App)
  .mount("#app");

```


