<template>
  <div>
    <FeatherSelect
      :label="labelForSelect"
      :options="months"
      class="month"
    > </FeatherSelect>

    <h1>D3 Chart</h1>
    <h3>Using Entire d3 library</h3>
    <p>Need to import only the specific d3 libraries necessary to render the chart</p>
    <FeatherChartD3
      id="chart1"
      :data="personData"
      :dimensions="dimensions"
      :options="chartOptions1"
      :axes="chartAxes1"
      summary="Years Experience"
    ></FeatherChartD3>
    <FeatherChartD3
      id="chart1b"
      :data="personData"
      :dimensions="dimensions1b"
      :options="chartOptions1b"
      :axes="chartAxes1b"
      summary="Hours Logged"
    ></FeatherChartD3>
    <FeatherChartD3
      id="chart2"
      :data="serverData"
      :dimensions="dimensions2"
      :options="chartOptions2"
      :axes="chartAxes2"
      summary="Count of HTTP '500' Server Errors"
    ></FeatherChartD3>
    <FeatherChartD3
      id="chart2b"
      :data="serverData"
      :dimensions="dimensions2b"
      :options="chartOptions2b"
      :axes="chartAxes2b"
      summary="Count of Successful Transactions"
    ></FeatherChartD3>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FeatherChartD3 } from "./../src";
import {
  ICoordinateAxes,
  FeatherD3Options,
  FeatherD3Data,
  FeatherD3Dimensions
} from "../src/components/types";
import { FeatherSelect } from "@featherds/select";

const labelForSelect = ref("Month");

const months = reactive([
  { _text: "January" },
  { _text: "February" },
  { _text: "March" },
  { _text: "April" },
  { _text: "May" },
  { _text: "June" },
  { _text: "July" },
  { _text: "August" },
  { _text: "September" },
  { _text: "October" },
  { _text: "November" },
  { _text: "December" },
]);

// Data
const personData: FeatherD3Data = [
  { "person": "Brian", "project": { "experience": 12, "hours": 133 } },
  { "person": "Amanda", "project": { "experience": 7, "hours": 43 } },
  { "person": "Cara", "project": { "experience": 26, "hours": 75 } },
  { "person": "Charles", "project": { "experience": 15, "hours": 31 } },
  { "person": "Jeff", "project": { "experience": 20, "hours": 45 } },
  { "person": "Clarissa", "project": { "experience": 8, "hours": 92 } },
  { "person": "Todd", "project": { "experience": 8, "hours": 50 } }
];

const serverData: FeatherD3Data = [
  { svr: { tx: "Auths", evt: { "200": 10751, "404": 1024, "500": 105 } } },
  { svr: { tx: "Claims", evt: { "200": 2489, "404": 15, "500": 6 } } },
  { svr: { tx: "Login", evt: { "200": 5491, "404": 42, "500": 2 } } },
];

// Default dimensions
const dimensions: FeatherD3Dimensions = {
  height: 250,
  width: 500,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30,
  }
};

// Chart 1
const chartOptions1: FeatherD3Options = {
  class: "color1",
  units: "years of experience",
};

const chartAxes1: ICoordinateAxes = {
  x: "person",
  y: "project.experience"
};

// Chart 1b
const chartOptions1b: FeatherD3Options = { ...chartOptions1 };
chartOptions1b.class = "color2";
chartOptions1b.units = "hours worked";

const chartAxes1b: ICoordinateAxes = {
  x: "person",
  y: "project.hours"
}
const dimensions1b = { ...dimensions };
dimensions1b.height = 250;
dimensions1b.width = 1000;

// Chart 2
let chartOptions2: FeatherD3Options = { ...chartOptions1 };
chartOptions2.class = "color1";
chartOptions2.units = "unknown server errors";

const chartAxes2: ICoordinateAxes = {
  x: "svr.tx",
  y: "svr.evt.500"
}
const dimensions2 = { ...dimensions };

// Chart 2b
let chartOptions2b: FeatherD3Options = { ...chartOptions1 };
chartOptions2b.class = "color2";
chartOptions2b.units = "successful transactions";

const chartAxes2b: ICoordinateAxes = {
  x: "svr.tx",
  y: "svr.evt.200"
}
let dimensions2b = { ...dimensions };
dimensions2b.margin.left += 20;
</script>
<style lang="scss" scoped></style>

<style lang="scss">
div.feather-input-wrapper {
  border: none;
}

.month {
  width: 10em;
}
</style>
