<template>
  <ActionIcon
    @click.stop.prevent="$emit('clear')"
    :title="clear"
    :icon="clearIcon"
    data-ref-id="feather-form-element-clear"
  />
</template>
<script lang="ts">
import ActionIcon from "./ActionIcon.vue";

import Cancel from "@featherds/icon/navigation/Cancel";
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["clear"],
  props: {
    clear: {
      type: String,
      default: "",
    },
  },
  computed: {
    clearIcon() {
      return Cancel;
    },
  },
  components: {
    ActionIcon,
  },
});
</script>
