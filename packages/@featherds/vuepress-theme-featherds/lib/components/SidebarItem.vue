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
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;

li a {
  height: 2rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  border-left: 2px solid var(vars.$shade-4);
  @include typo.body-small;
  color: var(vars.$secondary-text-on-surface);
  &:visited {
    color: var(vars.$secondary-text-on-surface);
  }
  &:hover {
    text-decoration: none;
    color: var(vars.$primary-text-on-surface);
  }
  &.active {
    color: var(vars.$primary);
    border-left: 2px solid var(vars.$primary);
  }
}
</style>
