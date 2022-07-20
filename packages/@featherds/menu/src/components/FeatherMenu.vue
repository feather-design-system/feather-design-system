<template>
  <div class="feather-menu" :data-ref-id="dataRefId" ref="root">
    <slot name="trigger" :attrs="triggerAttrs" :on="triggerListeners"></slot>
    <div
      class="feather-menu-dropdown"
      :class="{ hidden: calculating }"
      :data-ref-id="dataRefId + '-dropdown'"
      ref="menu"
      :id="menuId"
      v-if="open"
      :style="{ left: positionLeft, top: positionTop, width: menuWidth }"
    >
      <slot v-bind:labelId="triggerId" />
    </div>
  </div>
</template>
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import {
  ref,
  watch,
  nextTick,
  defineComponent,
  onMounted,
  Ref,
  toRef,
  computed,
} from "vue";
import { useResize } from "@featherds/composables/events/Resize";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
import { useScroll } from "@featherds/composables/events/Scroll";

export const props = {
  open: {
    type: Boolean,
    default: false,
  },
  noExpand: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  hasFocus: {
    type: Boolean,
    default: false,
  },
  dataRefId: {
    type: String,
    default: "feather-menu",
  },
  fill: {
    type: Boolean,
    default: false,
  },
  triggerId: {
    type: String,
  },
} as const;
export const emits = {
  "trigger-click": (_e: MouseEvent) => true,
  "outside-click": (_e?: Event) => true,
};
export default defineComponent({
  emits,
  props,
  setup(props, context) {
    const root = ref() as Ref<HTMLElement>;
    const menu = ref() as Ref<HTMLElement>;
    const open = toRef(props, "open");
    const noExpand = toRef(props, "noExpand");
    const menuWidth = ref("auto");
    const windowRef = ref() as Ref<Window>;
    const triggerId = ref(props.triggerId || getSafeId("feather-menu-trigger"));
    const menuId = ref(getSafeId("feather-menu-dropdown"));
    const positionTop = ref("");
    const positionLeft = ref("");
    onMounted(() => {
      windowRef.value = window;
    });

    const calculating = ref(false);

    const getScrollRect = () => {
      return {
        height: windowRef.value.innerHeight,
        width: windowRef.value.innerWidth,
        left: 0,
        top: 0,
      };
    };

    const calculatePosition = () => {
      if (!menu.value) {
        return;
      }
      const containerRect = root.value.getBoundingClientRect();
      calculating.value = true;
      menuWidth.value = "auto";
      nextTick(() => {
        let { height, width } = menu.value.getBoundingClientRect();
        const windowRect = getScrollRect();
        const scrollHeight = windowRect.height;
        const scrollWidth = windowRect.width;

        if (props.fill && width < containerRect.width) {
          menuWidth.value = containerRect.width + "px";
          width = containerRect.width;
        } else {
          menuWidth.value = width + "px";
        }

        let top = 0;
        if (
          scrollHeight - containerRect.bottom < height &&
          containerRect.top >= height
        ) {
          top = containerRect.top - height;
          if (props.cover) {
            top += containerRect.height;
          }
        } else {
          top = containerRect.bottom;
          if (props.cover) {
            top -= containerRect.height;
          }
        }

        let left = props.right
          ? containerRect.right - width
          : containerRect.left;

        if (
          !props.right &&
          containerRect.right >= width &&
          scrollWidth - containerRect.left < width
        ) {
          left = containerRect.right - width;
        }
        if (
          props.right &&
          containerRect.right <= width &&
          scrollWidth - containerRect.left > width
        ) {
          left = containerRect.left;
        }
        positionLeft.value = `${left}px`;
        positionTop.value = `${top}px`;
        calculating.value = false;
      });
    };

    const outsideElementEvent = (e?: Event) => {
      context.emit("outside-click", e);
    };

    const activateOutsideClick = useOutsideClick(root, outsideElementEvent);
    const activateResize = useResize(calculatePosition);
    const activateScrollY = useScroll(windowRef, calculatePosition);
    watch([open, menu], ([v, m]) => {
      if (v && m) {
        calculatePosition();
      }
      activateOutsideClick.value = v;
      activateResize.value = v;
      activateScrollY.value = v;
    });

    const triggerAttrs = computed(() => {
      const attrs = {
        id: triggerId.value,
        "aria-haspopup": "true",
      } as Record<string, string>;
      if (open.value) {
        attrs["aria-controls"] = menuId.value;
      }
      if (!noExpand.value) {
        attrs["aria-expanded"] = open.value ? "true" : "false";
      }
      return attrs;
    });

    const triggerListeners = computed(() => ({
      click: (e: MouseEvent) => {
        context.emit("trigger-click", e);
      },
    }));

    return {
      positionTop,
      positionLeft,
      triggerId,
      triggerAttrs,
      triggerListeners,
      menuId,
      menu,
      menuWidth,
      root,
      calculatePosition,
      calculating,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/variables";
.feather-menu {
  position: relative;
  display: inline-block;
}
.feather-menu-dropdown {
  @include elevation(8);
  position: fixed;
  left: 0;
  top: 0;
  z-index: var($zindex-dropdown);
}
.hidden {
  position: fixed;
}
</style>
