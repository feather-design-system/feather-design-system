<template>
  <div>
    <FeatherDashboard
      :id="`dashboard-1`"
      :colNum="16"
      :items="items"
    ></FeatherDashboard>
  </div>
</template>

<script setup lang="ts">
import { markRaw, ref } from "vue";
import FeatherDashboard from "../src/components/FeatherDashboard.vue";
import { FeatherCard } from "@featherds/card";

import FeatherChart from "../../chart/src/components/FeatherChart.vue";
import {
  dataForForceDirectedGraph,
  dendroData2,
  gaugeData10,
  hbarData1,
  hbarData2,
  line3SeriesNumbersWide,
} from "../../chart/demos/demo-data";
import type {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../../chart/src/components/types";

const chart2axes: FeatherChartAxes = {
  x: "",
  y: "month",
};

const chart2options: FeatherChartOptions = {
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

const items = ref([
  {
    i: "0",
    x: 0,
    y: 0,
    w: 5,
    h: 3,
    static: true,
    component: markRaw(FeatherCard),
    props: { title: "Node Dashboard", subtitle: "Good Morning, Ted." },
  },
  {
    i: "1",
    x: 5,
    y: 11,
    w: 5,
    h: 10,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-1",
      type: "dendrogram",
      data: dendroData2,
      title: "Dendrogram",
      onMoreEvent: () => handleMoreEvent,
    },
  },
  {
    i: "2",
    x: 5,
    y: 0,
    w: 5,
    h: 11,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-2",
      type: "horizontal-bar",
      data: hbarData1 as FeatherChartFlexibleData,
      title: "Bar Chart",
      options: chart2options,
      axes: chart2axes,
      size: "md",
      onMoreEvent: () => handleMoreEvent,
    },
  },
  {
    i: "3",
    x: 0,
    y: 10,
    w: 5,
    h: 7,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-3",
      type: "horizontal-bar",
      data: hbarData2 as FeatherChartBarData,
      title: "Trends",
      size: "xl",
      options: chart2options,
      axes: chart2axes,
      onMoreEvent: () => handleMoreEvent,
    },
  },
  {
    i: "4",
    x: 0,
    y: 3,
    w: 2,
    h: 4,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-4",
      type: "force-directed",
      data: dataForForceDirectedGraph as FeatherChartFlexibleData,
      size: "md",
      title: "Force Directed",
      onMoreEvent: () => handleMoreEvent,
    },
  },
  {
    i: "5",
    x: 0,
    y: 17,
    w: 5,
    h: 6,
    static: false,
    content: `
    <p>More work needed...</p>
    <ul>
      <li>Lots of work needed on the individual chart components.</li>
      <li>Improve responsiveness and layout handling.</li>
      <li>Dragging on dashboard interferes with dragging on charts.</li>
      <li>Need to add more chart types.</li>
      <li>Need to add more dashboard widgets.</li>
      <li>Locking dashboard for dragging allows dragging in the chart area.</li>
      <li>Collapse FeatherChart menus (media query)

    </ul>

    `,
  },
  {
    i: "6",
    x: 2,
    y: 5,
    w: 3,
    h: 6,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-5",
      type: "line",
      data: line3SeriesNumbersWide as FeatherChartFlexibleData,
      size: "md",
      title: "Line Chart",
      axes: { x: "sales", y: "" },
      onMoreEvent: () => handleMoreEvent,
    },
  },
  {
    i: "7",
    x: 5,
    y: 5,
    w: 5,
    h: 10,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-6",
      type: "vertical-bar",
      data: line3SeriesNumbersWide as FeatherChartFlexibleData,
      size: "md",
      title: "Vertical Bar Chart",
      axes: { x: "sales", y: "" },
    },
  },
  {
    i: "8",
    x: 5,
    y: 2,
    w: 5,
    h: 6,
    static: false,
    component: markRaw(FeatherChart),
    props: {
      id: "chart-7",
      type: "gauge",
      data: gaugeData10 as FeatherChartFlexibleData,
      size: "xl",
      title: "Gauge Chart",
    },
  },
]) as any; // TODO:  Make FeatherLayout type-safe

const handleMoreEvent = (event: any) => {
  console.log("More event triggered:", event);
};
</script>

<style scoped></style>
