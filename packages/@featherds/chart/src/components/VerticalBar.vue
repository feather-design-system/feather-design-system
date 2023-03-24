<template>
  <div class="chart" :width="containerWidth">
    <svg :id="id" :width="containerWidth"></svg>
  </div>
</template>
<script lang="ts" setup>
// D3 libraries
import { select } from "d3-selection";
import { stack } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { transition } from "d3-transition";
import { easeLinear } from "d3-ease";

import { getValue } from "./Data";
import { onMounted, PropType, reactive, watchEffect } from "vue";
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
  options: {
    type: Object as PropType<FeatherChartOptions>,
    required: true,
  },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { axes, data, dimensions, id, options } = reactive(props);

if (!options.margin) throw new Error("margin not set");

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

// ACCESSORS
// TODO:  Should we require user to pass these accessor functions?
// NOTE:  USE GETVALUE FUNCTION THAT CAN RETRIEVE VALUE
// FROM DOT NOTATION PATH (i.e. "stats.age" or "state.county.city")
const xAccessor = (d: unknown): string => {
  if (typeof d === "object") {
    // return (d as object)[axes.x as keyof object];
    return getValue(d as object, axes.x) as string;
  }
  throw new Error("Unexpected x accessor");
};

const xStackedAccessor = (d: any): string => {
  if (typeof d === "object") {
    return getValue(d.data, "data." + axes.x) as string;
  }
  throw new Error("Unexpected x stacked accessor");
};

// const yAccessor = (d: unknown): number => {
//   if (typeof d === "object") {
//     // return (d as object)[axes.y as keyof object];
//     return getValue(d as object, axes.y) as number;
//   }
//   throw new Error("Unexpected y accessor");
// };

// DRAW
const draw = () => {
  // DATA
  const keyList = Object.keys((data as any)[0]).filter((d) => d != axes.x);
  const keyGroup = (data as FeatherChartData).map((d) => xAccessor(d));

  const stackedData = stack().keys(keyList)(data as any);

  // SCALES
  const xScale = scaleBand()
    .domain(keyGroup)
    .range([0, containerWidth])
    .padding(0.25);

  const yMax = max(
    stackedData[stackedData.length - 1] as any,
    (d: any) => d[1]
  );
  const yScale = scaleLinear()
    .domain([0, yMax as any])
    .nice()
    .range([containerHeight, 0]);

  const xAnimation = transition().duration(500);
  const yAnimation = transition().duration(500);

  if (!options.margin) throw new Error("margin not set");

  // CLEAN UP
  select(`#${id}`).selectChildren().remove();

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin.left}, ${options.margin.top})`
    );

  // DRAW BARS
  const layers = svg.selectAll("g").data(stackedData).join("g");

  // AXES
  // TODO:  enhance tick rotation for all charts
  const xAxisTickPadding = options.xAxis?.tickPadding || 0;
  const xAxisTickRotation = options.xAxis?.tickRotation || 0;
  const yAxisTickPadding = options.yAxis?.tickPadding || 0;
  const yAxisTickRotation = options.yAxis?.tickRotation || 0;

  svg
    .append("g")
    .classed("yAxis", true)
    .transition(yAnimation)
    .call(
      axisLeft(yScale)
        .ticks(6)
        .tickPadding(yAxisTickPadding)
        .tickSize(-containerWidth)
    )
    .selectAll("text")
    .attr("transform", `rotate(${yAxisTickRotation})`);

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0, ${containerHeight})`)
    .transition(xAnimation)
    .call(axisBottom(xScale).tickPadding(xAxisTickPadding))
    .selectAll("text")
    .attr("transform", `rotate(${xAxisTickRotation})`);

  // transition for bars
  const duration = 500;
  const t = transition().duration(duration).ease(easeLinear);

  layers.each(function (_, i) {
    select(this)
      .selectAll(".bar")
      .data((d: any) => d)
      .join("rect")
      .attr("class", `${id} categorical${i + 1}`)
      .attr("x", (d) => {
        return xScale(xStackedAccessor(d)) as any;
      })
      .attr("y", (d) => yScale((d as any)[1]))
      .attr("width", xScale.bandwidth())
      .attr("tabindex", "0")
      .transition(t)
      // .delay(i * duration)
      .attr("height", (d) => yScale((d as any)[0]) - yScale((d as any)[1]));
  });
};

watchEffect(() => {
  if ((data as FeatherChartData).length > 0) {
    draw();
  }
});

// const isValid = () => {
//   // validate data is iterable
//   if (!Array.isArray(data)) {
//     console.log(`Is ${data} an Array?: ${Array.isArray(data)}`);
//     throw new Error("Data is not iterable!");
//   }

//   // AND ensure all required props for the specified chart have been provided.
//   // console.log(`ensure all necessary props are provided to draw ${type}`);
//   return true;
//   //  throw new Error("Missing props")
// };

defineExpose({ draw });

onMounted(() => {
  draw();
});
</script>
