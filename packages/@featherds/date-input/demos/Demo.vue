<template>
  <section>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      background
      class="my-date"
    ></FeatherDateInput>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      background
      disabled
      class="my-date"
    ></FeatherDateInput>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      test: undefined,
    };
  },
  components: {
    ...components,
  },
});
</script>
<style lang="scss" scoped>
.my-date {
  width: 25rem;
}
</style>
