<template>
  <div>
    <template id="icon-resources">
      <FeatherIcon id="icon-error" :icon="Error" />
      <FeatherIcon id="icon-info" :icon="Info" />
      <FeatherIcon id="icon-info" :icon="Info" />
      <FeatherIcon id="icon-warning" :icon="Warning" />
    </template>

    <h1>Slider</h1>
    <!-- :floor="2" -->
    <FeatherSlider
      id="slider-demo"
      :value="sliderValue1"
      :label="'Slider with empty color attributes'"
      :floor="1"
      :ticks="customTick1"
    />
    <!-- :floor="1" -->
    <FeatherSlider
      id="slider-demo2"
      :value="sliderValue2"
      :label="'Slider with feather colors'"
    />
    <FeatherSlider
      id="slider-demo3"
      :value="sliderValue3"
      :label="'Slider with custom labels'"
      :ticks="customTicks3"
    />
    <FeatherSlider
      id="slider-demo4"
      :value="sliderValue4"
      :label="'Slider with custom labels'"
      :ticks="customTicks4"
    />
    <!-- :floor="3" -->
    <FeatherSlider
      id="slider-demo5"
      :value="sliderValue5"
      :label="'Slider with custom labels'"
      :ticks="customTick5"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import FeatherSlider from "../src/components/FeatherSlider.vue";
import { SliderTick } from "../src/types/Types";

import { FeatherIcon } from "@featherds/icon";
import Error from "@featherds/icon/notification/Error";
import Info from "@featherds/icon/action/Info";
import Warning from "@featherds/icon/notification/Warning";

const customTick1: SliderTick[] = [
  { tick: 0, label: "critical", color: "error", icon: "icon-error" },
  { tick: 1, label: "major", color: "major", icon: "icon-info" },
  { tick: 2, label: "minor", color: "minor", icon: "icon-info" },
  { tick: 3, label: "warning", color: "warning", icon: "icon-warning" },
];

const customTicks3: SliderTick[] = [
  { tick: 0, label: "Step 1", color: "" },
  { tick: 1, label: "Step 2", color: "" },
  { tick: 2, label: "step 3", color: "" },
  { tick: 3, label: "step 4", color: "" },
  { tick: 4, label: "step 5", color: "" },
];
const customTicks4: SliderTick[] = [
  { tick: 0, label: "Step 1", color: "" },
  { tick: 1, label: "Step 2", color: "" },
  { tick: 2, label: "step 3", color: "" },
];

// TODO: need to be able to import Tick type from FeatherSlider
const customTick5: SliderTick[] = [
  { tick: 0, label: "1", color: "" },
  { tick: 1, label: "2", color: "" },
  { tick: 2, label: "3", color: "" },
  { tick: 3, label: "4", color: "" },
  { tick: 4, label: "5", color: "" },
  { tick: 5, label: "6", color: "" },
  { tick: 6, label: "7", color: "" },
  { tick: 7, label: "8", color: "" },
  { tick: 8, label: "9", color: "" },
];

const sliderValue1 = ref(2);
const sliderValue2 = ref(1);
const sliderValue3 = ref(0);
const sliderValue4 = ref(1);
const sliderValue5 = ref(3);
</script>

<style lang="scss" scoped></style>
