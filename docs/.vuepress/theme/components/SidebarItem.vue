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
  padding: 4px 4px 4px 16px;
  display: inline-block;
  border-left: 2px solid var($shade-4);
  color: var($secondary-text-on-surface);
  &:visited {
    color: var($secondary-text-on-surface);
  }
  &:hover {
    text-decoration: none;
    color: var($primary-text-on-surface);
    border-left: 2px solid var($shade-3);
  }
  &.active {
    color: var($primary-text-on-surface);
    border-left: 2px solid var($shade-1);
    font-weight: var($font-bold);
  }
}
</style>
