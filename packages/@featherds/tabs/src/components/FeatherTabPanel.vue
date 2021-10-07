<template>
  <div v-bind="attrs" v-show="selected">
    <slot />
  </div>
</template>

<script>
import { useTabPanel, stockProps } from "@featherds/composables/tabs/TabPanel";
export default {
  props: {
    ...stockProps,
  },
  setup(props) {
    return useTabPanel(props);
  },
};
</script>
