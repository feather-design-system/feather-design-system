<template>
  <div class="chart" :width="dimensions.chart.width">
    <svg :id="id"></svg>
    <!-- <p>Size: {{ size }}</p> -->
    <!-- <p>Options: {{ options }}</p> -->
    <!-- <span>Data: {{ data }}</span> -->
    <!-- <span>ID: {{ id }}</span> -->
    <!-- <span>Type: {{ type }}</span> -->
    <!-- <span>Dimensions: {{ dimensions }}</span> -->
    <!-- <span>Axes: {{ axes }}</span> -->
  </div>
</template>
<script lang="ts" setup>
import { select } from "d3-selection";
import { cluster, hierarchy } from "d3-hierarchy";
import { transition } from "d3-transition";
import { easeBounce } from "d3-ease";

import { PropType, onBeforeMount, onMounted, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartDimensions,
  FeatherChartOptions,
} from "./types";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: false },
  size: { type: String, required: true },
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

const { data, dimensions, id, options, size } = reactive(props);

if (!options.margin) {
  throw new Error("margin not set");
}

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

// transition
const draw = () => {
  // CLEAN UP
  select(`#${id}`).selectChildren().remove();

  // DATA
  // DANGER: Yuck data[0].
  // Dendrogram uses hierarchical data, not Array like every other chart.
  const dataset: any = data[0];

  const clusterLayout = cluster()
    // allow for space to the right of the child nodes (-100)
    .size([containerHeight, containerWidth - 100]);

  const root = hierarchy(dataset, (d) => d.children);
  console.log(root);

  clusterLayout(root);

  if (!options.margin) {
    throw new Error("margin not set");
  }

  const duration = 750;
  const lineTransition = transition().duration(duration);
  const circleTransition = transition().duration(duration).ease(easeBounce);

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin.left}, ${options.margin.top})`
    );

  const [inflection1, inflection2] = [20, 30];

  svg
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter()
    .append("path")
    .attr("opacity", "0")
    .transition(circleTransition)
    .attr("opacity", "1")
    .attr("d", function (d: any) {
      const path = `M${d.y},${d.x}C${d.parent.y + inflection1},${d.x}${" "}${
        d.parent.y + inflection2
      },${d.parent.x}${" "}${d.parent.y},${d.parent.x}`;
      return path;
    })
    // TODO: hande with css class
    .style("fill", "none")
    .attr("stroke", "#ccc");

  svg
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d: any) => `translate(${d.y}, ${d.x})`)
    .append("text")
    .attr("opacity", "0")
    .transition(lineTransition)
    .attr("opacity", "1")
    .text(function (d: any) {
      // TODO: HARDCODED
      return d.data.name;
    })
    .attr("class", "node-label")
    // TODO:  HARDCODED
    .attr("x", 12)
    .attr("y", 4);

  svg
    .selectAll("g")
    .append("circle")
    .transition(circleTransition)
    .attr("r", 7)
    .attr("tabindex", "0")
    .attr("class", "dendrogram-circle");
};

defineExpose({ draw });

watchEffect(() => {
  if ((data as FeatherChartData).length > 0) {
    console.log("Let's draw()'");
    draw();
  }
});

onBeforeMount(() => {
  console.log("Before Mount width", dimensions.chart.width, size);
});

onMounted(() => {
  // console.log("dimensions", dimensions, size);
  draw();
});
</script>
