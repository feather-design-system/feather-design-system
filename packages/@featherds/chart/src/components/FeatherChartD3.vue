<!-- https://leanpub.com/d3-t-and-t-v4/read#leanpub-auto-bar-chart -->
<template>
  <div class="d3-container">
    <FeatherTooltip
      :title="summary"
      v-slot="{ attrs, on }"
    >
      <svg
        :id="id"
        @click="clicked"
        class="d3-chart"
        v-bind="attrs"
        v-on="on"
      ></svg>
    </FeatherTooltip>
  </div>
</template>
<script lang="ts" setup>
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { transition } from "d3-transition";
// https://stackoverflow.com/questions/62868768/use-d3-transition-as-a-separate-npm-module
import { axisBottom, axisLeft } from "d3-axis";

import {
  FeatherD3Data,
  FeatherD3Dimensions,
  FeatherD3Options,
  ICoordinateAxes
} from "./types";
import { onMounted, PropType, reactive, ref, watch } from "vue";
import { FeatherTooltip } from "@featherds/tooltip";

// PROPS
const props = defineProps({
  id: { type: String, required: true },
  data: { type: Object as PropType<FeatherD3Data>, required: true },
  dimensions: { type: Object as PropType<FeatherD3Dimensions>, required: true },
  options: { type: Object as PropType<FeatherD3Options>, required: true },
  axes: { type: Object as PropType<ICoordinateAxes>, required: true },
  summary: { type: String, required: true },
});

const { axes, data, dimensions, options, id } = reactive(props);

const count = ref(0);


const clicked = (e: MouseEvent) => {
  const { target } = e;

  console.log(`${target} clicked`);
}

// TODO: Need a container within svg, so bars do not overlap svg
// CONTAINER should be based upon user overall dimension settings
// const container = reactive({ height: dimensions.bottom - dimensions.left, width: 0 });
const ctrWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;
const ctrHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

// ACCESSORS
// TODO:  Should we require user to pass these accessor functions?
// NOTE:  NO USE GETVALUE FUNCTION THAT CAN RETRIEVE VALUE
// FROM DOT NOTATION PATH (i.e. "stats.age" or "state.county.city")
let xAccessor = (d: unknown): string => {
  if (typeof d === "object") {
    // return (d as object)[axes.x as keyof object];
    return getValue(d as object, axes.x) as string;
  }
  throw new Error("Unexpected x accessor");
}

let yAccessor = (d: unknown): number => {
  if (typeof d === "object") {
    // return (d as object)[axes.y as keyof object];
    return getValue(d as object, axes.y) as number;
  }
  throw new Error("Unexpected y accessor");
}

// SCALE
const xScale = scaleBand().range([0, ctrWidth]).padding(0.2);

// NOTE:  y-axis is flipped.  Force larger numbers to be lower on the page.
const yScale = scaleLinear().range([ctrHeight, 0]);

// REFACTOR: Move to composable
const getValue = (obj: object, path: string): (string | number | undefined) => {
  console.log(obj, path);
  let newObj = JSON.parse(JSON.stringify(obj));

  path = path.replace(/\[(\w+)\]/g, '$1');
  path = path.replace(/^\./, '');

  const arr = path.split('.');

  while (arr.length) {
    let val = arr.shift();
    if (!!val && val in newObj) {
      newObj = newObj[val];
    } else {
      return;
    }
  }
  return newObj;
}

watch(count, (count, _oldValue) => {
  console.log(count);
})

onMounted(() => {

  // validate data is iterable
  if (!Array.isArray(data)) {
    console.log(`Is ${data} an Array?: ${Array.isArray(data)}`)
    throw new Error("Data is not iterable!");
  }

  const barAnimation = transition().duration(500);
  const xAnimation = transition().duration(1500);
  const yAnimation = transition().duration(625);

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width",
      ctrWidth + dimensions.margin.left + dimensions.margin.right)
    .attr("height",
      ctrHeight + dimensions.margin.top + dimensions.margin.bottom)
    .attr("tabindex", "0")
    .append("g")
    .attr("transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

  let [, max] = extent(data, d => yAccessor(d));

  xScale.domain(data.map(d => xAccessor(d)));
  yScale.domain([0, max as number]);

  // DRAW BARS
  const bars = svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("tabindex", "0")
    .attr("aria-role", "img")
    .attr("aria-label", d => {
      return `${xAccessor(d)} ${yAccessor(d)} ${options.units};`;
    })
    .attr("class", `bar ${options.class ? options.class : ""}`)
    .attr("x", d => xScale(xAccessor(d)) as number)
    .transition(barAnimation)
    .attr("y", d => yScale(yAccessor(d)))
    .attr("width", xScale.bandwidth())
    .attr("height", d => ctrHeight - yScale(yAccessor(d)))
    ;

  // Y AXIS AND TICKS
  svg.append("g").classed("yAxis", true) //.transition().duration(1000)
    .transition(xAnimation)
    .call(axisLeft(yScale).ticks(6));

  // X AXIS TICKS
  svg
    .append("g")
    .classed("xAxis", true)
    .transition(yAnimation)
    .attr("transform", "translate(0," + ctrHeight + ")")
    .call(axisBottom(xScale))
});
</script>

<style lang="scss">
@import "@featherds/styles/themes/variables";

.d3-container {
  padding: 1em 0;

  .d3-chart {
    background-color: var($surface);

    .bar {
      &.color1 {
        fill: var($primary);
      }

      &.color2 {
        fill: var($secondary);
      }

      stroke: transparent;

      &:focus {
        fill-opacity: 0.75;
      }

      &:hover {
        fill-opacity: 0.5;
      }
    }

    .xAxis {
      font-size: small;
    }

    .yAxis {
      font-size: small;
      width: 3em;
    }

    .xAxis>.tick>text {
      background-color: var($primary);
    }
  }
}
</style>
