<template>
  <section>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      background
      ref="dateInput"
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
  <button @click="clearAll">Clear</button>
</template>
<script lang="ts">
import { FeatherDateInput } from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      test: undefined,
    };
  },
  methods: {
    clearAll() {
      (this.$refs.dateInput as typeof FeatherDateInput).reset();
    },
  },
  components: {
    FeatherDateInput,
  },
});
</script>
<style lang="scss" scoped>
.my-date {
  width: 25rem;
}
</style>
