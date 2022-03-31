<template>
  <section>
    <FeatherProtectedInput
      label="Password"
      v-model="value"
      background
      hint="Really strong password please"
      clear="test"
    ></FeatherProtectedInput>

    <FeatherProtectedInput
      label="Password"
      v-model="value"
      background
      disabled
    ></FeatherProtectedInput>

    <div>
      {{ value }}
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  data() {
    return {
      value: "",
    };
  },
  components: {
    ...components,
  },
});
</script>
