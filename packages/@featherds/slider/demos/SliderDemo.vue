<template>
  <div>
    <h1>Slider</h1>
    <FeatherSlider
      id="slider-demo"
      v-model.number="value"
      :max="max"
      :label="'Slider with empty color attributes'"
      :ticks="customTickBaseColors"
    />
    <FeatherSlider
      id="slider-demo2"
      v-model.number="value"
      :max="max"
      :label="'Slider with feather colors'"
    />
    <FeatherSlider
      id="slider-demo3"
      v-model.number="value"
      :max="max"
      :label="'Slider with custom labels'"
      :ticks="customTicks"
    />
  </div>
  <!-- :min="min" -->
</template>
<script lang="ts" setup>
import { ref } from "vue";
import FeatherSlider from "../src/components/FeatherSlider.vue";

const customTicks: { tick: number; label: string; color: string }[] = [
  { tick: 25, label: "Step 1", color: "" },
  { tick: 50, label: "Step 2", color: "" },
  { tick: 75, label: "step 3", color: "" },
  { tick: 100, label: "step 4", color: "" },
];
const customTickBaseColors: { tick: number; label: string; color: string }[] = [
  { tick: 25, label: "critical", color: "" },
  { tick: 50, label: "major", color: "" },
  { tick: 75, label: "minor", color: "" },
  { tick: 100, label: "warning", color: "" },
];

const value = ref(50);
// const min = ref(0);
const max = ref(100);
</script>

<style scoped></style>
