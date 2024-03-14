<template>
  <div class="demo">
    <FeatherChart
      :id="hb1Id"
      type="horizontal-bar"
      :title="hbarTitle"
      :data="horizontalBarData"
      size="md"
      :options="options"
      :axes="axes"
      @type="changeType"
      @more="more"
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
  FeatherChartData,
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
    left: 33,
  },
  xAxis: {
    tickPadding: 3,
    tickRotation: 25,
  },
  yAxis: {
    tickPadding: 3,
    tickRotation: -15,
  },
};

const hb1Id = "horizontalbar1";
let hbarTitle = "Horizontal Bar Chart";

// DATA
const horizontalBarData = reactive([] as FeatherChartData);
Object.assign(horizontalBarData, hbarData1);

// HANDLE EVENTS
const more = (chartId: string) => {
  console.log(`capture more filter event for ${chartId}`);
  horizontalBarData.splice(0, horizontalBarData.length);
  Object.assign(horizontalBarData, hbarData1);
};
const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span.toUpperCase()) {
    case "TODAY":
      horizontalBarData.splice(0, horizontalBarData.length);
      Object.assign(horizontalBarData, hbarData1);
      break;
    case "1Y":
      horizontalBarData.splice(0, horizontalBarData.length);
      Object.assign(horizontalBarData, hbarData2);
      break;
    case "2Y":
      horizontalBarData.splice(0, horizontalBarData.length);
      Object.assign(horizontalBarData, hbarData3);
      break;
  }
};
const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  horizontalBarData.splice(0, horizontalBarData.length);
  Object.assign(horizontalBarData, hbarData1);
  console.log(horizontalBarData);
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
