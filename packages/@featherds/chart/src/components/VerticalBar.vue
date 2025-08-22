<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
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
import {
  computed,
  // computed,
  inject,
  onMounted,
  PropType,
  toRefs,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartDimensions,
  FeatherChartOptions,
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

const { axes, data, dimensions, id, options } = toRefs(props);

const position = inject("position") as { x: number; y: number };
const container = inject("container") as { width: number; height: number };

if (!options.value.margin) throw new Error("margin not set");

// const xAxisFontSize = computed(() => `${options.value.xAxis?.fontSize ?? 1}em`);
// const yAxisFontSize = computed(() => `${options.value.yAxis?.fontSize ?? 1}em`);

// ACCESSORS
// TODO:  Should we require user to pass these accessor functions?
// NOTE:  USE GETVALUE FUNCTION THAT CAN RETRIEVE VALUE
// FROM DOT NOTATION PATH (i.e. "stats.age" or "state.county.city")
const xAccessor = (d: unknown): string => {
  if (typeof d === "object") {
    // return (d as object)[axes.x as keyof object];
    return getValue(d as object, axes.value.x) as string;
  }
  throw new Error("Unexpected x accessor");
};

const xStackedAccessor = (d: any): string => {
  if (typeof d === "object") {
    return getValue(d.data, "data." + axes.value.x) as string;
  }
  throw new Error("Unexpected x stacked accessor");
};

// DRAW
const draw = () => {
  // DATA
  const keyList = Object.keys((data.value as any).data[0]).filter(
    (d) => d != axes.value.x
  );
  const keyGroup = data.value.data.map((d) => xAccessor(d));

  const stackedData = stack().keys(keyList)(data.value.data as any);

  // SCALES
  const xScale = scaleBand()
    .domain(keyGroup)
    .range([0, container.width])
    .padding(0.25);

  const yMax = max(
    stackedData[stackedData.length - 1] as any,
    (d: any) => d[1]
  );
  const yScale = scaleLinear()
    .domain([0, yMax as any])
    .nice()
    .range([container.height, 0]);

  const xAnimation = transition().duration(500);
  const yAnimation = transition().duration(500);

  if (!options.value.margin) throw new Error("margin not set");

  // CLEAN UP
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  // DRAW SVG
  const svg = select(`#${id.value}`)
    .attr("width", dimensions.value.chart.width)
    .attr("height", dimensions.value.chart.height)
    .attr(
      "viewBox",
      `0 0 ${dimensions.value.chart.width} ${dimensions.value.chart.height}`
    )
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.value.margin.left}, ${options.value.margin.top})`
    );

  // DRAW BARS
  const layers = svg.selectAll("g").data(stackedData).join("g");

  svg
    .append("g")
    .classed("yAxis", true)
    .transition(yAnimation)
    .call(
      axisLeft(yScale)
        .ticks(5)
        .tickPadding(options.value.yAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.yAxis?.tickRotation ?? 0})`);

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0, ${container.height})`)
    .transition(xAnimation)
    .call(
      axisBottom(xScale)
        .ticks(6)
        .tickPadding(options.value.xAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.xAxis?.tickRotation ?? 0})`);

  // transition for bars
  const duration = 1000 / keyList.length;
  const t = transition().duration(duration).ease(easeLinear);

  layers.each(function (_, i) {
    select(this)
      .selectAll(".bar")
      .data((d: any) => d)
      .join("rect")
      .attr("class", `${id.value} categorical${i + 1}`)
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

    setDynamicScope(`#${id.value}`);
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

const classes = computed(() => {
  return {
    "feather-vertical-bar-svg": true,
  };
});

defineExpose({ draw });

watchEffect(() => {
  if (data.value.data) {
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
  display: block;
  max-width: 100%;
  height: auto;
  g.xAxis,
  g.yAxis {
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
  g.xAxis {
    text {
      font-size: var(--xAxisFontSize);
    }
  }
  g.yAxis {
    text {
      font-size: var(--yAxisFontSize);
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
