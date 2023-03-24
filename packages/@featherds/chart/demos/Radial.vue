<template>
  <div>
    <FeatherChart
      :id="radialId"
      type="radial"
      size="xl"
      title="Radial"
      :data="radialData as FeatherChartFlexibleData"
      :options="radialOptions1"
      @refresh-event="refresh"
      @more-event="more"
    >
      <template #filter>
        <FeatherButton
          @click="changeDataFilter(radialId, '1')"
          class="filter"
          text
          >Level 1</FeatherButton
        >
        <FeatherButton
          @click="changeDataFilter(radialId, '2')"
          class="filter"
          text
          >Level 2</FeatherButton
        >
        <FeatherButton
          @click="changeDataFilter(radialId, '3')"
          class="filter"
          text
          >Level 3</FeatherButton
        >
        <FeatherButton
          @click="changeDataFilter(radialId, '4')"
          class="filter"
          text
          >Level 4</FeatherButton
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
import {
  FeatherChartFlexibleData,
  FeatherChartOptions,
  FeatherChartRadialData,
} from "../src/components/types";
import {
  radialData1,
  radialData2,
  radialData3,
  radialData4,
} from "./demo-data";

const radialId = "radial1";
// DATA
const radialData = reactive({} as FeatherChartRadialData);
Object.assign(radialData, radialData1);
const userInput = ref(JSON.stringify(radialData1.data));

const radialOptions1: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
};

const changeDataFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1":
      userInput.value = JSON.stringify(radialData1);
      Object.assign(radialData, radialData1.data);
      break;
    case "2":
      userInput.value = JSON.stringify(radialData2);
      Object.assign(radialData, radialData2.data);
      break;
    case "3":
      userInput.value = JSON.stringify(radialData3);
      Object.assign(radialData, radialData3.data);
      break;
    case "4":
      userInput.value = JSON.stringify(radialData4);
      Object.assign(radialData, radialData4.data);
      break;
  }
};

const refresh = (chartId: string, data: FeatherChartRadialData) => {
  console.log(`capture refresh event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(radialData, copy);
};

const more = (chartId: string, data: FeatherChartRadialData) => {
  console.log(`capture more filter event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(radialData, copy);
};

watch(userInput, (newInput /*, _oldInput*/) => {
  Object.assign(radialData, JSON.parse(newInput));
});
</script>
