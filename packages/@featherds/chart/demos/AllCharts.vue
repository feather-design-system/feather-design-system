<template>
  <h1>All Charts</h1>
  <div class="chart-demo">
    <FeatherChart
      :id="dendro1Id"
      :title="dendrogram1Title"
      size="sm"
      type="dendrogram"
      :data="dendrogram1Data"
      :options="dendrogram1Options"
      @type="changeType"
      @more="more"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(dendro1Id, '1')" class="filter" text
          >View 1</FeatherButton
        >
        <FeatherButton @click="changeFilter(dendro1Id, '2')" class="filter" text
          >View 2</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="hb1Id"
      :title="horizontal1Title"
      size="sm"
      type="horizontal-bar"
      :data="horizontal1Data"
      :options="horizontal1Options"
      :axes="horizontal1Axes"
      @type="changeType"
      @more="more"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(hb1Id, '1')" class="filter" text
          >1Y</FeatherButton
        >
        <FeatherButton @click="changeFilter(hb1Id, '2')" class="filter" text
          >2Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="vb1Id"
      :title="vertical1Title"
      size="sm"
      type="vertical-bar"
      :data="vertical1Data"
      :options="vertical1Options"
      :axes="vertical1Axes"
      @type="changeType"
      @more="more"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(vb1Id, 'BOS')" class="filter" text
          >BOS</FeatherButton
        >
        <FeatherButton @click="changeFilter(vb1Id, 'PHI')" class="filter" text
          >PHI</FeatherButton
        >
      </template>
    </FeatherChart>
    <!-- <FeatherChart
      id="bar1"
      :title="bar1Title"
      size="sm"
      type="bar"
      :data="bar1Data"
      :options="bar1Options"
      :axes="bar1Axes"
      @type="changeType"
      @more="more"
    ></FeatherChart> -->
    <FeatherChart
      :id="area1Id"
      :title="area1Title"
      size="sm"
      type="area"
      :data="area1Data"
      :options="area1Options"
      :axes="area1Axes"
      @type="changeType"
      @more="more"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(area1Id, '1W')" class="filter" text
          >1W</FeatherButton
        >
        <FeatherButton @click="changeFilter(area1Id, '5Y')" class="filter" text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="radial1Id"
      type="radial"
      size="lg"
      title="Radial"
      :data="radial1Data"
      :options="radialOptions1"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(radial1Id, '3')" class="filter" text
          >Zoom 3</FeatherButton
        >
        <FeatherButton @click="changeFilter(radial1Id, '4')" class="filter" text
          >Zoom 4</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>

<script lang="ts" setup>
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartOptions,
} from "./../src/components/types";

import {
  areaDataset1,
  areaDataset2,
  dendroData1,
  dendroData2,
  hbarData2,
  hbarData3,
  radialData3,
  radialData4,
  vbarstackeddata1,
  vbarstackeddata2,
} from "./demo-data";
import { reactive } from "vue";

// DATA
const dendro1Id = "dendrogram1";
const dendrogram1Data = reactive([] as FeatherChartData);
Object.assign(dendrogram1Data, dendroData1);

const hb1Id = "horizontal1";
const horizontal1Data = reactive([] as FeatherChartData);
Object.assign(horizontal1Data, hbarData2);

const vb1Id = "vertical1";
const vertical1Data = reactive([] as FeatherChartData);
Object.assign(vertical1Data, vbarstackeddata1);

const area1Id = "area1";
const area1Data = reactive([] as FeatherChartData);
Object.assign(area1Data, areaDataset1);

// const bar1Data = reactive([] as FeatherChartData);
// Object.assign(bar1Data, bar1);

const radial1Id = "radial1";
const radial1Data = reactive([] as FeatherChartData);
Object.assign(radial1Data, radialData3);

// HANDLE EVENTS
const more = (chartId: string) => {
  console.log(`capture 'more' event for ${chartId}`);

  switch (chartId) {
    case hb1Id:
      horizontal1Data.splice(0, horizontal1Data.length);
      Object.assign(horizontal1Data, hbarData2);
      break;
    case dendro1Id:
      dendrogram1Data.splice(0, dendrogram1Data.length);
      Object.assign(dendrogram1Data, dendroData2);
      break;
    case area1Id:
      area1Data.splice(0, area1Data.length);
      Object.assign(area1Data, areaDataset1);
      break;
    case vb1Id:
      vertical1Data.splice(0, vertical1Data.length);
      Object.assign(vertical1Data, vbarstackeddata1);
      break;
    // case "bar1":
    //   bar1Data.splice(0, bar1Data.length);
    //   Object.assign(bar1Data, bar1);
    //   break;
  }
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured 'change filter' event for ${span}`);

  switch (chartId) {
    case dendro1Id:
      switch (span) {
        case "1":
          dendrogram1Data.splice(0, dendrogram1Data.length);
          Object.assign(dendrogram1Data, dendroData1);
          break;
        case "2":
          dendrogram1Data.splice(0, dendrogram1Data.length);
          Object.assign(dendrogram1Data, dendroData2);
          break;
      }
      break;
    case hb1Id:
      switch (span) {
        case "1":
          horizontal1Data.splice(0, horizontal1Data.length);
          Object.assign(horizontal1Data, hbarData2);
          break;
        case "2":
          horizontal1Data.splice(0, horizontal1Data.length);
          Object.assign(horizontal1Data, hbarData3);
          break;
      }
      break;
    case area1Id:
      switch (span) {
        case "1W":
          area1Data.splice(0, area1Data.length);
          Object.assign(area1Data, areaDataset1);
          break;
        case "5Y":
          area1Data.splice(0, area1Data.length);
          Object.assign(area1Data, areaDataset2);
          break;
      }
      break;
    case vb1Id:
      switch (span) {
        case "BOS":
          vertical1Data.splice(0, vertical1Data.length);
          Object.assign(vertical1Data, vbarstackeddata1);
          break;
        case "PHI":
          vertical1Data.splice(0, vertical1Data.length);
          Object.assign(vertical1Data, vbarstackeddata2);
          break;
      }
      break;

    case radial1Id:
      switch (span) {
        case "3":
          radial1Data.splice(0, radial1Data.length);
          Object.assign(radial1Data, radialData3);
          break;
        case "4":
          radial1Data.splice(0, radial1Data.length);
          Object.assign(radial1Data, radialData4);
          break;
      }
      break;
    // case "bar1":
    //   bar1Data.splice(0, bar1Data.length);
    //   Object.assign(bar1Data, bar2);
    //   break;
  }
};

const changeType = (chartId: string, span: string) => {
  console.log(`${chartId} captured 'change type' event for ${span}`);
};

// DATA

// DENDROGRAM
const dendrogram1Title = "Dendrogram";
const dendrogram1Options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
};

// HORIZONTAL BAR
const horizontal1Title = "Horizontal Stacked Bar Chart";
const horizontal1Axes: FeatherChartAxes = {
  x: "",
  y: "month",
};
const horizontal1Options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
};
horizontal1Options.margin = { top: 20, right: 20, bottom: 50, left: 40 };
horizontal1Options.xAxis = { tickPadding: 5, tickRotation: 0 };
horizontal1Options.yAxis = { tickPadding: 3, tickRotation: 10 };

// BAR v2
const vertical1Title = "Stacked Bar Chart";
const vertical1Axes: FeatherChartAxes = {
  x: "year",
  y: "",
};
const vertical1Options: FeatherChartOptions = { ...horizontal1Options };
vertical1Options.margin = { top: 20, right: 20, bottom: 50, left: 35 };
vertical1Options.xAxis = { tickPadding: 10 };
vertical1Options.yAxis = { tickPadding: 10 };

// AREA
const area1Title = "Area Chart";
const area1Axes: FeatherChartAxes = {
  x: "date",
  y: "value",
};
const area1Options: FeatherChartOptions = { ...horizontal1Options };

const radialOptions1: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
};
</script>
<style lang="scss">
.chart-demo {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
