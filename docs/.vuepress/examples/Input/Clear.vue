<template>
  <FeatherInput :label="label" :clear="clear" class="my-text-input" />
</template>
<script>
import { FeatherInput } from "@featherds/input";
export default {
  data() {
    return {
      label: "First Name",
      clear: "Clear Text",
    };
  },
  components: {
    FeatherInput,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.my-text-input {
  width: 25rem;
}
</style>
