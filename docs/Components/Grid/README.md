---
title: "Grid"
pre: "@featherds/styles"
description: "Tools and presets for scaffolding your application layout."
lang: en-US
tags: ["Grid", "component"]
layout: ComponentLayout
---

## Mixins

:::tip Recommendation

The mixin support is provided to allow easy use of our grid functionality inside Single File Components (SFC). Please avoid using the class based syntax in a SFC as it will import a lot of unwanted CSS.

:::

We have added a number of mixins which is our preferred method for using grid layout inside of a SFC. To use the mixins you need to import:

```scss
@import "@featherds/styles/mixins/grid";
```

You have the following mixins available:

```scss
// creates a grid container constrained to our max width
.my-container {
  @include container;
}

// creates a grid container that is full width
.my-container {
  @include container(true);
}

// create a row
.my-row {
  @include row;
}

// create a generic column.
.my-column {
  //column width is 2
  @include col(2);
}

// create a responsive column.
.my-responsive-column {
  @include col(xl, 8);
  @include col(l, 8);
  @include col(m, 4);
  @include col(s, 4);
  @include col(xs, 2);
}

// create a generic, offset column.
.my-offset-column {
  //column width is 2
  @include col(2);
  //offset width is 2
  @include offset(2);
}

// create a responsive, offset column.
.my-offset-responsive-column {
  @include col(xl, 8);
  @include col(l, 8);
  @include col(m, 4);
  @include col(s, 4);
  @include col(xs, 2);

  @include offset(xl, 4);
  @include offset(l, 4);
  @include offset(m, 2);
  @include offset(s, 2);
  @include offset(xs, 1);
}
```

## Class

`@featherds/styles` has a number of classes that are utilized to create a grid layout. To use these classes you need to import:

```scss
@import "@featherds/styles/lib/grid";
```

These classes are **NOT** included in our default include.

Be aware when including this import in a `scoped` `scss` style tag in a SFC. It will include all of the grid classes in your CSS which will result in a lot of bloat. If you want to use the classes we recommend including the grid import in your `main` file, alongside your theme import, that way your entire app can continue to use the classes.

## Grid Structure

### Containers

Containers are restricted to a max-width of `1200px`. They also have a padding (left and right) applied around the element that matches the current gutter for the given screen size. See [Grid Breakpoints](#grid-breakpoints) for details on the gutter sizing. **NOTE** the padding will be half the size of the gutter. Containers are useful for grid layouts though not required. Please consult with us on the best approach.

```html
<div class="feather-container">
  <!-- Grid or Content -->
</div>
```

#### Full Width

To make a grid full width you must put the `full-width` class on the respective grid container.

```html
<div class="feather-container full-width">
  <!-- Grid or Content -->
</div>
```

### Rows

Rows contain columns and will always take up 100% of the parent element.

```html
<div class="feather-row">
  <div
    class="feather-col-xl-2 feather-col-l-2 feather-col-m-2 feather-col-s-2 feather-col-xs-1"
  >
    ...
  </div>
</div>
```

### Columns

Columns are only allowed inside rows. They are used to specify the width of the content you want to render. For details on how to define columns see [Grid Breakpoints](#grid-breakpoints) and [Generic Columns](#generic-columns).

```html
<div class="feather-row">
  <div
    class="feather-col-xl-2 feather-col-l-2 feather-col-m-2 feather-col-s-2 feather-col-xs-1"
  >
    ...
  </div>
</div>
```

### Offsets

Offset classes can be applied to a column. They provide spacing before the column is rendered. This is useful if there needs to be a gap in your grid.

```html
<div class="feather-row">
  <div class="feather-col-8 feather-offset-2">...</div>
</div>
```

## Grid Breakpoints

Our grid supports different column widths at different screen widths. As breakpoints also become smaller we reduce the overall number of columns as well as the padding. The following tables details the breakpoints from largest to smallest:

| Class Label | Max Screen Width | Min Screen Width | Number of Columns | Size of Gutter |
| ----------- | ---------------- | ---------------- | ----------------- | -------------- |
| xl          | `undefined`      | 960px            | 12                | 24px           |
| l           | 959px            | 840px            | 12                | 24px           |
| m           | 839px            | 720px            | 8                 | 24px           |
| s           | 719px            | 600px            | 8                 | 16px           |
| xs          | 599px            | 0px              | 4                 | 16px           |

`xl` has no max as it works on everything larger than `960px`.

### Using Column Breakpoints

To specify different column widths at a given breakpoints you can use a mixin or define classes which contain the required class label to apply the styling. For example say at the `m` size you want an element to be 4 columns wide, your class would be `.feather-col-m-4`. Or your mixin would be `@include col(m, 4);` The format is `.feather-col-{label}-{number}`. You can apply multiple mixins or classes to an element to achieve a responsive layout based on the given breakpoints. See the examples below for more details.

## Generic Columns

If your application is not concerned with being responsive under `960px` you can use a column class which doesn't require a label. The format is `.feather-col-{number}`. There is always 12 of the generic columns. You can also use the mixin without specifying the a breakpoint. `@include col(4);` this will produce a generic column of width `4` See the examples below for more details.

## Examples

### Responsive

The following example is 10/2 split @ xl, 8/4 split @ l, 6/2 split @ m, 4/4 split @ s and 4/4 split @ xs. How can it be 4/4 @ xs? This essentially means that this small size each column should take up all the width it can.

<Styles-ResponsiveGrid />

### Generic

The following example uses the generic column classes to create a 10/2 split.

<Styles-GenericGrid />

### Hybrid Grid

You can combine the responsive and generic grids. This can be useful if you want to specifically style a given breakpoint from the responsive grid but otherwise use the generic columns widths. Consider wanting to have a 10/2 split but at the m breakpoint you want to switch to a 4/4 split.

<Styles-HybridGrid />
