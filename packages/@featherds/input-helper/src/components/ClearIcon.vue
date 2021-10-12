<template>
  <ActionIcon
    @click.stop.prevent="$emit('clear')"
    :title="clear"
    :icon="clearIcon"
    data-ref-id="feather-form-element-clear"
  />
</template>
<script>
import ActionIcon from "./ActionIcon.vue";

import Cancel from "@featherds/icon/navigation/Cancel";
export default {
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
};
</script>
