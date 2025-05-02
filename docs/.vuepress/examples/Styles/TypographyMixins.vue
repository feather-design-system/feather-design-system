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
@use "@featherds/styles/mixins/typography" as typo;
.display-1 {
  @include typo.display1();
}
.display-2 {
  @include typo.display2();
}
.display-3 {
  @include typo.display3();
}
.title {
  @include typo.title();
}
.headline1-mixin {
  @include typo.headline1();
}
.headline2-mixin {
  @include typo.headline2();
}
.headline3-mixin {
  @include typo.headline3();
}
.headline4-mixin {
  @include typo.headline4();
}
.subtitle1-mixin {
  @include typo.subtitle1();
}
.subtitle2-mixin {
  @include typo.subtitle2();
}

.body-large-mixin {
  @include typo.body-large();
}
.body-small-mixin {
  @include typo.body-small();
}

.header {
  @include typo.header();
}
.button-mixin {
  @include typo.button();
}
.caption-mixin {
  @include typo.caption();
}
.overline {
  @include typo.overline();
}
.anchor {
  @include typo.anchor();
}
</style>
