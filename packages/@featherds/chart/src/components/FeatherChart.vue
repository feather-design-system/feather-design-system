<template>
  <div class="feather-chart-container">
    <div class="feather-chart-title-container">
      <div v-if="title" class="feather-chart-title">
        {{ title }}
      </div>
      <div class="action-container">
        <FeatherButton
          v-show="size !== 'xs'"
          icon="Download"
          :download="downloadFileName"
          :href="downloadUrl"
          asAnchor
        >
          <FeatherIcon :icon="iconDownload" />
        </FeatherButton>
        <FeatherButton
          icon="Refresh"
          v-show="size !== 'xs'"
          @click="actionRefresh"
        >
          <FeatherIcon :icon="iconRefresh" />
        </FeatherButton>
        <FeatherButton
          icon="Settings"
          v-show="size !== 'xs'"
          @click="() => console.log('Settings')"
        >
          <FeatherIcon :icon="iconSettings" />
        </FeatherButton>
      </div>
      <div class="action-menu">
        <FeatherButton
          icon="More"
          :aria-expanded="showActionSubmenu ? 'true' : 'false'"
          :aria-controls="`chart-actions-${id}`"
          @click.stop="toggleActionSubmenu"
          @keydown.enter.space.prevent.stop="toggleActionSubmenu"
          ref="menuButtonRef"
        >
          <FeatherIcon :icon="iconMore" />
        </FeatherButton>
      </div>
    </div>

    <transition name="actions-slide" :duration="{ enter: 150, leave: 150 }">
      <div
        v-show="showActionSubmenu"
        :id="`chart-actions-${id}`"
        class="actions-submenu"
        role="region"
        aria-label="Chart actions"
        tabindex="-1"
        ref="actionSubmenuRef"
        @keydown.esc.prevent.stop="hideActionSubmenu"
      >
        <div class="actions-submenu-inner" @blur="hideActionSubmenu">
          <FeatherButton
            icon="Download"
            :download="downloadFileName"
            :href="downloadUrl"
            asAnchor
            @click="hideActionSubmenu"
          >
            <FeatherIcon :icon="iconDownload" />
          </FeatherButton>
          <FeatherButton icon="Refresh" @click="actionRefresh">
            <FeatherIcon :icon="iconRefresh" />
          </FeatherButton>
          <FeatherButton
            icon="Settings"
            v-show="size !== 'xs'"
            @click="() => console.log('Settings')"
          >
            <FeatherIcon :icon="iconSettings" />
          </FeatherButton>
        </div>
      </div>
    </transition>
    <div class="content">
      <slot name="content"></slot>
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

    <div class="chart">
      <div
        class="draggable-container"
        :class="{
          'being-dragged': svgDrag.isDragging?.value,
        }"
        @wheel.prevent="onWheel"
        @keydown="onKeyDown"
        @mousedown="onMouseDown"
        @mousemove="svgDrag.continueDrag($event, zoomScale)"
        @mouseup="svgDrag.endDrag()"
        @mouseleave="svgDrag.endDrag()"
        tabindex="0"
      >
        <Component
          ref="chartRef"
          :is="chartComponent"
          :id="id"
          :type="type"
          :title="title"
          :size="size"
          :data="data"
          :dimensions="sizing"
          :options="mergedOptions"
          :axes="axes"
        >
        </Component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ComponentPublicInstance,
  defineAsyncComponent,
  markRaw,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
  toRefs,
} from "vue";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import DownloadFile from "@featherds/icon/action/DownloadFile";
import Refresh from "@featherds/icon/navigation/Refresh";
import MoreVert from "@featherds/icon/navigation/MoreVert";
import Settings from "@featherds/icon/action/Settings";
import {
  FeatherChartType,
  FeatherChartOptions,
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartFlexibleData,
  FeatherChartShirtSize,
  ZoomLevel,
} from "./types";
import { getSizing } from "./Sizing";
import { useWheelZoom } from "@featherds/composables/events/WheelZoom";
import { useDraggable } from "@featherds/composables/events/Drag";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";

interface ChartComponent extends ComponentPublicInstance {
  draw: () => void;
}

// #region EMITS
const emit = defineEmits(["filter", "refresh"]);
// #endregion

// #region PROPS
const props = withDefaults(
  defineProps<{
    id: string;
    size?: FeatherChartShirtSize;
    title?: string;
    type: FeatherChartType;
    data: FeatherChartFlexibleData;
    options?: FeatherChartOptions;
    axes?: FeatherChartAxes;
  }>(),
  {
    size: "md",
    axes: () => ({ x: "", y: "" }),
    options: () => undefined as unknown as FeatherChartOptions,
  }
);

// Must define DEFAULT_OPTIONS here due to "no hoisting in props"
const DEFAULT_OPTIONS: FeatherChartOptions = {
  units: "units",
  colorScheme: undefined,
  margin: { top: 36, right: 36, bottom: 36, left: 36 },
  // showAxes: true,
  xAxis: { tickPadding: 6, tickRotation: 345, fontSize: 1 },
  yAxis: { tickPadding: 6, tickRotation: 0, fontSize: 1 },
};

const { id, axes, data, options, size, title, type } = toRefs(props);

watch(size, (next, prev) => {
  // Remove after testing
  console.log("[FeatherChart] size changed:", prev, "->", next);
  if (chartRef.value && chartRef.value.draw) {
    chartRef.value.draw();
  }
});

const mergedOptions = computed(() => {
  const userOptions = (options.value as FeatherChartOptions) || {};
  return {
    ...DEFAULT_OPTIONS,
    ...userOptions,
  };
});
// #endregion
// Centralized axis font sizes (moved from individual chart components like VerticalBar)
const xAxisFontSize = computed(
  () => `${mergedOptions.value.xAxis?.fontSize ?? 1}rem`
);
const yAxisFontSize = computed(
  () => `${mergedOptions.value.yAxis?.fontSize ?? 1}rem`
);
const svgDrag = useDraggable();

const resetPan = () => {
  // reset draggable container transform
  svgDrag.position.x = 0;
  svgDrag.position.y = 0;
  svgDrag.endDrag?.();
};

const isZoomable = computed(() => {
  const t = type.value;
  return (
    t === "area" ||
    t === "force-directed" ||
    t === "horizontal-bar" ||
    t === "line" ||
    t === "dendrogram" ||
    t === "radial" ||
    t === "tree-diagram" ||
    t === "vertical-bar"
  );
});

const {
  scale: zoomScale,
  onWheel,
  onKeyDown,
  setStep,
} = useWheelZoom({
  enabled: isZoomable,
});

const setZoomLevel = (level: ZoomLevel) => {
  switch (level) {
    case ZoomLevel.ZOOM_IN_2:
      setStep(-2);
      break;
    case ZoomLevel.ZOOM_IN_1:
      setStep(-1);
      break;
    case ZoomLevel.ZOOM_NONE:
      setStep(0);
      break;
    case ZoomLevel.ZOOM_OUT_1:
      setStep(1);
      break;
    case ZoomLevel.ZOOM_OUT_2:
      setStep(2);
      break;
  }
};

// bound for use in css to move chart content
const translateX = computed(() => `${svgDrag.position.x}px`);
const translateY = computed(() => `${svgDrag.position.y}px`);

const chartRef = ref<ChartComponent | null>(null);
const chartType = ref(type.value);

watch(type, (v) => (chartType.value = v));

const showActionSubmenu = ref(false);
const actionSubmenuRef = ref<HTMLElement | null>(null);
const menuButtonRef = ref<HTMLElement | null>(null);

const actionMenuTargets = computed<HTMLElement[]>(() => {
  const list: HTMLElement[] = [];
  const v = menuButtonRef.value as any;
  const btn =
    v instanceof HTMLElement ? v : (v?.$el as HTMLElement | null) ?? null;

  if (btn) list.push(btn);
  if (actionSubmenuRef.value && actionSubmenuRef.value instanceof HTMLElement) {
    list.push(actionSubmenuRef.value);
  }
  return list;
});

const outsideClickActive = useOutsideClick(
  actionMenuTargets,
  () => {
    if (showActionSubmenu.value) hideActionSubmenu();
  },
  { click: true, focus: true, window: true }
);

watch(showActionSubmenu, (newValue) => {
  outsideClickActive.value = newValue;
});

const hideActionSubmenu = () => {
  showActionSubmenu.value = false;
  // Return focus to the menu button when the submenu closes
  nextTick(() => {
    const v = menuButtonRef.value as any;
    const btn =
      v instanceof HTMLElement ? v : (v?.$el as HTMLElement | null) ?? null;
    btn?.focus?.();
  });
};

const toggleActionSubmenu = async () => {
  showActionSubmenu.value = !showActionSubmenu.value;
  if (showActionSubmenu.value) {
    await nextTick();
    actionSubmenuRef.value?.focus();
  }
};

const sizing = computed(
  () =>
    getSizing(
      size.value as FeatherChartShirtSize,
      chartType.value as FeatherChartType
    ) as FeatherChartDimensions
);

// The overall chart (SVG) width is the control width from sizing.
// The drawable container width/height (where D3 places content) is SVG size minus margins.
const containerWidth = computed(() => {
  const margin = mergedOptions.value.margin || { left: 0, right: 0 };
  return Math.max(0, sizing.value.chart.width - (margin.left + margin.right));
});

const containerHeight = computed(() => {
  const margin = mergedOptions.value.margin || { top: 0, bottom: 0 };
  return Math.max(0, sizing.value.chart.height - (margin.top + margin.bottom));
});

const setChartType = (type: FeatherChartType) => {
  chartType.value = type;
};

const controlWidth = computed((): number => {
  return sizing.value.control.width;
});

const controlWidthPx = computed(() => `${controlWidth.value}px`);

const componentMap: Record<string, () => Promise<any>> = {
  area: () => import("./Area.vue"),
  bar: () => import("./Bar.vue"),
  "vertical-bar": () => import("./VerticalBar.vue"),
  dendrogram: () => import("./Dendrogram.vue"),
  "force-directed": () => import("./ForceDirected.vue"),
  "horizontal-bar": () => import("./HorizontalBar.vue"),
  line: () => import("./Line.vue"),
  radial: () => import("./Radial.vue"),
  "tree-diagram": () => import("./TreeDiagram.vue"),
};

const chartComponent = computed(() => {
  const key = chartType.value.toLowerCase();
  const loader = componentMap[key];
  if (!loader) {
    console.error(`Unknown chart type: ${key}`);
    return null;
  }
  return defineAsyncComponent(loader);
});

// #region ACTIONS
const downloadFileName = computed(() => {
  let chartTitle = title.value || `${chartType.value} chart-data`;
  let fileName = chartTitle.replaceAll(" ", "-").toLowerCase();
  return `${fileName}.json`;
});

const downloadUrl = ref<string>("");

const buildDownloadUrl = () => {
  if (downloadUrl.value) {
    // Revoke the previous URL
    URL.revokeObjectURL(downloadUrl.value);
  }
  // Create a new URL
  try {
    downloadUrl.value = URL.createObjectURL(
      new Blob([JSON.stringify(data.value)], { type: "application/json" })
    );
  } catch (error) {
    console.error("Error creating download URL:", error);
    downloadUrl.value = "";
  }
};

// Build initially and whenever "data" changes
watch(
  () => data.value,
  () => buildDownloadUrl(),
  { deep: true, immediate: true }
);

// If options (e.g., margins) change, trigger redraw/layout recalculation
watch(
  () => options.value,
  () => {
    // mergedOptions-based computeds will update automatically; ensure chart redraws
    nextTick(() => chartRef.value?.draw?.());
  },
  { deep: true }
);

const actionRefresh = () => {
  if (showActionSubmenu.value) hideActionSubmenu();
  setZoomLevel(ZoomLevel.ZOOM_NONE);
  resetPan();
  emit("refresh", id.value, data.value);
};

// #endregion

// Only drag with the middle mouse button to preserve left-click selection on SVG items
const onMouseDown = (e: MouseEvent) => {
  // Middle button (wheel click) only
  if (e.button !== 1) return;

  // Prevent Windows auto-scroll circle on middle click
  e.preventDefault();

  svgDrag.beginDrag(e);
};

// #region ICONS
const iconDownload = computed(() => markRaw(DownloadFile));
const iconRefresh = computed(() => markRaw(Refresh));
const iconMore = computed(() => markRaw(MoreVert));
const iconSettings = computed(() => markRaw(Settings));

// #endregion

// #region PROVIDE
provide("position", svgDrag.position);
provide("zoomScale", zoomScale);
provide("setZoomLevel", setZoomLevel);
provide("svgDrag", svgDrag);
// provide("containerWidth", containerWidth);
// provide("containerHeight", containerHeight);
provide("container", {
  width: containerWidth.value,
  height: containerHeight.value,
});
// #endregion

defineExpose({ setChartType });

onBeforeMount(() => {});

onMounted(async () => {});

onUnmounted(() => {
  // Revoke the previous URL - (avoids memory leaks).
  if (downloadUrl.value) URL.revokeObjectURL(downloadUrl.value);
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/themes/utils" as utils;

.feather-chart-container {
  position: relative;
  background-color: var(vars.$surface);
  padding: 8px;
  overflow: hidden;
  container-name: chart-container;
  container-type: inline-size;
  width: v-bind(controlWidthPx);
  max-width: 100%;

  .feather-chart-title-container {
    @include typo.headline3();
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;
    margin: 0.5rem 0;

    .feather-chart-title {
      display: block;
      flex: 1 1 auto;
      min-width: 0;
      margin-right: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .action-menu {
      display: none;
    }
    .action-container {
      display: flex;
      margin-left: auto;
      button {
        margin: 0;
        .action {
          margin: 0;
        }
      }
      svg {
        user-select: none;
      }
    }
  }

  .actions-submenu {
    position: sticky;
    top: 0.5rem;
    z-index: var(vars.$zindex-popover);
    width: 100%;

    height: 0;
    overflow: visible;
    pointer-events: none; // inner handles clicks
    display: block;

    .actions-submenu-inner {
      position: absolute;
      top: 0;
      right: 0;
      pointer-events: auto;
      overflow: visible;

      display: flex;
      flex: 1 1 auto;

      padding: 0.5rem;
      background: var(vars.$surface);
      border-radius: 0.25rem;
      box-shadow: 0 4px 16px utils.alpha(vars.$primary, 0.18);
      will-change: transform, opacity;
      transition: opacity 150ms ease-out, transform 150ms ease-out;
    }
  }

  .feather-chart-filter-container {
    @include typo.subtitle2();
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;
    margin: 0.5rem 0;

    .time-filter {
      margin: 0;
      margin-left: auto;
      white-space: nowrap;
    }
  }
  .chart {
    background-color: var(vars.$surface);
    overflow: hidden;

    .draggable-container {
      :deep(.xAxis text) {
        font-size: v-bind("xAxisFontSize");
      }
      :deep(.yAxis text) {
        font-size: v-bind("yAxisFontSize");
      }

      transform: translate(v-bind(translateX), v-bind(translateY))
        scale(v-bind(zoomScale));
      transition: transform 0.3s ease-in-out;
      cursor: grab;
      // Show pointer over interactive descendants (including tabindex targets)
      &:not(.being-dragged) {
        :deep(a),
        :deep(rect),
        :deep(circle),
        :deep([role="button"]),
        :deep([role="link"]) {
          cursor: pointer;
        }
      }
      &.being-dragged {
        border: 1px dashed utils.alpha(vars.$primary, 0.24);
        cursor: grabbing;
        transition: none;
      }
    }
  }
}

:deep(.actions-slide-enter-active),
:deep(.actions-slide-leave-active) {
  transition: opacity 150ms ease-out;
}
:deep(.actions-slide-enter-from),
:deep(.actions-slide-leave-to) {
  opacity: 0; // root fades in/out (mostly invisible)
}

// Animate the INNER panel using the parent transition classes
:deep(.actions-slide-enter-from) .actions-submenu-inner {
  opacity: 0;
  transform: translateY(-8px);
}
:deep(.actions-slide-leave-from) .actions-submenu-inner {
  opacity: 1;
  transform: translateY(0);
}
:deep(.actions-slide-leave-to) .actions-submenu-inner {
  opacity: 0;
  transform: translateY(-8px);
}

@container chart-container (max-width: 300px) {
  .feather-chart-container {
    .feather-chart-title-container {
      .action-menu.action-menu {
        display: block;
      }
      .action-container {
        display: none;
      }
    }
  }
}
</style>
