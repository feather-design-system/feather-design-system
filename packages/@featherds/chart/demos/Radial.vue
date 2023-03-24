<template>
  <div>
    <FeatherChart
      :id="radialId"
      type="radial"
      size="xl"
      title="Radial"
      :data="radialData"
      :options="radialOptions1"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(radialId, '1')" class="filter" text
          >Zoom 1</FeatherButton
        >
        <FeatherButton @click="changeFilter(radialId, '2')" class="filter" text
          >Zoom 2</FeatherButton
        >
        <FeatherButton @click="changeFilter(radialId, '3')" class="filter" text
          >Zoom 3</FeatherButton
        >
        <FeatherButton @click="changeFilter(radialId, '4')" class="filter" text
          >Zoom 4</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherTextarea v-model="userInput" label="Dynamic Chart Data" rows="10">
    </FeatherTextarea>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import FeatherChart from "../src/components/FeatherChart.vue";
import { FeatherTextarea } from "@featherds/textarea";
import { FeatherButton } from "@featherds/button";
import { FeatherChartData, FeatherChartOptions } from "../src/components/types";
import {
  radialData1,
  radialData2,
  radialData3,
  radialData4,
} from "./demo-data";

const radialId = "radial1";
// DATA
const radialData = reactive([] as FeatherChartData);
Object.assign(radialData, radialData1);
const userInput = ref(JSON.stringify(radialData1));

const radialOptions1: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1":
      userInput.value = JSON.stringify(radialData1);
      radialData.splice(0, radialData.length);
      Object.assign(radialData, radialData1);
      break;
    case "2":
      userInput.value = JSON.stringify(radialData2);
      radialData.splice(0, radialData.length);
      Object.assign(radialData, radialData2);
      break;
    case "3":
      userInput.value = JSON.stringify(radialData3);
      radialData.splice(0, radialData.length);
      Object.assign(radialData, radialData3);
      break;
    case "4":
      userInput.value = JSON.stringify(radialData4);
      radialData.splice(0, radialData.length);
      Object.assign(radialData, radialData4);
      break;
  }
};

watch(userInput, (newInput, _oldInput) => {
  Object.assign(radialData, JSON.parse(newInput));
});
</script>
