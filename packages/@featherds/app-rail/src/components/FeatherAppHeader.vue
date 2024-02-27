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
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/responsive";
@import "@featherds/styles/mixins/typography";

.header {
  color: var($primary-text-on-surface);
  background-color: var($surface);
  width: 100%;
  height: var($header-height);
  border-bottom: 1px solid var($border-on-surface);
  display: flex;
  align-items: center;
  #{$text-button-primary}: var(#{$secondary-text-on-surface});
}
</style>
