<template>
  <div v-bind="attrs" v-show="selected">
    <slot />
  </div>
</template>

<script lang="ts">
import { useTabPanel, stockProps } from "@featherds/composables/tabs/TabPanel";
import { defineComponent } from "vue";
export const props = stockProps;
export default defineComponent({
  props,
  setup(props) {
    return useTabPanel(props);
  },
});
</script>
