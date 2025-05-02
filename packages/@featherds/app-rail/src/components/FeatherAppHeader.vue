<template>
  <ScrollHideHeader
    class="feather-app-header-wrapper"
    :scroll-hide="scrollHide"
  >
    <div class="header" :class="{ 'scroll-hide': scrollHide }">
      <slot />
    </div>
  </ScrollHideHeader>
</template>
<script lang="ts">
import { ScrollHideHeader } from "@featherds/app-layout";
import { defineComponent } from "vue";

export const props = {
  scrollHide: {
    type: Boolean,
    default: false,
  },
} as const;

export default defineComponent({
  props,
  components: {
    ScrollHideHeader,
  },
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

.header {
  color: var(vars.$primary-text-on-surface);
  background-color: var(vars.$surface);
  width: 100%;
  height: var(vars.$header-height);
  border-bottom: 1px solid var(vars.$border-on-surface);
  display: flex;
  align-items: center;
  #{vars.$text-button-primary}: var(#{vars.$secondary-text-on-surface});
}
</style>
