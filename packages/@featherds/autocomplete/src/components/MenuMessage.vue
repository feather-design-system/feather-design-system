k
<template>
  <FeatherList class="result-list">
    <FeatherListItem as-li>
      <slot />
    </FeatherListItem>
  </FeatherList>
</template>
<script>
import { FeatherListItem, FeatherList } from "@featherds/list";
export default {
  components: {
    FeatherList,
    FeatherListItem,
  },
};
</script>
<style lang="scss" scoped>
.result-list {
  min-width: 100%;
}
</style>
