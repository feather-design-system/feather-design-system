<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-dendrogram-svg"
    :class="zoomLevel"
  ></svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Dendrogram",
});
</script>

<script lang="ts" setup>
import { select } from "d3-selection";
import { cluster, hierarchy } from "d3-hierarchy";
import { transition } from "d3-transition";
import { easeBounce } from "d3-ease";

import {
  PropType,
  Ref,
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartDendrogramData,
  FeatherChartDimensions,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: false },
  size: { type: String, required: true },
  type: { type: String, required: true },
  data: {
    type: Object as PropType<FeatherChartDendrogramData>,
    required: true,
  },
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

const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

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

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Data is not valid");

  // DATA
  // Dendrogram uses hierarchical data, not Array like every other chart.
  const dataset: any = data.data;

  const clusterLayout = cluster()
    // allow for space to the right of the child nodes (-100)
    .size([containerHeight, containerWidth - 50])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.75));

  const root = hierarchy(dataset, (d) => d.children);
  console.log(root);

  clusterLayout(root);

  if (!options.margin) {
    throw new Error("margin not set");
  }

  const duration = 750;
  const lineTransition = transition().duration(duration);
  const circleTransition = transition().duration(duration).ease(easeBounce);

  const getIcon = (d: any) => {
    if (!d.data.icon) return "#default-icon";
    return `#${d.data.icon}-icon`;
  };

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("viewBox", `0 0 ${dimensions.chart.width} ${dimensions.chart.height}`)
    .attr("style", "max-width: 100%; height: auto;")
    .append("g")
    .attr("class", "dendrogram-main-group")
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
    .attr("class", "dendrogram-link")
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
    .attr("class", "dendrogram-node")
    .attr("transform", (d: any) => `translate(${d.y}, ${d.x})`)
    .append("text")
    .attr("opacity", "0")
    .transition(lineTransition)
    .attr("opacity", "1")
    .text(function (d: any) {
      // TODO: HARDCODED
      return d.data.name;
    })
    .attr("class", "dendrogram-node-label")
    // TODO:  HARDCODED
    .attr("x", 20)
    .attr("y", 4);

  svg
    .selectAll("g")
    .append("circle")
    .transition(circleTransition)
    .attr("r", 16)
    .attr("tabindex", "0")
    .attr("class", "dendrogram-node-circle");

  svg
    .selectAll("g")
    .append("use")
    .classed("dendrogram-node-icon", true)
    .attr("href", (d) => getIcon(d))
    .attr("height", 20)
    .attr("width", 20)
    .attr("x", "-10")
    .attr("y", "-10");

  setDynamicScope(`#${id}`);
};

const isValid = () => {
  // validate data is iterable
  return true;
};

defineExpose({ draw });

watchEffect(() => {
  if (data) {
    console.log("Let's draw()");
    draw();
  }
});

onBeforeMount(() => {
  console.log("Before Mount width", dimensions.chart.width, size);
});

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

.feather-dendrogram-svg {
  &.zoom-in-2 {
    transform: scale(2);
  }
  &.zoom-in-1 {
    transform: scale(1.5);
  }
  &.zoom-none {
    transform: scale(1);
  }
  &.zoom-out-1 {
    transform: scale(0.75);
  }
  &.zoom-out-2 {
    transform: scale(0.5);
  }
  g.dendrogram-node {
    circle.dendrogram-node-circle {
      fill: var($success);
      stroke: var($secondary);
      stroke-width: 1px;
    }

    text.dendrogram-node-label {
      fill: var($primary-text-on-surface);
      font-size: 12px;
      top: 100px;
      right: 10px;
    }

    use.dendrogram-node-icon {
      color: var($secondary-text-on-color);
    }
  }
}
</style>
