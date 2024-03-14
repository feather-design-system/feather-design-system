<template>
  <div
    class="feather-chart-container"
    :width="`${controlWidth}px`"
    :max-width="`${controlWidth}px`"
  >
    <div class="feather-chart-title-container">
      <div v-if="title" class="feather-chart-title">{{ title }}</div>
      <div class="action-container">
        <FeatherButton
          v-show="size !== 'xs'"
          icon="Download"
          :download="downloadFileName"
          :href="downloadUrl"
          asAnchor
        >
          <FeatherIcon
            :icon="iconDownload"
            class="download action"
          ></FeatherIcon>
        </FeatherButton>
        <FeatherButton icon="Refresh" v-show="size !== 'xs'">
          <FeatherIcon
            :icon="iconRefresh"
            class="refresh action"
            @click="
              emit('refresh', `${id}`);
              refreshData();
            "
          ></FeatherIcon>
        </FeatherButton>
        <FeatherButton icon="More">
          <FeatherIcon
            :icon="iconMore"
            class="more action"
            @click="emit('more', `${id}`)"
          ></FeatherIcon>
        </FeatherButton>
      </div>
    </div>
    <div class="feather-chart-filter-container">
      <div class="chart-filter" v-show="size != 'xs'">
        <!--TODO:  Rename this slot to  something more specific -->
        <slot name="type"></slot>
      </div>
      <div class="time-filter" v-show="size != 'xs'">
        <slot name="filter"></slot>
      </div>
    </div>
    <div class="feather-chart-legend-container" v-if="showLegend()">
      <div :id="`legend${id}`" class="legend">
        <div class="legend-item">
          <span class="legend-text">X-Axis Title</span>
        </div>
        <div
          v-for="(item, index) in legend"
          :key="index"
          class="legend-item"
          @click="
            emit('legend', `${id}`, item);
            legendItemClick(
              $event,
              `${id}`,
              item,
              `categorical${(index % 4) + 1}`
            );
          "
          @keydown="
            legendItemClick(
              $event,
              `${id}`,
              item,
              `categorical${(index % 4) + 1}`
            )
          "
          tabindex="0"
        >
          <span class="legend-color" :class="`categorical${(index % 4) + 1}`"
            >*</span
          >
          <span class="legend-text">{{ item }} </span>
        </div>
      </div>
    </div>
    <Component
      :is="chartComponent"
      :id="id"
      :type="type"
      :title="title"
      :size="size"
      :data="data"
      :dimensions="sizing"
      :options="options"
      :axes="axes"
    >
    </Component>
  </div>
</template>

<script lang="ts" setup>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import DownloadFile from "@featherds/icon/action/DownloadFile";
import Refresh from "@featherds/icon/navigation/Refresh";
import MoreVert from "@featherds/icon/navigation/MoreVert";
import {
  computed,
  defineAsyncComponent,
  markRaw,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";

import {
  FeatherChartType,
  FeatherChartOptions,
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartDimensions,
  FeatherChartShirtSize,
} from "./types";

import { getSizing } from "./Sizing";

// EMITS
const emit = defineEmits(["filter", "legend", "more", "refresh"]);

// #region PROPS
const props = defineProps({
  id: { type: String, required: true },
  size: {
    type: String as PropType<FeatherChartShirtSize>,
    required: false,
    default: function () {
      return "md";
    },
  },
  title: { type: String, required: false },
  type: { type: String as PropType<FeatherChartType>, required: true },
  data: { type: Object as PropType<FeatherChartData>, required: true },
  options: {
    type: Object as PropType<FeatherChartOptions>,
    required: false,
    default: function () {
      return {
        units: "units",
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
        xAxis: {
          tickPadding: 0,
          tickRotation: 0,
        },
        yAxis: {
          tickPadding: 0,
          tickRotation: 0,
        },
      };
    },
  },
  axes: {
    type: Object as PropType<FeatherChartAxes>,
    required: false,
    default: function () {
      return {
        x: "",
        y: "",
      };
    },
  },
});

const { id, axes, data, options, size, title, type } = reactive(props);
// #endregion

const chartType = ref(type);

const legend = reactive([] as string[]);
legend.push("legend");
legend.push("under");
legend.push("construction");
legend.push("ok?");
// legend.push("cat5");
// legend.push("cat6");
// legend.push("cat7");
// legend.push("cat8");
// legend.push("cat9");
// legend.push("cat10cat10cat10cat10cat10");

// const chartRef = ref(null);

const sizing: FeatherChartDimensions = getSizing(
  size as FeatherChartShirtSize,
  type as FeatherChartType
);

// DEFAULTS
// TODO:  Setting default on props now; shouldn't need this anymore (But still need this for Radial demo???)'
if (!options.xAxis) {
  options.xAxis = {};
  options.xAxis.tickPadding = 10;
  options.xAxis.tickRotation = 0;
}
if (!options.yAxis) {
  options.yAxis = {};
  options.yAxis.tickPadding = 10;
  options.yAxis.tickRotation = 0;
}
if (!options.margin) {
  options.margin = {
    top: 20,
    right: 30,
    bottom: 20,
    left: 40,
  };
}

const setChartType = (type: FeatherChartType) => {
  chartType.value = type;
};

const controlWidth = computed((): number => {
  return sizing.control.width;
});

const chartComponent = computed(() => {
  // REDRAWS CHART WHEN CHART TYPE CHANGES
  console.log(`chartComponent CHANGED (type = ${chartType.value})`);
  switch (chartType.value.toLowerCase()) {
    case "area":
      return defineAsyncComponent(() => import("./Area.vue"));

    case "bar":
      return defineAsyncComponent(() => import("./Bar.vue"));

    case "vertical-bar":
      return defineAsyncComponent(() => import("./VerticalBar.vue"));

    case "dendrogram":
      return defineAsyncComponent(() => import("./Dendrogram.vue"));

    case "horizontal-bar":
      return defineAsyncComponent(() => import("./HorizontalBar.vue"));

    case "line":
      return defineAsyncComponent(() => import("./Line.vue"));

    case "radial":
      return defineAsyncComponent(() => import("./Radial.vue"));

    default:
      throw new Error(`Unhandled chart type: "${chartType.value}"`);
  }
});

// #region LEGEND
const legendItemClick = (
  e: Event,
  chartId: string,
  item: string,
  categoricalStyle: string
) => {
  const { target } = e;

  if (e instanceof KeyboardEvent) {
    console.log(`|${e.key}|`);
    if (e.key !== " ") {
      return;
    }
  }

  if (e instanceof MouseEvent || e instanceof KeyboardEvent) {
    console.log("target", target);
    console.log("instance of KeyboardEvent?", e instanceof KeyboardEvent);
    console.log(`ID: ${chartId} ${item} clicked.`);
    console.log(`enable categorical style: ${categoricalStyle}`);

    document
      .querySelectorAll(`:not(.${chartId}.${categoricalStyle})`)
      .forEach((item: Element) => {
        item.classList.remove("selectedLegend");
      });
    document
      .querySelectorAll(`.${chartId}.${categoricalStyle}`)
      .forEach((item: Element) => {
        item.classList.add("selectedLegend");
      });
  }
};

const showLegend = () => {
  return type === "dendrogram" || type === "area" || type === "radial"
    ? false
    : true;
};
// #endregion

// #region ACTIONS
const downloadFileName = computed(() => {
  let chartTitle = title || "chart-data";
  let fileName = chartTitle.replaceAll(" ", "-").toLowerCase();
  return `${fileName}.txt`;
});

const downloadUrl = computed(() => {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  return url;
});

const refreshData = () => {
  // NOTE: Alternative could be emit refresh and let user get latest data.
  const copy = { ...data };
  data.splice(0, data.length);
  Object.assign(data, copy);
};
// #endregion

// #region ICONS
const iconDownload = computed(() => {
  return markRaw(DownloadFile);
});

const iconRefresh = computed(() => {
  return markRaw(Refresh);
});

const iconMore = computed(() => {
  return markRaw(MoreVert);
});
// #endregion

defineExpose({ setChartType });

onBeforeMount(() => {});

onMounted(async () => {});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.feather-chart-container {
  display: inline-block;
  background-color: var($surface);
  padding: 8px;

  .feather-chart-title-container {
    @include headline3();
    display: flex;
    flex-direction: row;
    margin: 34px 0 32px 32px;

    .feather-chart-title {
      display: inline-flex;
      margin-right: auto;
      color: var($primary);
      flex: 0 0 auto;
      flex-shrink: 0;
      overflow: auto;
    }

    .action-container {
      display: inline-flex;
      margin-left: auto;

      button {
        margin: 0;

        .action {
          margin: 0;
        }
      }
    }
  }

  .feather-chart-filter-container {
    @include subtitle2();
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;

    .time-filter {
      margin: 0;
      margin-left: auto;
      white-space: nowrap;
    }
  }

  .feather-chart-legend-container {
    @include subtitle1();
    display: inline-block;
    width: 100%;
    margin: 0 0 8px 32px;

    div.legend {
      display: flex;
      flex-flow: row wrap;

      div.legend-item {
        display: inline-flex;
        flex: 6rem 0 0;
        margin: 0.125em;
        // padding: 1px 3px 1px 3px;
        color: var($primary-text-on-color);
        border-radius: 5px;
        line-height: 1em;
        font-size: 12px;
        overflow: hidden;
        width: fit-content;

        span.legend-color {
          display: inline-block;
          color: transparent;
          height: 10px;
          width: 10px;
          min-width: 10px;
          min-height: 10px;
          border-radius: 50%;
          margin: 0.125em;
          vertical-align: center;
        }

        span.legend-text {
          display: inline-block;
          color: var($primary-text-on-surface);
          padding-left: 4px;
          overflow: hidden;

          :hover {
            content: "*";
          }
        }
      }

      .categorical1 {
        background-color: var($categorical1);
      }

      .categorical2 {
        background-color: var($categorical2);
      }

      .categorical3 {
        background-color: var($categorical3);
      }

      .categorical4 {
        background-color: var($categorical4);
      }

      .categorical5 {
        background-color: var($categorical5);
      }

      .categorical6 {
        background-color: var($categorical6);
      }

      .categorical7 {
        background-color: var($categorical7);
      }

      .categorical8 {
        background-color: var($categorical8);
      }

      .categorical9 {
        background-color: var($categorical9);
      }

      .categorical10 {
        background-color: var($categorical10);
      }
    }
  }
}
</style>

<!-- unscoped to style children charts -->
<style lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.feather-chart-container {
  .chart {
    margin-left: 32px;

    svg {
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

          circle.dendrogram-circle {
            fill: var($success);
            stroke: var($secondary);
            stroke-width: 2px;
          }

          text.node-label {
            fill: var($primary-text-on-surface);
            top: 100px;
            right: 10px;
          }
        }

        path.area {
          fill: #009de1;
        }
      }

      g.xAxis,
      g.yAxis {
        font-size: small;
        padding: 1em;

        .tick {
          line {
            color: var($shade-4);
          }
        }
      }

      rect.bar {
        fill: var($primary);
        stroke: transparent;

        &:focus {
          fill-opacity: 0.75;
        }

        &:hover {
          fill-opacity: 0.5;
        }
      }

      rect.categorical1 {
        fill: var($categorical1);
      }

      rect.categorical2 {
        fill: var($categorical2);
      }

      rect.categorical3 {
        fill: var($categorical3);
      }

      rect.categorical4 {
        fill: var($categorical4);
      }

      rect.categorical5 {
        fill: var($categorical5);
      }

      rect.categorical6 {
        fill: var($categorical6);
      }

      rect.categorical7 {
        fill: var($categorical7);
      }

      rect.categorical8 {
        fill: var($categorical8);
      }

      rect.categorical9 {
        fill: var($categorical9);
      }

      rect.categorical10 {
        fill: var($categorical10);
      }

      rect.selectedLegend {
        stroke: var($primary);
        stroke-width: 5px;
      }
    }
  }
}
</style>
