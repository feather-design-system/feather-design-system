---
title: "Typography"
pre: ""
npm: "@featherds/styles"
description: "Rich type and powerful messaging."
lang: en-US
tags: ["Typography", "guide"]
menu: guides
---

Typography styles are applied to some [elements](#elements) by default when including `@featherds/styles`. All typography styles are exposed through `SCSS` mixins and should be how all typography styles are consumed.

::: tip Recommendation
Use mixins where possible. They allow you to style the element with the correct typography without being constrained to a given element.
:::

<style lang="scss">

  @use "@featherds/styles/mixins/typography" as typo;
  .feather-styles .demo-headings{
    h1,h2,h3,h4,h5,h6,p,a{
      margin:0;
      padding:0;
    }
    h1 {
  @include typo.headline1();
}

h2 {
  @include typo.headline2();
}

h3 {
  @include typo.headline3();
}

h4 {
  @include typo.headline4();
}

h5 {
  @include typo.subtitle1();
}

h6 {
  @include typo.subtitle2();
}

p {
  @include typo.body-small();
}
  }

</style>

## Examples

<Styles-TypographyExamples />

## Mixins

Mixins can be used by importing `@featherds/styles/mixins/typography`.

```scss
@use "@featherds/styles/mixins/typography" as typo;
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
@use "@featherds/styles";
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
