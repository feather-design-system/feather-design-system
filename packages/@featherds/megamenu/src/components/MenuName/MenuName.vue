<template>
  <div class="menu-name">
    <div class="name">{{ name }}</div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/flex";
@import "@featherds/styles/mixins/typography";

.menu-name {
  width: 14rem;
  margin: 1.5rem 0;
  padding-left: 1.375rem;
  padding-right: 1.5rem;
  border-right: 1px solid var($border-on-surface);
  @include flex;
  @include horizontal;
  align-items: center;
  box-sizing: border-box;
  .name {
    @include headline2();
    @include fill;
  }
}
@media screen and (max-width: map-get(map-get($grid,l),max)) {
  .menu-name {
    display: none;
  }
}
</style>
