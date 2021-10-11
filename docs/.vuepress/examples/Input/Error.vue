<template>
  <FeatherInput :label="label" error="Error above" class="my-text-input" />
</template>
<script>
import { FeatherInput } from "@featherds/input";
export default {
  data() {
    return {
      label: "First Name",
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
  width: 400px;
}
</style>
