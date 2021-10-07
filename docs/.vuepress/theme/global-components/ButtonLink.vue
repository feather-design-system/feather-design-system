<template>
  <FeatherButton text as-anchor :href="relativeUrl" class="docs-button-link"
    ><slot />
  </FeatherButton>
</template>
<script>
import { FeatherButton } from "@featherds/button";
export default {
  props: {
    href: String,
  },
  computed: {
    relativeUrl() {
      return this.$withBase(this.href);
    },
  },
  components: {
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.docs-button-link {
  --feather-primary: var(#{$secondary-variant});
  --feather-state-color-on-surface: var(#{$secondary-variant});
  --feather-state-color-on-surface-r: var(#{$secondary-variant}-r);
  --feather-state-color-on-surface-g: var(#{$secondary-variant}-g);
  --feather-state-color-on-surface-b: var(#{$secondary-variant}-b);
  margin-bottom: 0;
  margin-top: 0;
}
</style>
