<template>
  <div class="menu-name">
    <div class="name">{{ name }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/flex" as flex;
@use "@featherds/styles/mixins/typography" as typo;

.menu-name {
  width: 14rem;
  margin: 1.5rem 0;
  padding-left: 1.375rem;
  padding-right: 1.5rem;
  border-right: 1px solid var(vars.$border-on-surface);
  @include flex.flex;
  @include flex.horizontal;
  align-items: center;
  box-sizing: border-box;
  .name {
    @include typo.headline2();
    @include flex.fill;
  }
}
@media screen and (max-width: map.get(map.get(vars.$grid,l),max)) {
  .menu-name {
    display: none;
  }
}
</style>
