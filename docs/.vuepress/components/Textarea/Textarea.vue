<template>
  <section>
    <FeatherTextarea
      v-model="value"
      label="Description"
      rows="5"
    ></FeatherTextarea>
  </section>
</template>
<script>
import { FeatherTextarea } from "@featherds/textarea";
export default {
  data() {
    return {
      value: "",
    };
  },
  components: {
    FeatherTextarea,
  },
};
</script>
