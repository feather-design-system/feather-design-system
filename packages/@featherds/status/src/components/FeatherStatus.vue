<template>
  <span :class="classes" v-html="statusSvg" role="img" :aria-label="status" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type StatusProps } from "../types";
import { getStatusIcon } from "../utils/statusIcons";

const props = withDefaults(defineProps<StatusProps>(), {
  status: "error",
  dimension: 16,
});

const classes = computed(() => {
  return {
    "feather-status": true,
    [`feather-status__${props.status}`]: true,
  };
});

const statusSvg = computed(() => getStatusIcon(props.status, props.dimension));
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

.feather-status {
  display: inline-flex;
  fill: var(vars.$secondary);
}
</style>
