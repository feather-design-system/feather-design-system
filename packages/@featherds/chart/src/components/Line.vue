<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-line-svg"
    :class="zoomLevel"
  ></svg>

  <!-- <p>Size: {{ size }}</p>
    <p>ID: {{ id }}</p>
    <p>Title: {{ title }}</p>
    <p>Type: {{ type }}</p>
    <p>Dimensions: {{ dimensions }}</p>
    <p>Options: {{ options }}</p>
    <p>Axes: {{ axes }}</p>
    <p>Data: {{ data }}</p> -->
</template>
<script lang="ts" setup>
import {
  PropType,
  Ref,
  computed,
  inject,
  onMounted,
  toRefs,
  watchEffect,
} from "vue";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft, axisRight } from "d3-axis";
// import { scaleLinear, scaleTime } from "d3-scale";
// import { extent, max } from "d3-array";
import { transition } from "d3-transition";
import { easePolyInOut } from "d3-ease";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartLineData,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";
import { useXYSeries } from "../composables/useXYSeries";
import type { Row, NormRow } from "../utils/data";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartLineData>, required: true },
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

const { axes, data, dimensions, id, options, type } = toRefs(props);

const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

if (!options.value.margin) throw new Error("margin not set");

const containerWidth = computed(() => {
  if (!options.value.margin) throw new Error("margin not set (containerWidth)");
  return (
    dimensions.value.chart.width -
    (options.value.margin.left + options.value.margin.right)
  );
});
const containerHeight = computed(() => {
  if (!options.value.margin)
    throw new Error("margin not set (containerHeight)");
  return (
    dimensions.value.chart.height -
    (options.value.margin.top + options.value.margin.bottom)
  );
});

const rowsRef = computed<Row[]>(() => (data.value.data as Row[]) ?? []);
const axesRef = computed(() => ({
  x: axes.value.x,
  y: axes.value.y,
}));

const {
  data: series,
  xScale,
  yScale,
} = useXYSeries(rowsRef, axesRef, containerWidth, containerHeight);

const draw = () => {
  // Clean up existing
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;
  console.log(`draw ${type.value}`);
  if (!isValid()) throw new Error("Invalid data");

  // Skip rendering if normalized series is empty
  if (!series.value.length) {
    return;
  }

  if (!options.value.margin) throw new Error("Margin not set");

  // SCALES
  // const xScale = scaleTime()
  //   .domain(extent(validData, (d) => d.date) as [Date, Date])
  //   .range([0, containerWidth.value]);
  // const yScale = scaleLinear()
  //   .domain([0, max(validData, (d: any) => d.value) as number])
  //   .range([containerHeight.value, 0]);

  // AXES
  const xAxisTickPadding = options.value.xAxis?.tickPadding || 0;
  const xAxisTickRotation = options.value.xAxis?.tickRotation || 0;

  const yAxisTickPadding = options.value.yAxis?.tickPadding || 0;
  const yAxisTickRotation = options.value.yAxis?.tickRotation || 0;

  const svg = select(`#${id.value}`)
    .attr("width", dimensions.value.chart.width)
    .attr("height", dimensions.value.chart.height)
    .attr(
      "viewBox",
      `0 0 ${dimensions.value.chart.width} ${dimensions.value.chart.height}`
    )
    .attr("style", "max-width: 100%; height: auto;") // TODO:  move to css
    .attr("tabindex", 0)
    .append("g")
    /* TODO: Move to css */
    .attr(
      "transform",
      `translate(${options.value.margin.left}, ${options.value.margin.top})`
    );

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0, ${containerHeight.value})`)
    .call(
      axisBottom(xScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(xAxisTickPadding)
    )
    .selectAll("text")
    .attr("transform", `rotate(${xAxisTickRotation})`);

  svg
    .append("g")
    .classed("yAxis", true)
    .call(
      axisLeft(yScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(yAxisTickPadding)
    )
    .selectAll("text")
    .attr("transform", `rotate(${yAxisTickRotation})`);

  svg
    .append("g")
    .classed("yAxis", true)
    .attr("transform", `translate(${containerWidth.value}, 0)`)
    .call(
      axisRight(yScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(yAxisTickPadding)
    )
    .selectAll("text")
    .attr("transform", `rotate(${yAxisTickRotation})`);

  // Setup line generator
  const lineGenerator = line<NormRow>()
    .x((d) => {
      const xs = xScale.value as any; // time/linear/point
      return xs(d.x as any) ?? 0;
    })
    .y((d) => yScale.value(d.y));

  svg
    .append("path")
    .classed("line", true)
    .datum(series.value)
    .attr("fill", "none")
    .attr("pathLength", 1)
    .attr("d", lineGenerator as any);

  transition(svg as any)
    .duration(1000)
    .ease(easePolyInOut)
    .attr("opacity", 1);

  setDynamicScope(`#${id.value}`);
};

const isValid = () => {
  return true;
};

defineExpose({ draw });

watchEffect(() => {
  if (data.value.data.length > 0) {
    console.log("Let's draw()'");
    draw();
  }
});

onMounted(() => {
  draw();
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.feather-line-svg {
  .line {
    stroke: var(vars.$categorical5);
    stroke-width: 2;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: line-draw 3s ease-in-out forwards;
  }
}

@keyframes line-draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
