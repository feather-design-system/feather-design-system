<template>
  <div class="demo">
    <FeatherChart
      :id="areaId"
      title="Simple Area Chart"
      size="md"
      :data="areaData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, '1W')"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartOptions,
} from "./../src/components/types";

import { areaDataset1, areaDataset2 } from "./demo-data";
// import { watchEffect } from "vue";

const areaId = "area";

const axes: FeatherChartAxes = {
  x: "date",
  y: "value",
};
const areaOptions: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 40,
  },
  xAxis: {
    tickPadding: 0,
    tickRotation: 0,
  },
  yAxis: {
    tickPadding: 0,
    tickRotation: 0,
  },
};

// DATA
const areaData = reactive([] as FeatherChartData);
Object.assign(areaData, areaDataset1);
console.log(areaData);

// HANDLE EVENTS
const more = (chartId: string) => {
  console.log(`capture more filter event for ${chartId}`);
  areaData.splice(0, areaData.length);
  Object.assign(areaData, areaDataset1);
};
const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1W":
      areaData.splice(0, areaData.length);
      Object.assign(areaData, areaDataset1);
      break;
    case "5Y":
      areaData.splice(0, areaData.length);
      Object.assign(areaData, areaDataset2);
      break;
  }
};
</script>
