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
@import "@featherds/styles/mixins/typography";
.sidebar .title {
  @include overline();
  text-transform: uppercase;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
