<template>
  <li>
    <a :href="item.href" class="sidebar-item" :class="{ active: active }">{{
      item.title
    }}</a>
  </li>
</template>
<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    active() {
      const routerHash = decodeURIComponent(this.$route.hash);
      return routerHash === this.item.href;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

li a {
  height: 2rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  border-left: 2px solid var($shade-4);
  @include body-small;
  color: var($secondary-text-on-surface);
  &:visited {
    color: var($secondary-text-on-surface);
  }
  &:hover {
    text-decoration: none;
    color: var($primary-text-on-surface);
  }
  &.active {
    color: var($primary);
    border-left: 2px solid var($primary);
  }
}
</style>
