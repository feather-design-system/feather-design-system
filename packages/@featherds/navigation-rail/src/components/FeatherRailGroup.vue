<template>
  <nav class="nav-rail-group" :aria-label="label">
    <FeatherList>
      <slot />
    </FeatherList>
  </nav>
</template>
<script>
import { FeatherList } from "@featherds/list";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  components: {
    FeatherList,
  },
};
</script>
