<template>
  <div class="demo">
    <FeatherChart
      :id="chartWithToggle"
      ref="chartRef"
      :type="(chartType as FeatherChartType)"
      :title="title"
      :data="chartData"
      size="md"
      :options="options"
      :axes="axes"
      @more="more"
    >
      <template #type>
        <FeatherToggleButton
          id="chartTypeToggle"
          :buttons="buttons"
          @toggleButtonClick="changeChartType"
          :selected="0"
        >
        </FeatherToggleButton>
      </template>
      <template #filter>
        <FeatherButton @click="changeFilter('1Y')" class="filter filter1y" text
          >1Y</FeatherButton
        >
        <FeatherButton @click="changeFilter('2Y')" class="filter filter2y" text
          >2Y</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import { FeatherToggleButton } from "@featherds/toggle-button";

import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartInterface,
  FeatherChartOptions,
  FeatherChartType,
} from "./../src/components/types";
import { vbarstackeddata1, vbarstackeddata2 } from "./demo-data";

const buttons = [{ label: "Horizontal" }, { label: "Vertical" }];

let axes: FeatherChartAxes = {
  x: "",
  y: "year",
};
const options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 40,
  },
  xAxis: {
    tickPadding: 10,
    tickRotation: 0,
  },
  yAxis: {
    tickPadding: 5,
    tickRotation: 15,
  },
};

const chartWithToggle = "chartWithToggle";
let title = "Chart with Toggle";

const chartRef = ref(null);

let chartType = ref("horizontal-bar");

// DATA
let chartData = reactive([] as FeatherChartData);
Object.assign(chartData, vbarstackeddata1);

// HANDLE EVENTS
const more = () => {
  chartData.splice(0, chartData.length);
  Object.assign(chartData, vbarstackeddata1);
};
const changeFilter = (span: string) => {
  // console.log(`${chartId} captured change filter event for ${span}`);

  switch (span.toUpperCase()) {
    case "1Y":
      chartData.splice(0, chartData.length);
      Object.assign(chartData, vbarstackeddata1);
      break;
    case "2Y":
      chartData.splice(0, chartData.length);
      Object.assign(chartData, vbarstackeddata2);
      break;
  }
};
const changeChartType = (parentId: string, childId: string, label: string) => {
  console.log(parentId, childId, label.toLowerCase());

  switch (label.toLowerCase()) {
    case "horizontal":
      axes.x = "";
      axes.y = "year";
      chartType.value = "horizontal-bar";
      break;

    case "vertical":
      axes.x = "year";
      axes.y = "";
      chartType.value = "vertical-bar";
      break;

    default:
      throw new Error("unhandled chart type");
  }
  if (chartRef.value) {
    (chartRef.value as FeatherChartInterface).setChartType(
      chartType.value as FeatherChartType
    );
  }
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
