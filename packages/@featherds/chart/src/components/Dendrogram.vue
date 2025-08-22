<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
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
  computed,
  inject,
  onBeforeMount,
  onMounted,
  toRefs,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartDendrogramData,
  FeatherChartDimensions,
  FeatherChartOptions,
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

const { data, dimensions, id, options, size } = toRefs(props);

const position = inject("position") as { x: number; y: number };
const container = inject("container") as { width: number; height: number };

if (!options.value.margin) {
  throw new Error("margin not set");
}

// transition
const draw = () => {
  // CLEAN UP
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Data is not valid");

  // DATA
  // Dendrogram uses hierarchical data, not Array like every other chart.
  const dataset: any = data.value.data;

  const clusterLayout = cluster()
    // allow for space to the right of the child nodes (-100)
    .size([container.height, container.width - 50])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.75));

  const root = hierarchy(dataset, (d) => d.children);
  console.log(root);

  clusterLayout(root);

  if (!options.value.margin) {
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
  const svg = select(`#${id.value}`)
    .attr("width", dimensions.value.chart.width)
    .attr("height", dimensions.value.chart.height)
    .attr(
      "viewBox",
      `0 0 ${dimensions.value.chart.width} ${dimensions.value.chart.height}`
    )
    // .attr("style", "max-width: 100%; height: auto;")
    .append("g")
    .attr("class", "dendrogram-main-group")
    .attr(
      "transform",
      `translate(${options.value.margin.left}, ${options.value.margin.top})`
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

  setDynamicScope(`#${id.value}`);
};

const isValid = () => {
  // validate data is iterable
  return true;
};

const classes = computed(() => {
  return {
    "feather-dendrogram-svg": true,
  };
});

defineExpose({ draw });

watchEffect(() => {
  if (data) {
    console.log("Let's draw()");
    draw();
  }
});

onBeforeMount(() => {
  console.log("Before Mount width", dimensions.value.chart.width, size.value);
});

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

.feather-dendrogram-svg {
  display: block;
  max-width: 100%;
  height: auto;
  g.dendrogram-node {
    circle.dendrogram-node-circle {
      fill: var(vars.$success);
      stroke: var(vars.$secondary);
      stroke-width: 1px;
    }

    text.dendrogram-node-label {
      fill: var(vars.$primary-text-on-surface);
      font-size: 12px;
      top: 100px;
      right: 10px;
    }

    use.dendrogram-node-icon {
      color: var(vars.$secondary-text-on-color);
    }
  }
}
</style>
