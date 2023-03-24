<template>
  <div class="demo">
    <FeatherChart
      :id="hb1Id"
      type="horizontal-bar"
      :title="hbarTitle"
      :data="horizontalBarData as FeatherChartFlexibleData"
      :size="'md'"
      :options="options"
      :axes="axes"
      @type="changeType"
      @more-event="more"
      @refresh-event="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(hb1Id, 'TODAY')"
          class="filter filterToday"
          text
          >TODAY</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(hb1Id, '1Y')"
          class="filter filter1y"
          text
          >1Y</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(hb1Id, '2Y')"
          class="filter filter2y"
          text
          >2Y</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";

import {
  FeatherChartAxes,
  FeatherChartBarData,
  // FeatherChartData,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "./../src/components/types";
import { hbarData1, hbarData2, hbarData3 } from "./demo-data";

const axes: FeatherChartAxes = {
  x: "",
  y: "month",
};
const options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 44,
  },
  xAxis: {
    tickPadding: 5,
    tickRotation: 0,
  },
  yAxis: {
    tickPadding: 5,
    tickRotation: 0,
  },
};

const hb1Id = "horizontalbar1";
let hbarTitle = "Horizontal Bar Chart";

// DATA
const horizontalBarData = reactive({} as FeatherChartBarData);
Object.assign(horizontalBarData, hbarData1);

// HANDLE EVENTS
const more = (chartId: string, data: FeatherChartBarData) => {
  console.log(`capture more filter event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  horizontalBarData.data.splice(0, horizontalBarData.data.length);
  Object.assign(horizontalBarData, copy);
};

const refresh = (chartId: string, data: FeatherChartBarData) => {
  console.log(`capture refresh event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  horizontalBarData.data.splice(0, horizontalBarData.data.length);
  Object.assign(horizontalBarData, copy);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  let copy: FeatherChartBarData;

  switch (span.toUpperCase()) {
    case "TODAY":
      copy = JSON.parse(JSON.stringify(hbarData1));
      Object.assign(horizontalBarData, copy);
      break;
    case "1Y":
      copy = JSON.parse(JSON.stringify(hbarData2));
      Object.assign(horizontalBarData, copy);
      break;
    case "2Y":
      copy = JSON.parse(JSON.stringify(hbarData3));
      Object.assign(horizontalBarData, copy);
      break;
  }
};
const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  horizontalBarData.data.splice(0, horizontalBarData.data.length);
  Object.assign(horizontalBarData, hbarData1);
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
