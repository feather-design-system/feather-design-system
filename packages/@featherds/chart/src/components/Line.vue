<template>
  <div>
    Line Chart Component
    <svg :id="id"></svg>
    <!-- <p>Size: {{ size }}</p> -->
    <!-- <p>ID: {{ id }}</p>
      <p>Title: {{ title }}</p>
    <p>Type: {{ type }}</p>
    <p>Data: {{ data }}</p>
    <p>Dimensions: {{ dimensions }}</p>
    <p>Options: {{ options }}</p>
    <p>Axes: {{ axes }}</p> -->
  </div>
</template>
<script lang="ts" setup>
import { PropType, onMounted, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartLineData,
  FeatherChartOptions,
} from "./types";
const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartLineData>, required: true },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: {
    type: Object as PropType<FeatherChartOptions>,
    required: true,
  },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { data, type } = reactive(props);

const draw = () => {
  console.log(`draw ${type}`);
  if (!isValid()) throw new Error("Invalid data");
};

defineExpose({ draw });

const isValid = () => {
  return true;
};

watchEffect(() => {
  if (data.data.length > 0) {
    console.log("Let's draw()'");
    draw();
  }
});

onMounted(() => {
  draw();
});
</script>
<style lang="scss" scoped></style>
