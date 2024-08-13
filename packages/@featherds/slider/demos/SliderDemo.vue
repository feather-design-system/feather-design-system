<template>
  <div>
    <h1>Slider</h1>
    <!-- :max="4" -->
    <FeatherSlider
      id="slider-demo"
      :value="sliderValue1"
      :floor="2"
      :label="'Slider with empty color attributes'"
      :ticks="customTick1"
    />
    <!-- :max="4" -->
    <FeatherSlider
      id="slider-demo2"
      :value="sliderValue2"
      :floor="1"
      :label="'Slider with feather colors'"
    />
    <!-- :max="5" -->
    <FeatherSlider
      id="slider-demo3"
      :value="sliderValue3"
      :label="'Slider with custom labels'"
      :ticks="customTicks3"
    />
    <!-- :max="3" -->
    <FeatherSlider
      id="slider-demo4"
      :value="sliderValue4"
      :label="'Slider with custom labels'"
      :ticks="customTicks4"
    />
    <!-- :max="9" -->
    <FeatherSlider
      id="slider-demo5"
      :value="sliderValue5"
      :floor="3"
      :label="'Slider with custom labels'"
      :ticks="customTick5"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import FeatherSlider from "../src/components/FeatherSlider.vue";

const customTicks3: {
  tick?: number | undefined;
  label: string;
  color: string;
}[] = [
  { label: "Step 1", color: "" },
  { label: "Step 2", color: "" },
  { label: "step 3", color: "" },
  { label: "step 4", color: "" },
  { label: "step 5", color: "" },
];
const customTick1: {
  tick?: number | undefined;
  label: string;
  color: string;
}[] = [
  { label: "critical", color: "" },
  { label: "major", color: "" },
  { label: "minor", color: "" },
  { label: "warning", color: "" },
];
const customTicks4: { tick?: number; label: string; color: string }[] = [
  { label: "Step 1", color: "" },
  { label: "Step 2", color: "" },
  { label: "step 3", color: "" },
];

// TODO: need to be able to import Tick type from FeatherSlider
const customTick5: { tick?: number; label: string; color: string }[] = [
  { label: "Step 1", color: "" },
  { label: "Step 2", color: "" },
  { label: "step 3", color: "" },
  { label: "Step 4", color: "" },
  { label: "step 5", color: "" },
  { label: "Step 6", color: "" },
  { label: "step 7", color: "" },
  { label: "Step 8", color: "" },
  { label: "step 9", color: "" },
];

const sliderValue1 = ref(2);
const sliderValue2 = ref(1);
const sliderValue3 = ref(0);
const sliderValue4 = ref(1);
const sliderValue5 = ref(3);
</script>

<style scoped></style>
