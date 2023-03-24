<template>
  <div class="chart" :width="dimensions.chart.width">
    <svg :id="id"></svg>
  </div>
</template>
<script lang="ts" setup>
import { select } from "d3-selection";
import { hierarchy, tree } from "d3-hierarchy";
import { LinkRadial, linkRadial } from "d3-shape";
import { transition } from "d3-transition";
import { easeBounce } from "d3-ease";

import { PropType, onMounted, reactive, watchEffect } from "vue";
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

const { data, dimensions, id, options } = reactive(props);

if (!options.margin) {
  throw new Error("margin not set");
}

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

// selection.prototype["zIndexToBack"] = function(): any {
//   return this.each(() => {
//     this.parentNode.appendChild(this);
//   });
// };

// selection.prototype["zIndexToFront"] = function(): any {
//   return this.each(() => {
//     const firstChild = this.parentNode.firstChild;
//     if (firstChild) {
//       this.parentNode.insertBefore(this, firstChild);
//     }
//   })
// }

const draw = () => {
  // DATA
  // HMMM: Because FeatherChartData is an Array.  Rethink FeatherChartData?
  const radialData = hierarchy(data[0]);

  // HMMM:  containerHeight is arbitrary (defaults to 350) and grows to fit content;  but don't know what content is yet.  May need to do this after we join data or make it configurable.
  const diameter = containerHeight * 0.75;
  const radius = diameter / 2;

  const treeFn = tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2));

  // HMMM: Because FeatherChartData is an Array.  Rethink FeatherChartData?
  const treeData = treeFn(radialData);
  const nodes = treeData.descendants();
  const links = treeData.links();

  if (!options.margin) {
    throw new Error("margin not set");
  }

  // Clean up previous drawing (if)
  select(`#${id}`).selectChildren().remove();

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
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

  // node
  //   .append("foreignObject")
  //   .attr("x", (d) => (d.x < Math.PI ? 15 : -130))
  //   .attr("y", "-12")
  //   .attr("width", "120")
  //   .attr("height", "0.875em")
  //   .attr("transform", (d) => (d.x < Math.PI ? null : "rotate(180)"))
  //   .attr("class", (d) => (d.x < Math.PI ? "left" : "right"))
  //   .html((d: any) => d.data.name)
  //   .attr("align", (d) => d.x < Math.PI ? "right" : "left")
  //   .style("opacity", 0)
  //   .classed("node-text", true)
  //   .transition(animate)
  //   .style("opacity", 1)

  // const labels = selectAll(".node-text");
  // labels.on("mouseover", function(){
  //   select(this).zIndexToFront();
  // })

  // labels.on("mouseout", function() {
  //   select(this).zIndexToBack();
  // })

  node
    .append("circle")
    .attr("tabindex", "0")
    .attr("r", "0")
    // .attr("fill", "none")
    .transition(animate)
    .attr("r", "5");
};

watchEffect(() => {
  if ((data as FeatherChartData).length > 0) {
    draw();
  }
});

defineExpose({ draw });

onMounted(() => {
  draw();
});
</script>
