<template>
  <div class="demo">
    <FeatherChart
      :id="chartWithToggle"
      ref="chartRef"
      :type="(chartType as FeatherChartType)"
      :title="title"
      :data="chartData as FeatherChartFlexibleData"
      size="md"
      :options="options"
      :axes="axes"
      @more-event="more"
      @refresh-event="refresh"
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
        <FeatherButton
          @click="changeDataFilter('1Y')"
          class="filter filter1y"
          text
          >1Y</FeatherButton
        >
        <FeatherButton
          @click="changeDataFilter('2Y')"
          class="filter filter2y"
          text
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
  FeatherChartBarData,
  FeatherChartFlexibleData,
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
let chartData = reactive({} as FeatherChartBarData);
Object.assign(chartData, vbarstackeddata1);

// HANDLE EVENTS
const more = (id: string, data: FeatherChartBarData) => {
  console.log(`captured more filter event for ${id}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  chartData.data.splice(0, chartData.data.length);
  Object.assign(chartData, copy);
};

const refresh = (id: string, data: FeatherChartBarData) => {
  console.log(`captured refresh event for ${id}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  chartData.data.splice(0, chartData.data.length);
  Object.assign(chartData, copy);
};

const changeDataFilter = (span: string) => {
  // console.log(`${chartId} captured change filter event for ${span}`);

  let newData: FeatherChartBarData;

  switch (span.toUpperCase()) {
    case "1Y":
      newData = JSON.parse(JSON.stringify(vbarstackeddata1));
      Object.assign(chartData, newData);
      break;
    case "2Y":
      newData = JSON.parse(JSON.stringify(vbarstackeddata2));
      Object.assign(chartData, newData);
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
