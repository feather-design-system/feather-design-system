<template>
  <nav class="sidebar">
    <span class="title">{{ title }}</span>
    <ul>
      <SidebarItem v-for="(item, i) in items" :key="i" :item="item" />
    </ul>
  </nav>
</template>
<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  props: {
    items: Array,
    title: String,
  },
  components: {
    SidebarItem,
  },
};
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
.sidebar .title {
  @include typo.overline();
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-block;
  color: var(vars.$primary-text-on-surface);
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
