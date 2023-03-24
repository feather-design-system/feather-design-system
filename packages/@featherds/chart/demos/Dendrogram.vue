<template>
  <div class="demo">
    <FeatherChart
      :id="dendroId"
      title="Dendrogram"
      size="sm"
      :data="hierarchicalData"
      type="dendrogram"
      :axes="dendroAxes"
      :options="dendroOptions"
      @type="changeType"
      @more="more"
    >
      <!-- @filter="changeFilter" -->
      <template #filter>
        <FeatherButton @click="changeFilter(dendroId, '1')" class="filter" text
          >View 1</FeatherButton
        >
        <FeatherButton @click="changeFilter(dendroId, '2')" class="filter" text
          >View 2</FeatherButton
        >
        <FeatherButton @click="changeFilter(dendroId, '3')" class="filter" text
          >View 3</FeatherButton
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

import { dendroData1, dendroData2, dendroData3 } from "./demo-data";

const dendroId = "dendro";

const dendroAxes: FeatherChartAxes = {
  x: "year",
  y: "",
};
const dendroOptions: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 33,
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
const hierarchicalData = reactive([] as FeatherChartData);
Object.assign(hierarchicalData, dendroData1);

// HANDLE EVENTS
const more = (chartId: string) => {
  console.log(`capture more filter event for ${chartId}`);
  hierarchicalData.splice(0, hierarchicalData.length);
  Object.assign(hierarchicalData, dendroData1);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1":
      hierarchicalData.splice(0, hierarchicalData.length);
      Object.assign(hierarchicalData, dendroData1);
      break;
    case "2":
      hierarchicalData.splice(0, hierarchicalData.length);
      Object.assign(hierarchicalData, dendroData2);
      break;
    case "3":
      hierarchicalData.splice(0, hierarchicalData.length);
      Object.assign(hierarchicalData, dendroData3);
      break;
  }
};

const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  hierarchicalData.splice(0, hierarchicalData.length);
  Object.assign(hierarchicalData, dendroData3);
};
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
