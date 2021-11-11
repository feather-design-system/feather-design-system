<template>
  <section>
    <div class="display-1">Display 1</div>
    <div class="display-2">Display 2</div>
    <div class="display-3">Display 3</div>
    <div class="title">Title</div>
    <div class="headline1-mixin">headline1</div>
    <div class="headline2-mixin">headline2</div>
    <div class="headline3-mixin">headline3</div>
    <div class="headline4-mixin">headline4</div>
    <div class="subtitle1-mixin">subtitle1</div>
    <div class="subtitle2-mixin">subtitle2</div>
    <div class="body-large-mixin">body-large</div>
    <div class="body-small-mixin">body-small</div>
    <div class="header">Header</div>
    <div class="button-mixin">Button</div>
    <div class="caption-mixin">Caption</div>
    <div class="overline-mixin">Overline</div>
    <div class="anchor">Anchor</div>
  </section>
</template>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.display-1 {
  @include display1();
}
.display-2 {
  @include display2();
}
.display-3 {
  @include display3();
}
.title {
  @include title();
}
.headline1-mixin {
  @include headline1();
}
.headline2-mixin {
  @include headline2();
}
.headline3-mixin {
  @include headline3();
}
.headline4-mixin {
  @include headline4();
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

.header {
  @include header();
}
.button-mixin {
  @include button();
}
.caption-mixin {
  @include caption();
}
.overline {
  @include overline();
}
.anchor {
  @include anchor();
}
</style>
