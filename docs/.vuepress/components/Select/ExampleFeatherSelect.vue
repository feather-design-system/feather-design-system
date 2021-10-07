<template>
  <section>
    <FeatherSelect
      class="my-select"
      label="State"
      :options="states"
      v-model="state"
    >
    </FeatherSelect>
  </section>
</template>
<script>
import states from "./states";
import { FeatherSelect } from "@featherds/select";
export default {
  data() {
    return { states, state: undefined };
  },
  components: {
    FeatherSelect,
  },
};
</script>
<style lang="scss" scoped>
.my-select {
  width: 400px;
}
</style>
