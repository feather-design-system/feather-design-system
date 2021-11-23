---
title: "Typography"
pre: "@featherds/styles"
description: "Rich type and powerful messaging"
lang: en-US
tags: ["Typography", "component"]
layout: ComponentLayout
---

Typography styles are applied to some [elements](#elements) by default when including `@featherds/styles`. All typography styles are exposed through `SCSS` mixins and should be how all typography styles are consumed.

::: tip Recommendation
Use mixins where possible. They allow you to style the element with the correct typography without being constrained to a given element.
:::

<style lang="scss">

  @import "@featherds/styles/mixins/typography";
  .feather-styles .demo-headings{
    h1,h2,h3,h4,h5,h6,p,a{
      margin:0;
      padding:0;
    }
    h1 {
  @include headline1();
}

h2 {
  @include headline2();
}

h3 {
  @include headline3();
}

h4 {
  @include headline4();
}

h5 {
  @include subtitle1();
}

h6 {
  @include subtitle2();
}

p {
  @include body-small();
}
  }

</style>

## Examples

<Styles-TypographyExamples />

## Mixins

Mixins can be used by importing `@featherds/styles/mixins/typography`.

```scss
@import "@featherds/styles/mixins/typography";
```

It exposes the following mixins:

- `rendering`
- `display1`
- `display2`
- `display3`
- `title`
- `headline1`
- `headline2`
- `headline3`
- `headline4`
- `subtitle1`
- `subtitle2`
- `body-large`
- `body-small`
- `header`
- `button`
- `caption`
- `overline`
- `screen-reader`
- `anchor`

## Elements

Feather styles some HTML elements by default. Typography styles are applied to elements directly when you include `@featherds/styles` and add the `.feather-styles` class to a parent element.

```scss
@import "@featherds/styles";
```

This import will also style the following HTML Elements:

- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `p`
- `small`
- `a`
