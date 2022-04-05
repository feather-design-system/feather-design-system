<template>
  <FeatherIcon
    :icon="errorIcon"
    class="error-icon hide-when-disabled"
    data-ref-id="error-icon"
  />
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import Error from "@featherds/icon/notification/Warning";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    errorIcon() {
      return Error;
    },
  },
  components: {
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.error-icon {
  color: var($error);
  font-size: 1.25rem;
}
</style>
