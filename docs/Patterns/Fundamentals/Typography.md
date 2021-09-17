---
title: "Typography"
lang: en-US
---

# Typography

## Component

<ComponentCard component="Typography" package="Styles" />

## Package

All typography styles are available in the [`@featherds/styles`](/Packages/Styles/) package. See the [typography guide](/Packages/Styles/Guides/Typography.html) for live examples and code examples.

<hr />

## Usage

The typographic scale consists of styles ranging from very large (display styles) which are intended to be used for special occasions such as marketing callouts or large data points, to small text styles meant to be used for captions or overlain text. No matter what the need, the type system should provide flexibility to communicate your content clearly and effectively.

### Units

The various size metrics around font attributes are based around a base unit of 1rem at the bfeather-rowser default value of 1rem=16px. This allows the type scaling to change based on the user’s bfeather-rowser preferences. When users make changes to the bfeather-rowser font size in the settings, the entire typographic scale will gfeather-row or shrink in size based on that change.

<hr />

## Applying the Type Scale

### Title

Each page in an application generally has a single title. The title text sits at the very top of the type hierarchy and should be used only once per page. Title text has a visually dominant presence due to it’s size and should be used sparingly. Pages don’t necessarily have to have a title depending on the specific layout and use-case.

### Headlines

Headlines are generally the largest text on the screen outside of the display and title text. Headlines range in size from H1 (the largest) to H6 (the smallest). Headlines are used when beginning a new section of your layout. Headlines are meant to be short, so be sure to work with your UX designer or technical writer to ensure that headlines are kept to a minimum in terms of character length. If a headline needs to be long, it may be worth reconsidering whether the information should be portrayed in a different format.

### Subheadings

Subheadings are generally used between headlines to denote sub-sections of specific layouts or text-based content. There are two different variations of subheadings to provide maximum variety, Subheading 1 is sentence-case and should be used in most occasions, while subheading 2 is all-caps and should be used where typographic contrast is important (when you need to use a stronger visual cue to delineate content).

### Body

The body text should be used liberally throughout your user interface anywhere there is longer-form text content. This text is where you’ll be communicating most of the detailed content to users. Please ensure you keep headlines and subtitles as short as possible and allow the body text to carry the messaging detail. Body text comes in two sizes: a size for mobile that is set at the base rem size of 16 pixels and a size for desktop that is smaller, but renders better on 96ppi displays due to type hinting and allows desktop applications more space to communicate content.

### Caption / Overline

Caption and overline text are the smallest styles. These are meant to be used as captions to appear below images, tables and figures. Caption text can be used in other use-cases where a lower level of hierarchy is required. The overline text is generally meant to be used to communicate meta-info around content sources. For instance, the overline text can be used to denote an author’s name or a specific category that a work belongs to. Both of these styles can be used outside the intended context.

## Examples

<style lang="scss">
@import "~@featherds/styles/mixins/typography";
.feather-container p.body-large{
  @include body-large();
}

.feather-container p.fake-headline2{
  @include headline2();
}

.feather-container .feather-row{

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

<div class="feather-container">
<div class="feather-row">
<div class="feather-col-6" >

# DESKTOP

# (H1) Headline 1

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

## (H2) Headline 2

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

### (H3) Headline 3

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

#### (H4) Headline 4

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

</div>

<div class="feather-col-6" >

# MOBILE

# (H1) Headline 1

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

## (H2) Headline 2

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

### (H3) Headline 3

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

#### (H4) Headline 4

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

</div>
</div>

<hr/>

<div class="feather-row">
<div class="feather-col-6" >

# (H1) Headline 1

##### (H5) Subheading 1

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

## (H2) Headline 2

###### (H6) Subheading 2

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

###### (H6) Subheading 2

Body Small (Desktop Primary) - should be used when space is limited. This style will likely be used more than Body Large due to the information density in applications. This style is a compromise between legibility and space-efficiency. Body Small should be paired with both headlines and subtitles for maximum effect.

</div>

<div class="feather-col-6" >

# (H1) Headline 1

##### (H5) Subheading 1

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

## (H2) Headline 2

###### (H6) Subheading 2

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

###### (H6) Subheading 2

<p class="body-large">Body Large (Mobile Primary) - should be used on mobile only. This style will work much better on mobile screens due to the larger pixel size which can be interpreted better on a smaller screen. The higher pixel density will also provide better resolution for character details.</p>

</div>
</div>

</div>
