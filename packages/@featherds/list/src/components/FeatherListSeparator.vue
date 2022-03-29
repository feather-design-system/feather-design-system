<template>
  <feather-list-item as-li disabled>
    <hr />
  </feather-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FeatherListItem from "./FeatherListItem.vue";
export default defineComponent({
  components: {
    FeatherListItem,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
li.feather-list-item {
  padding: 0;
}
</style>
