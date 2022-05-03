---
title: "Themes"
pre: "@featherds/styles"
description: "How to use themes to style your application"
lang: en-US
tags: ["Themes", "guide"]
menu: guides
---

`@featherds/styles` exposes 2 default themes that can be used. They are located in the package at `@featherds/styles/themes` in the following CSS files:

- `open-light.css`
- `open-dark.css`

Each theme file provides a set of CSS Variables for the `:root` element in the HTML document. [CSS Variables](https://caniuse.com/#feat=css-variables) can be used in all major browsers except Internet Explorer. The variables are used throughout our components for styling and give benefits such as cleaner code, better consistency and more powerful theming. Values can therefore be changed at runtime and are visible to JavaScript should it be neccessary. A sample of our two default themes is below;

## Light Theme

<Styles-ExampleThemeRender theme="open-light"/>

## Dark Theme

<Styles-ExampleThemeRender theme="open-dark"/>

## Usage

To get started using our themes you will want to import `@featherds/styles` directly. After that you can import the `CSS` file that contains the theme you want to use.

```js
import { createApp } from "vue";
import App from "./App.vue";

import "@featherds/styles"; //loads base level typography and minor reset
import "@featherds/styles/themes/open-light.css"; // load CSS theme directly

createApp(App).mount("#app");
```

If you're building a component or want to use styles elsewhere in your application, it's simple to utilise the variables. Import the variables file in your SASS/SCSS and you can use the variables directly.
See [Variables](../Variables/) for more details.

```sass
@import "@featherds/styles/themes/variables";

element {
  background-color: var($primary);
}

```

## Creating themes

The base themes are light and dark variants of the same core set of values. To facilitate this, they are created in the following structure;

- `styles/themes/_variables.scss`<br/>
  Defines all the variable names that can be assigned
- `styles/themes/_base-light.scss` / `styles/themes/_base-dark.scss`<br/>
  Inherits the variables and primarily defines colors and opacity values
- `styles/themes/_base-theme_.scss`<br/>
  Defines typography and layout values
- `styles/themes/_open-mixins.scss`<br/>
  Takes all of the above, alters a few specific values and creates a dark and light mixin for consumption
- `styles/themes/open-light.scss` / `styles/themes/open-dark.scss`<br/>
  Simply consume the mixins created above and are the files used by the build process

You can create your own themes in your project in whatever method you prefer, but we recommend you set values for all the defined variables, otherwise you may find issues with some components.
