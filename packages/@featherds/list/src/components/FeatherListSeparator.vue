<template>
  <feather-list-item as-li disabled>
    <hr />
  </feather-list-item>
</template>
<script>
import FeatherListItem from "./FeatherListItem.vue";
export default {
  components: {
    FeatherListItem,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
li.feather-list-item {
  padding: 0;
}
</style>
