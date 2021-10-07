<template>
  <feather-checkbox
    v-model="noLabel"
    label="Hey I am a label"
    no-focus
  ></feather-checkbox>
</template>
<script>
import { FeatherCheckbox } from "../src";
export default {
  data: function () {
    return {
      noLabel: false,
    };
  },
  components: {
    FeatherCheckbox,
  },
};
</script>
