<template>
  <!-- <div class="chart" :width="dimensions.chart.width"> -->
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-radial-svg"
    :class="zoomLevel"
  ></svg>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { select } from "d3-selection";
import { hierarchy, tree } from "d3-hierarchy";
import { LinkRadial, linkRadial } from "d3-shape";
import { transition } from "d3-transition";
import { easeBounce } from "d3-ease";

import { PropType, Ref, inject, onMounted, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartOptions,
  FeatherChartRadialData,
  ZoomLevel,
} from "./types";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: false },
  size: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartRadialData>, required: true },
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

const { data, dimensions, id, options } = reactive(props);

const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

if (!options.margin) {
  throw new Error("margin not set");
}

dimensions.control.height = dimensions.control.width;
dimensions.chart.height = dimensions.control.height;

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

const draw = () => {
  select(`#${id}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Data is not valid");

  // DATA
  const radialData = hierarchy(data.data);

  // HMMM:  containerHeight is arbitrary (defaults to 350) and grows to fit content;  but don't know what content is yet.  May need to do this after we join data or make it configurable.
  const diameter = containerHeight * 0.75;
  const radius = diameter / 2;

  const treeFn = tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2));

  // @ts-ignore
  const treeData = treeFn(radialData);
  const nodes = treeData.descendants();
  const links = treeData.links();

  if (!options.margin) {
    throw new Error("margin not set");
  }

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
      `translate(${options.margin.left},${options.margin.top})`
    );

  const graphGroup = svg
    .append("g")
    .attr(
      "transform",
      `translate(${containerWidth / 2}, ${containerHeight / 2} )`
    );

  const linkRadialFn = linkRadial()
    .angle((d: any) => d.x)
    .radius((d: any) => d.y) as LinkRadial<any, any, [number, number]>;

  const duration = 1000;
  const animate = transition().duration(duration).ease(easeBounce);

  graphGroup
    .selectAll(".link")
    .data(links)
    .join("path")
    .attr("opacity", "0")
    .transition(animate)
    .attr("opacity", "1")
    .attr("class", "link")
    .attr("d", linkRadialFn);

  const node = graphGroup
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .attr("transform", (d) => {
      return `rotate(${(d.x * 180) / Math.PI - 90})translate(${d.y}, 0)`;
    });

  node
    .append("text")
    .classed("node-text", true)
    .attr("dx", (d) => (d.x < Math.PI ? 10 : -10))
    .attr("dy", ".23em")
    .attr("transform", (d) => (d.x < Math.PI ? null : "rotate(180)"))
    .attr("opacity", "0")
    .transition(animate)
    .attr("opacity", "1")
    .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
    .text((d: any) => d.data.name);

  node
    .append("circle")
    .attr("tabindex", "0")
    .attr("r", "0")
    // .attr("fill", "none")
    .transition(animate)
    .attr("r", "8");

  setDynamicScope(`#${id}`);
};

const isValid = () => {
  // validate data is iterable
  return true;
};

defineExpose({ draw });

watchEffect(() => {
  if (data) {
    console.log("Let's draw()'");
    draw();
  }
});

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.feather-radial-svg {
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
  g {
    g {
      path.link {
        fill: none;
        stroke: var($shade-3);
      }

      g.node {
        .node-text {
          @include body-large();
          text-align: right;
          line-height: 0.875em;
          fill: var($primary-text-on-surface);

          text-shadow: -0.5px -0.5px 0 var($primary-text-on-color),
            0.5px -0.5px 0 var($primary-text-on-color),
            -0.5px 0.5px 0 var($primary-text-on-color),
            0.5px 0.5px 0 var($primary-text-on-color),
            -1px -1px 0 var($primary-text-on-color),
            1px -1px 0 var($primary-text-on-color),
            -1px 1px 0 var($primary-text-on-color),
            1px 1px 0 var($primary-text-on-color),
            -1.5px -1.5px 0 var($primary-text-on-color),
            1.5px -1.5px 0 var($primary-text-on-color),
            -1.5px 1.5px 0 var($primary-text-on-color),
            1.5px 1.5px 0 var($primary-text-on-color);
        }

        .node-text:hover {
          height: 5.875em;
          z-index: 1;
          overflow-wrap: break-word;
          text-shadow: 0;
        }

        .left {
          text-align: left;
          direction: ltr;
        }

        .right {
          text-align: right;
          direction: ltr;
        }

        circle {
          fill: var($surface);
          stroke: var($primary-text-on-surface);
          stroke-width: 2px;
        }
      }

      // circle.dendrogram-node {
      //   fill: var($success);
      //   stroke: var($secondary);
      //   stroke-width: 2px;
      // }

      // text.dendrogram-node-label {
      //   fill: var($primary-text-on-surface);
      //   font-size: 12px;
      //   fill: navy;
      //   top: 100px;
      //   right: 10px;
      // }
    }

    // path.area {
    //   fill: #009de1;
    // }
  }
}
</style>
