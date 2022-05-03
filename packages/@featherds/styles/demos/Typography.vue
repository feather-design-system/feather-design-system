<template>
  <div>
    <div class="display-1">Display 1</div>
    <div class="display-2">Display 2</div>
    <div class="display-3">Display 3</div>
    <h1>H1 header</h1>
    <h2>H2 header</h2>
    <h3>H3 header</h3>
    <h4>H4 header</h4>
    <h5>H5 header</h5>
    <h6>H6 header</h6>
    <p>This is a normal paragraph. Body 2 right now</p>
    <p class="text-muted">This is a muted text paragraph</p>
    <p class="text-emphasized">This emphasized</p>
    <p class="small">This is small text</p>
    <div class="subtitle1-mixin">Subtitle1 mixin</div>
    <div class="subtitle2-mixin">Subtitle2 mixin</div>
    <div class="body-large-mixin">body-large mixin</div>
    <div class="body-small-mixin">body-small mixin</div>
    <div class="button-mixin">Button mixin</div>
    <div class="caption-mixin">Caption mixin</div>
    <div class="overline-mixin">Overline mixin</div>
    <p class="text-error">This is error text</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.italics {
  font-style: italic;
}

.bold {
  font-weight: bold;
}
.display-1 {
  @include display1();
}
.display-2 {
  @include display2();
}
.display-3 {
  @include display3();
}
.subtitle1-mixin {
  @include subtitle1();
}
.subtitle2-mixin {
  @include subtitle2();
}
.body-large-mixin {
  @include body-large();
}
.body-small-mixin {
  @include body-small();
}
.button-mixin {
  @include button();
}
.caption-mixin {
  @include caption();
}
.overline-mixin {
  @include overline();
}
</style>
