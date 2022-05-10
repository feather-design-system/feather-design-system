<template>
  <Teleport to="body">
    <Transition :css="animate">
      <div
        class="feather-tooltip-container"
        v-if="show"
        ref="tooltip"
        :style="{ left: left, top: top }"
        :class="[alignmentClass, placementClass]"
      >
        <div class="tooltip" role="tooltip" :id="tooltipID">{{ title }}</div>
        <Pointer class="tooltip-pointer" />
      </div>
    </Transition> </Teleport
  ><slot :attrs="attrs" :on="listeners"> </slot>
</template>
<script lang="ts">
import {
  addLayer,
  ILayer,
  removeLayer,
} from "@featherds/composables/modal/Layers";
import { useScroll } from "@featherds/composables/events/Scroll";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import Pointer from "./Pointer.vue";
import {
  defineComponent,
  toRef,
  computed,
  ref,
  PropType,
  nextTick,
  provide,
  onUnmounted,
} from "vue";
import { PointerAlignment, TooltipPlacement } from "../types";
import { calculatePlacement } from "./Placement";
import { calculateAlignment } from "./Alignment";
export const props = {
  title: {
    type: String,
    required: true,
  },
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: () => TooltipPlacement.top,
  },
  pointerAlignment: {
    type: String as PropType<PointerAlignment>,
    default: () => PointerAlignment.center,
  },
  enterDelay: {
    type: Number,
    default: 400,
  },
  exitDelay: {
    type: Number,
    default: 400,
  },
} as const;
export default defineComponent({
  props,
  setup(props) {
    const show = ref(false); //show will trigger animate when positioning is ready
    const animate = ref(false); //animate triggers the visual
    const triggerID = getSafeId("feather-tooltip-trigger");
    const tooltipID = getSafeId("feather-tooltip");
    const idAttr = "data-feather-tooltip";
    provide("feather-has-tooltip", true);
    let timeout = 0;
    const enter = () => {
      clearTimeout(timeout);
      if (!show.value) {
        timeout = setTimeout(showTooltip, props.enterDelay);
      }
    };
    const leave = () => {
      clearTimeout(timeout);
      timeout = setTimeout(hideTooltip, props.exitDelay);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.keyCode === KEYCODES.ESCAPE) {
        e.preventDefault();
        hideTooltip(true);
      }
    };
    const attrs = computed(() => {
      return {
        [idAttr]: triggerID,
        "aria-describedby": tooltipID,
      };
    });
    const listeners = {
      mouseenter: enter,
      mouseleave: leave,
      focus: enter,
      blur: leave,
      keydown: handleEscape,
    };

    const documentRef = ref(document);
    const activateScroll = useScroll(documentRef, () => hideTooltip(true));

    onUnmounted(() => hideTooltip(true));
    const getTooltip = () => document.getElementById(tooltipID) as HTMLElement;
    let layer: ILayer | undefined;
    const showTooltip = () => {
      animate.value = false;
      show.value = true; //show it but dont animate
      nextTick(() => {
        const tooltip = getTooltip();
        layer = addLayer(tooltip, "tooltip");
        positionTooltip(tooltip);
        show.value = false;
        nextTick(() => {
          animate.value = true;
          show.value = true; //show and animate now :D
          activateScroll.value = true;
        });
      });
    };
    const hideTooltip = (force = false) => {
      if (layer) {
        removeLayer(layer);
        layer = undefined;
        //reset transform and alignment class
        left.value = "";
        top.value = "";
        alignmentClass.value = "";
        placementSelected.value = "";
        show.value = false;
        if (force) {
          animate.value = false;
        }
        activateScroll.value = false;
      }
    };

    const placementProp = toRef(props, "placement");
    const alignmentProp = toRef(props, "pointerAlignment");
    const arrowHeight = 7;
    const arrowOffset = 24;
    const top = ref("");
    const left = ref("");
    const alignmentClass = ref("");
    const placementSelected = ref("");
    const placementClass = computed(() => {
      return placementSelected.value ? "p-" + placementSelected.value : false;
    });

    const positionTooltip = (tooltipElement: HTMLElement) => {
      const triggerElement = document.querySelector(`[${idAttr}=${triggerID}]`);

      if (!triggerElement) {
        console.log("trigger not found");
        return;
      }
      nextTick(() => {
        const triggerBox = triggerElement.getBoundingClientRect();
        const tooltipBox = tooltipElement.getBoundingClientRect();
        const placement = calculatePlacement(
          triggerBox,
          tooltipBox,
          placementProp.value,
          arrowHeight
        );
        const alignment = calculateAlignment(
          placement,
          triggerBox,
          tooltipBox,
          alignmentProp.value,
          arrowOffset
        );
        //set the classes so arrow can be positioned
        alignmentClass.value = alignment.toString();
        placementSelected.value = placement.toString();

        //calculate the transform based off alignment and placement
        let topCal = 0;
        let leftCal = 0;
        if (
          placement === TooltipPlacement.left ||
          placement === TooltipPlacement.right
        ) {
          //align center points of trigger and tooltip
          //so they can be side by side
          topCal =
            triggerBox.top + triggerBox.height / 2 - tooltipBox.height / 2;
          //find the left spacing
          if (placement === TooltipPlacement.left) {
            leftCal = triggerBox.left - tooltipBox.width - arrowHeight;
          }
          if (placement === TooltipPlacement.right) {
            leftCal = triggerBox.right;
          }
        }

        if (
          placement === TooltipPlacement.top ||
          placement === TooltipPlacement.bottom
        ) {
          //get vertical position
          //top must take into cosideration arrow
          topCal = triggerBox.top - tooltipBox.height - arrowHeight;
          if (placement === TooltipPlacement.bottom) {
            topCal = triggerBox.bottom;
          }
          const triggerBoxCenter = triggerBox.left + triggerBox.width / 2;
          switch (alignment) {
            case PointerAlignment.center:
              //align centers
              leftCal = triggerBoxCenter - tooltipBox.width / 2;
              break;
            case PointerAlignment.left:
              //align left but take into consideration arrow offset
              leftCal = triggerBoxCenter - arrowOffset;
              break;
            case PointerAlignment.right:
              //align to the right and allow space for arrow offset
              leftCal = triggerBoxCenter - tooltipBox.width + arrowOffset;
              break;
          }
        }

        top.value = topCal.toString() + "px";
        left.value = leftCal.toString() + "px";
        return;
      });
    };

    return {
      attrs,
      listeners,
      show,
      animate,
      alignmentClass,
      placementClass,
      top,
      left,
      tooltipID,
    };
  },
  components: {
    Pointer,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.feather-tooltip-description {
  @include screen-reader;
}
.feather-tooltip-container {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--feather-current-zindex, var($zindex-tooltip));
  .tooltip {
    @include body-small;
    color: var($secondary-text-on-color);
    background-color: var($high-visibility-on-surface);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    max-width: 16rem;
  }
  .tooltip-pointer {
    position: absolute;
  }

  &.p-bottom {
    .tooltip {
      margin-top: 8px;
    }
    .tooltip-pointer {
      top: 1px;
      transform: rotate(180deg);
    }
    &.center .tooltip-pointer {
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
    }
    &.right .tooltip-pointer {
      right: 4px;
    }
    &.left .tooltip-pointer {
      left: 4px;
    }
  }
  &.p-top {
    .tooltip-pointer {
      top: calc(100% - 2px);
    }
    &.center .tooltip-pointer {
      left: 50%;
      transform: translateX(-50%);
    }
    &.right .tooltip-pointer {
      right: 4px;
    }
    &.left .tooltip-pointer {
      left: 4px;
    }
  }

  &.p-left {
    .tooltip-pointer {
      right: -28px;
      transform: rotate(-90deg) translateY(-50%);
      top: calc(50% - 5px);
    }
  }
  &.p-right {
    .tooltip {
      margin-left: 8px;
    }
    .tooltip-pointer {
      left: -20px;
      transform: rotate(90deg) translateY(-50%);
      top: calc(50% - 5px);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition-property: opacity, transform;
  transition-duration: 280ms;
  transition-timing-function: ease-in-out;
}

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
//   transform: translateY(4px);
// }

.p-top {
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translateY(4px);
  }
}

.p-bottom {
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
.p-left {
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translateX(4px);
  }
}

.p-right {
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translateX(-4px);
  }
}

.v-enter-to,
.v-leave-from {
  transform: translateY(0) translateX(0);
}
</style>
