<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-vertical-bar-svg"
    :class="zoomLevel"
  ></svg>
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
import { inject, onMounted, PropType, reactive, Ref, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartDimensions,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartBarData>, required: true },
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

const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

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
  const keyList = Object.keys((data as any).data[0]).filter((d) => d != axes.x);
  const keyGroup = data.data.map((d) => xAccessor(d));

  const stackedData = stack().keys(keyList)(data.data as any);

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

  position.x = 0;
  position.y = 0;

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("viewBox", `0 0 ${dimensions.chart.width} ${dimensions.chart.height}`)
    .attr("style", "max-width: 100%; height: auto;")
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
      axisLeft(yScale).ticks(5).tickPadding(yAxisTickPadding).tickSizeInner(10)
    )
    .selectAll("text")
    .attr("transform", `rotate(${yAxisTickRotation})`);

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0, ${containerHeight})`)
    .transition(xAnimation)
    .call(axisBottom(xScale).ticks(6).tickPadding(xAxisTickPadding))
    .selectAll("text")
    .attr("transform", `rotate(${xAxisTickRotation})`);

  // transition for bars
  const duration = 1000 / keyList.length;
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
      .attr("y", () => yScale.range()[0] as number) // start from the bottom
      .attr("width", xScale.bandwidth())
      .attr("tabindex", "0")
      .transition(t)
      .delay(i * duration)
      .attr("y", (d) => yScale((d as any)[1])) //transition to actual y position
      .attr("height", (d) => yScale((d as any)[0]) - yScale((d as any)[1]));

    setDynamicScope(`#${id}`);
  });
};

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

watchEffect(() => {
  if (data.data) {
    draw();
  }
});

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

.feather-vertical-bar-svg {
  g.xAxis,
  g.yAxis {
    font-size: 1em; // TODO: Make tick-font-size an option

    path.domain {
      stroke: currentColor;
    }
    .tick {
      line,
      text {
        fill: var(vars.$secondary-text-on-surface);
      }
    }
  }

  rect.bar {
    fill: var(vars.$primary);
    stroke: transparent;

    &:focus {
      fill-opacity: 0.75;
    }

    &:hover {
      fill-opacity: 0.5;
    }
  }

  rect.categorical1 {
    fill: var(vars.$categorical1);
  }

  rect.categorical2 {
    fill: var(vars.$categorical2);
  }

  rect.categorical3 {
    fill: var(vars.$categorical3);
  }
  rect.categorical4 {
    fill: var(vars.$categorical4);
  }

  rect.categorical5 {
    fill: var(vars.$categorical5);
  }

  rect.categorical6 {
    fill: var(vars.$categorical6);
  }

  rect.categorical7 {
    fill: var(vars.$categorical7);
  }

  rect.categorical8 {
    fill: var(vars.$categorical8);
  }

  rect.categorical9 {
    fill: var(vars.$categorical9);
  }

  rect.categorical10 {
    fill: var(vars.$categorical10);
  }
}
</style>
