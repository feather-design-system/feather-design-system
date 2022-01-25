<template>
  <FeatherIcon :icon="errorIcon" class="error-icon hide-when-disabled" />
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Error from "@featherds/icon/notification/Warning";
import { markRaw } from "vue";
export default {
  computed: {
    errorIcon() {
      return markRaw(Error);
    },
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.error-icon {
  color: var($error);
  font-size: 1.25rem;
}
</style>
