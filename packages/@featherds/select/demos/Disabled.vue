<template>
  <section>
    <FeatherSelect
      class="my-select"
      label="State"
      background
      :options="states"
      v-model="state"
      disabled
    >
    </FeatherSelect>
    <FeatherSelect
      class="my-select"
      label="State"
      background
      :options="states"
      v-model="state2"
      disabled
      clear="Clear State"
      error="Error"
    >
    </FeatherSelect>
  </section>
</template>
<script>
import states from "./states";
import * as components from "./../src";
export default {
  data() {
    return { states, state: undefined, state2: states[1] };
  },
  components: {
    ...components,
  },
};
</script>
<style lang="scss" scoped>
.my-select {
  width: 25rem;
}
</style>
