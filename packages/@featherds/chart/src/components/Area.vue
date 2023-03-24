<template>
  <div class="chart" :width="dimensions.chart.width">
    <svg :id="id" :width="dimensions.chart.width"></svg>
  </div>
</template>
<script lang="ts" setup>
// D3 libraries
import { select } from "d3-selection";
import { area } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { timeParse } from "d3-time-format";
import { easePolyInOut } from "d3-ease";

import { PropType, onBeforeMount, onMounted, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartDimensions,
  FeatherChartOptions,
} from "./types";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartData>, required: true },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: { type: Object as PropType<FeatherChartOptions>, required: true },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { axes, data, dimensions, id, options, type } = reactive(props);

if (!options.margin) throw new Error("margin not set");

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

const parseDate = timeParse("%Y-%m-%d");
const xAccessor = (d: any) => d[axes.x];
const yAccessor = (d: any) => d[axes.y];

// ACCESSORS
// const xAccessor = (d: unknown): string => {
//   if (typeof d === "object") {
//     // return (d as object)[axes.x as keyof object];
//     // return getValue(d as object, axes.x) as string;
//     return getValue(d as object, axes.x) as string;
//   }
//   throw new Error("Unexpected x accessor");
// };

// DRAW
const draw = () => {
  // CLEAN UP
  select(`#${id}`).selectChildren().remove();

  // NOTE: X axis is typically a date format.
  // data.values.date = timeParse("%Y-%m-%d")(d.date), value: d.value)

  // REFACTOR:  data MUST BE IN THIS FORMAT. {date: "2000-01-01", 6}

  const newData: FeatherChartData = data.map((d) => {
    if (!d || typeof d === "object") {
      // convert date string to Date
      return {
        date: parseDate((d as object)[axes.x as keyof object]),
        value: (d as object)[axes.y as keyof object],
      };
    }
    throw new Error("Unexpected x accessor");
  });

  // SCALES
  const xScale = scaleTime()
    .domain(extent(newData, xAccessor) as [Date, Date]) // or Date[]
    .range([0, containerWidth]);

  const yScale = scaleLinear()
    .domain([
      0,
      max(newData, function (d) {
        return (d as any)[axes.y];
      }),
    ])
    .range([containerHeight, 0]);

  if (!options.margin) throw new Error("margin not set");

  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin.left}, ${options.margin.top})`
    );

  // AXES
  svg
    .append("g")
    .attr("transform", "translate(0," + containerHeight + ")")
    .call(axisBottom(xScale));

  svg.append("g").call(axisLeft(yScale));

  // DATA
  const theArea = area()
    .x((d: any) => xScale(xAccessor(d)))
    .y0(yScale(0))
    .y1((d: any) => yScale(yAccessor(d)));

  svg
    .append("path")
    .datum(newData)
    // .attr("fill", "#ccc")
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .ease(easePolyInOut)
    .attr("opacity", 1)
    // .attr("fill", "#89aa97")
    // .attr("fill", "#aa530e")
    .attr("stroke", "#000")
    .attr("stroke-width", 0.375)
    .attr("d", theArea as any)
    .attr("class", "categorical1 area");
};

watchEffect(() => {
  if ((data as FeatherChartData).length > 0) {
    draw();
  }
});

const isValid = () => {
  // validate data is iterable
  if (!Array.isArray(data)) {
    // console.log(`Is ${data} an Array?: ${Array.isArray(data)}`);
    throw new Error("Data is not iterable!");
  }

  // AND ensure all required props for the specified chart have been provided.
  // TODO: Validate props
  console.log(`ensure all necessary props are provided to draw ${type}`);
  return true;
  //  throw new Error("Missing props")
};

defineExpose({ draw });

onBeforeMount(() => {});

onMounted(() => {
  if (isValid()) {
    draw();
  }
});
</script>
