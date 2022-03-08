k
<template>
  <FeatherList class="result-list">
    <FeatherListItem as-li>
      <slot />
    </FeatherListItem>
  </FeatherList>
</template>
<script lang="ts">
import { FeatherListItem, FeatherList } from "@featherds/list";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    FeatherList,
    FeatherListItem,
  },
});
</script>
<style lang="scss" scoped>
.result-list {
  min-width: 100%;
}
</style>
