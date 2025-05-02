---
title: "Sass Usage"
lang: en-US
pre: "styles"
npm: ""
description: "How Feather Design System utilizes Sass for styling."
tags: ["Sass", "SCSS", "Styles", "Foundation"]
menu: foundation
---

## Usage

Feather Design System leverages [Sass](https://sass-lang.com/) (Syntactically Awesome Style Sheets) as its CSS preprocessor. This allows for more organized, maintainable, and powerful styling through features like variables, mixins, functions, and modules.

## Version

Feather DS currently utilizes **Dart Sass version `^1.79.0`**. We recommend using a compatible version in your projects when extending or customizing Feather styles.

## Sass Modules (`@use`)

Feather DS follows the modern Sass module system using `@use` instead of the older `@import`. This provides better namespacing, explicit dependency loading, and avoids issues with global scope pollution.

### Namespacing

When importing Sass files with `@use`, we typically assign a namespace. This prevents naming conflicts and makes it clear where variables, mixins, or functions originate.

```scss
// Import variables with the namespace 'vars'
@use "@featherds/styles/themes/variables" as vars;

// Import responsive mixins with the namespace 'resp'
@use "@featherds/styles/mixins/responsive" as resp;

.my-component {
  // Use a variable from the 'variables' module
  color: var(vars.$primary-text-on-surface);

  // Use a mixin from the 'responsive' module
  @include resp.media-query-below(s) {
    font-size: 0.875rem;
  }
}
````

## Key Style Directories

Our core Sass files are organized within the `@featherds/styles` package.

+ **`lib/`**: Contains base styles, resets, and core typography rules. (`feather.scss`, `reset.scss`, `typography.scss`)
+ **`mixins/`**: Holds reusable style patterns like elevation, grid layouts, and typography helpers. (`_grid.scss`, `_elevation.scss`)
+ **`themes/`**: Defines CSS custom properties (variables) for different themes (e.g., light, dark) and base variable definitions. (`_variables.scss`, `_open-light.scss`, `_open-dark.scss`)

## Examples

## Using Theme Variables

```scss
@use "@featherds/styles/themes/variables" as vars;

.button-primary {
  background-color: var(vars.$primary);
  color: var(vars.$on-primary);
  border: 1px solid var(vars.$primary);

  &:hover {
    background-color: var(vars.$primary-variant);  
  }
}
```

### Using a Grid Mixin

```scss
@use "@featherds/styles/mixins/grid" as grid;
@use "@featherds/styles/mixins/responsive" as resp; // Grid often uses responsive

.container {  
  @include grid.container(); // Apply container padding/max-width
}

.row {  
  @include grid.row(); // Apply negative margins for row layout
}

.column {
  @include grid.col(xl, 6); // Make it 6 columns wide on xl screens

  @include resp.media-query-below(m){    
  @include grid.col(m, 12); // Make it full width on medium screens and below  
  }
}
```

## Using Typography Mixins

```scss
@use "@featherds/styles/mixins/typography" as typo;

.page-title

{   @include typo.headline1(); }

.section-header

{   @include typo.headline3(); }

.caption-text

{   @include typo.caption(); }

```

By leveraging Sass modules and a structured approach, Feather DS provides a robust and flexible foundation for styling applications.
