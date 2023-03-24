<template>
  <div>
    <FeatherChart
      :id="id"
      title="Force Directed Graph"
      :data="data as FeatherChartFlexibleData"
      type="force-directed"
      size="md"
      :options="options"
      @type="changeType"
      @more-event="more"
      @refresh-event="refresh"
    >
      <template v-slot:filter>
        <FeatherButton text @click="changeFilter(`${id}`, 'BOS')"
          >boston</FeatherButton
        >
        <FeatherButton text @click="changeFilter(`${id}`, 'DUR')"
          >durham</FeatherButton
        >
        <FeatherButton text @click="changeFilter(`${id}`, 'PHI')"
          >philadelphia</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { FeatherChart } from "../src";
import { FeatherButton } from "@featherds/button";
import {
  FeatherChartFlexibleData,
  FeatherChartForceDirectedData,
  FeatherChartOptions,
} from "../src/components/types";

import {
  dataForForceDirectedGraph,
  // dataForForceDirectedGraph2,
  dataForForceDirectedGraph3,
  openNMSData,
} from "./demo-data";
import {
  schemeCategory10,
  schemePaired,
  schemePastel1,
  schemeSet3,
  schemeTableau10,
} from "d3-scale-chromatic";

const id = "forceDirected1";

let options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  colorScheme: undefined,
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
};

options.colorScheme = [...schemeTableau10];
options.colorScheme = [...schemeCategory10];
options.colorScheme = [...schemeSet3];
options.colorScheme = [...schemePastel1];
options.colorScheme = [...schemePaired];
options.colorScheme = undefined; // feather-categorical-colors (limit 10 colors)
// options.colorScheme = [
//   "blue",
//   "white",
//   "navy",
//   "cornflowerblue",
//   "royalblue",
//   "skyblue",
//   "lightblue",
//   "darkblue",
//   "deepskyblue",
//   "dodgerblue",
//   "beige",
//   "red",
// ];

let data = reactive({ ...dataForForceDirectedGraph });

const changeType = () => {
  console.log("changeType");
};

const changeFilter = (id: string, button: string) => {
  console.log("changeFilter", id, button);

  let curData: FeatherChartForceDirectedData;
  switch (button) {
    case "BOS":
      curData = JSON.parse(JSON.stringify(dataForForceDirectedGraph));
      Object.assign(data, curData);
      break;
    case "DUR":
      curData = JSON.parse(JSON.stringify(openNMSData));
      Object.assign(data, curData);
      break;
    case "PHI":
      curData = JSON.parse(JSON.stringify(dataForForceDirectedGraph3));
      Object.assign(data, curData);
      break;
    default:
      break;
  }
};

const more = (id: string, currentData: FeatherChartForceDirectedData) => {
  console.log("Force Directed Graph Demo more-event", `${id}`, currentData);
  const curData = JSON.parse(JSON.stringify(currentData));
  Object.assign(data, curData);
};

const refresh = (id: string, currentData: FeatherChartForceDirectedData) => {
  console.log("Force Directed Graph Demo refresh-event", `${id}`, currentData);
  const curData = JSON.parse(JSON.stringify(currentData));
  Object.assign(data, curData);
};
</script>

<style scoped></style>
