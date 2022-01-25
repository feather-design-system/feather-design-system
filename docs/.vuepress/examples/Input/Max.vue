<template>
  <FeatherInput
    :label="label"
    :hint="hint"
    v-model="value"
    :maxlength="25"
    class="my-text-input"
  />
</template>
<script>
import { FeatherInput } from "@featherds/input";
export default {
  data() {
    return {
      label: "Nickname",
      hint: "Do you have a nickname",
      value: "The bandy legged bandit",
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
