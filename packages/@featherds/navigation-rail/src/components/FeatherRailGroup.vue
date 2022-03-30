<template>
  <nav class="nav-rail-group" :aria-label="label">
    <FeatherList>
      <slot />
    </FeatherList>
  </nav>
</template>
<script lang="ts">
import { FeatherList } from "@featherds/list";
import { defineComponent } from "vue";
export const props = {
  label: {
    type: String,
    required: true,
  },
} as const;
export default defineComponent({
  props,
  components: {
    FeatherList,
  },
});
</script>
