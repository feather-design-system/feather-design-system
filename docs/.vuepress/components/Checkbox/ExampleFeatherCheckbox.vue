<template>
  <feather-checkbox id="subscribe" v-model="subscribe"
    >Subscribe</feather-checkbox
  >
</template>
<script>
import { FeatherCheckbox } from "@featherds/checkbox";
export default {
  data: function () {
    return {
      subscribe: false,
    };
  },
  components: {
    FeatherCheckbox,
  },
};
</script>
