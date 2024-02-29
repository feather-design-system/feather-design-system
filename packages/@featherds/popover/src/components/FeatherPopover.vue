<template>
  <slot name="trigger" :attrs="attrs" :on="listeners"> </slot>
  <Transition :css="animate">
    <div
      class="feather-popover-container"
      v-if="show"
      ref="popover"
      :style="{ left: left, top: top }"
      :class="[alignmentClass, placementClass]"
    >
      <div class="popover" :id="popoverID"><slot /></div>
      <Pointer class="popover-pointer" />
    </div>
  </Transition>
</template>
<script lang="ts">
import { useScroll } from "@featherds/composables/events/Scroll";
import { getSafeId } from "@featherds/utils/id";
import { Code } from "@featherds/utils/keys";
import Pointer from "./PopoverPointer.vue";
import {
  defineComponent,
  toRef,
  computed,
  ref,
  Ref,
  PropType,
  nextTick,
  provide,
  onUnmounted,
  watch,
  onMounted,
} from "vue";
import { PointerAlignment, PopoverPlacement } from "../types";
import { calculatePlacement } from "./Placement";
import { calculateAlignment } from "./Alignment";
import { useResize } from "@featherds/composables/events/Resize";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
export const props = {
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: () => PopoverPlacement.top,
  },
  pointerAlignment: {
    type: String as PropType<PointerAlignment>,
    default: () => PointerAlignment.center,
  },
} as const;
export default defineComponent({
  props,
  setup(props) {
    const show = ref(false); //show will trigger animate when positioning is ready
    const animate = ref(false); //animate triggers the visual
    const popover = ref() as Ref<HTMLElement>;
    const triggerID = getSafeId("feather-popover-trigger");
    const popoverID = getSafeId("feather-popover");
    const idAttr = "data-feather-popover";
    provide("feather-has-popover", true);

    const handleKeypress = (e: KeyboardEvent) => {
      if (e.code === Code.ESCAPE) {
        e.preventDefault();
        hidePopover(true);
      }
      if (e.code === Code.ENTER || e.code === Code.SPACE) {
        e.preventDefault();
        togglePopover();
      }
    };
    const togglePopover = () => {
      if (show.value) {
        hidePopover();
      } else {
        showPopover();
      }
    };
    const attrs = computed(() => {
      return {
        [idAttr]: triggerID,
        "aria-controls": popoverID,
        "aria-expanded": show.value,
      };
    });
    const listeners = {
      click: togglePopover,
      keydown: handleKeypress,
    };

    onMounted(() => (windowRef.value = window));
    onUnmounted(() => hidePopover(true));
    const getPopover = () => document.getElementById(popoverID) as HTMLElement;
    const showPopover = () => {
      animate.value = false;
      show.value = true; //show it but dont animate
      nextTick(() => {
        const popover = getPopover();
        positionPopover(popover);
        show.value = false;
        nextTick(() => {
          animate.value = true;
          show.value = true; //show and animate now :D
        });
      });
    };
    const hidePopover = (force = false) => {
      //reset transform and alignment class
      left.value = "";
      top.value = "";
      alignmentClass.value = "";
      placementSelected.value = "";
      show.value = false;
      if (force) {
        animate.value = false;
      }
    };
    const windowRef = ref() as Ref<Window>;
    const scrollActivate = useScroll(windowRef, () => {
      positionPopover(getPopover());
    });
    const resizeActivate = useResize(() => {
      hidePopover(true);
    });
    const outsideClickActivate = useOutsideClick(
      computed(() => {
        return [
          popover.value,
          document.querySelector(`[${idAttr}=${triggerID}]`),
        ];
      }) as Ref<HTMLElement[]>,
      () => {
        hidePopover(true);
      },
      { click: true }
    );

    watch(show, (v) => {
      scrollActivate.value = v;
      resizeActivate.value = v;
      outsideClickActivate.value = v;
    });

    const placementProp = toRef(props, "placement");
    const alignmentProp = toRef(props, "pointerAlignment");
    const arrowHeight = 18;
    const arrowOffset = 31;
    const top = ref("");
    const left = ref("");
    const alignmentClass = ref("");
    const placementSelected = ref("");
    const placementClass = computed(() => {
      return placementSelected.value ? "p-" + placementSelected.value : false;
    });

    const positionPopover = (popoverElement: HTMLElement) => {
      const triggerElement = document.querySelector(`[${idAttr}=${triggerID}]`);

      if (!triggerElement) {
        console.log("trigger not found");
        return;
      }
      nextTick(() => {
        const triggerBox = triggerElement.getBoundingClientRect();
        const popoverBox = popoverElement.getBoundingClientRect();
        const placement = calculatePlacement(
          triggerBox,
          popoverBox,
          placementProp.value,
          arrowHeight
        ) as PopoverPlacement; // ts(18048)
        const alignment = calculateAlignment(
          placement,
          triggerBox,
          popoverBox,
          alignmentProp.value,
          arrowOffset
        ) as PointerAlignment; // ts(18048)
        //set the classes so arrow can be positioned
        alignmentClass.value = alignment.toString();
        placementSelected.value = placement.toString();

        //calculate the transform based off alignment and placement
        let topCal = 0;
        let leftCal = 0;
        if (
          placement === PopoverPlacement.left ||
          placement === PopoverPlacement.right
        ) {
          //align center points of trigger and popover
          //so they can be side by side
          const triggerBoxCenter = triggerBox.top + triggerBox.height / 2;
          //find the left spacing
          if (placement === PopoverPlacement.left) {
            leftCal = triggerBox.left - popoverBox.width - arrowHeight;
          }
          if (placement === PopoverPlacement.right) {
            leftCal = triggerBox.right;
          }

          switch (alignment) {
            case PointerAlignment.center:
              //align centers
              topCal = triggerBoxCenter - popoverBox.height / 2;
              break;
            case PointerAlignment.left:
              //align left but take into consideration arrow offset
              topCal = triggerBoxCenter - arrowOffset;
              break;
            case PointerAlignment.right:
              //align to the right and allow space for arrow offset
              topCal = triggerBoxCenter - popoverBox.height + arrowOffset;
              break;
          }
        }

        if (
          placement === PopoverPlacement.top ||
          placement === PopoverPlacement.bottom
        ) {
          //get vertical position
          //top must take into cosideration arrow
          topCal = triggerBox.top - popoverBox.height - arrowHeight;
          if (placement === PopoverPlacement.bottom) {
            topCal = triggerBox.bottom;
          }
          const triggerBoxCenter = triggerBox.left + triggerBox.width / 2;
          switch (alignment) {
            case PointerAlignment.center:
              //align centers
              leftCal = triggerBoxCenter - popoverBox.width / 2;
              break;
            case PointerAlignment.left:
              //align left but take into consideration arrow offset
              leftCal = triggerBoxCenter - arrowOffset;
              break;
            case PointerAlignment.right:
              //align to the right and allow space for arrow offset
              leftCal = triggerBoxCenter - popoverBox.width + arrowOffset;
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
      popoverID,
      popover,
    };
  },
  components: {
    Pointer,
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
$pWidth: 33px;
$pHeight: 18px;
$expectedWidth: 18px;
$offset: 15px;
$verticalOffset: $offset + (math.div($pWidth, 2) - math.div($pHeight, 2));

.feather-popover-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var($zindex-popover);
  .popover {
    @include body-small;
    color: var($secondary-text-on-surface);
    background-color: var($elevation-background-2);
    border: 1px solid var($border-on-surface);
    padding: 1.25rem;
    border-radius: 4px;
    max-width: 16rem;
  }
  .popover-pointer {
    position: absolute;
    transform-origin: center center;
  }

  &.p-bottom {
    .popover {
      margin-top: $expectedWidth;
    }
    .popover-pointer {
      top: 4px;
      transform: rotate(180deg);
    }
    &.center .popover-pointer {
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
    }
    &.right .popover-pointer {
      right: $offset;
    }
    &.left .popover-pointer {
      left: $offset;
    }
  }
  &.p-top {
    .popover-pointer {
      top: calc(100% - 3px);
    }
    &.center .popover-pointer {
      left: 50%;
      transform: translateX(-50%);
    }
    &.right .popover-pointer {
      right: $offset;
    }
    &.left .popover-pointer {
      left: $offset;
    }
  }

  &.p-left {
    .popover {
      margin-right: $expectedWidth;
    }
    .popover-pointer {
      right: -4px;

      transform: rotate(-90deg);
    }

    &.center .popover-pointer {
      top: calc(50% - ($pHeight/2));
    }
    &.right .popover-pointer {
      bottom: $verticalOffset;
    }
    &.left .popover-pointer {
      top: $verticalOffset;
    }
  }
  &.p-right {
    .popover {
      margin-left: $expectedWidth;
    }
    .popover-pointer {
      left: -4px;
      transform: rotate(90deg);
    }
    &.center .popover-pointer {
      top: calc(50% - ($pHeight/2));
    }
    &.right .popover-pointer {
      bottom: $verticalOffset;
    }
    &.left .popover-pointer {
      top: $verticalOffset;
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
