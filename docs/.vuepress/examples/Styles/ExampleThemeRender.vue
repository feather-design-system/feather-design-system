<template>
  <div class="theme-render" :class="cls">
    <div class="outer-row">
      <ColorList :vars="mainColors" title="Environment Colors" />
      <TextList title="Text on Color" background="primary" on="color" />
    </div>

    <div class="outer-row">
      <ColorList :vars="surfaceColors" title="Surface Colors" />
      <TextList title="Text on Surface" background="surface" on="surface" />
    </div>

    <div class="outer-row">
      <ColorList :vars="statusColors" title="Status Colors" />
      <TextList title="Text on Error/Success" background="error" on="color" />
      <TextList title="Text on Warning" background="warning" on="warning" />
    </div>

    <div class="outer-row">
      <ColorList :vars="shades" title="Shades" />
    </div>
  </div>
</template>
<script>
import ColorList from "./ColorList.vue";
import TextList from "./TextList.vue";
export default {
  props: {
    theme: {
      type: String,
    },
  },
  computed: {
    cls() {
      return `${this.theme}`;
    },
    mainColors() {
      return ["primary", "primary-variant", "secondary", "secondary-variant"];
    },
    surfaceColors() {
      return ["surface", "background"];
    },
    statusColors() {
      return ["error", "success", "warning"];
    },
    shades() {
      return ["shade-1", "shade-2", "shade-3", "shade-4"];
    },
  },
  components: {
    ColorList,
    TextList,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.theme-render {
  padding: 8px 32px;
  background-color: var($background);
}
.outer-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}

.col {
  min-height: 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  @include body-large();
  padding: 4px;
}
</style>

<style lang="scss" scoped>
@import "@featherds/styles/themes/open-mixins";

@function str-replace($string, $search, $replace: "") {
  $index: str-index($string, $search);
  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace +
      str-replace(
        str-slice($string, $index + str-length($search)),
        $search,
        $replace
      );
  }
  @return $string;
}

@each $property, $value in $open-light-map {
  $prop: str-replace($property, "--feather-", "");
  :deep(.#{$prop}) {
    color: var(#{$property});
  }
  :deep(.bg-#{$prop}) {
    background-color: var(#{$property});
  }
}
</style>
