<template>
  <div class="feather-menu" ref="root">
    <slot name="trigger"></slot>
    <div
      class="feather-menu-dropdown"
      ref="menu"
      v-show="open"
      :id="menuId"
      :class="[position, covered]"
    >
      <slot v-bind:labelId="triggerId" />
    </div>
  </div>
</template>
<script>
import { getSafeId } from "@featherds/utils/id";
import { ref, computed, watch, nextTick } from "vue";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
import { useResize } from "@featherds/composables/events/Resize";
import { useScroll } from "@featherds/composables/events/Scroll";

export default {
  emits: ["outside-click", "trigger-click"],
  props: {
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
  },
  setup(props, context) {
    const root = ref(null);
    const trigger = ref(null);
    const menu = ref(null);
    const scrollX = ref(null);
    const scrollY = ref(null);
    const triggerId = ref(getSafeId("feather-menu-trigger"));
    const menuId = ref(getSafeId("feather-menu-dropdown"));
    const position = ref(`bottom-${props.right ? "right" : "left"}`);
    const covered = computed(() => (props.cover ? "covered" : ""));
    const updateScrollElements = () => {
      let node = root.value.parentNode;
      scrollX.value = null;
      scrollY.value = null;
      while (node) {
        if (node === document.body) {
          if (!scrollX.value) {
            scrollX.value = document;
          }
          if (!scrollY.value) {
            scrollY.value = document;
          }
          return;
        }
        if (!scrollY.value && node.scrollHeight > node.clientHeight) {
          const overflowYStyle = window.getComputedStyle(node).overflowY;
          if (
            overflowYStyle.indexOf("hidden") === -1 &&
            overflowYStyle.indexOf("visible") === -1
          ) {
            scrollY.value = node;
          }
        }
        if (!scrollX.value && node.scrollWidth > node.clientWidth) {
          const overflowXStyle = window.getComputedStyle(node).overflowX;
          if (
            overflowXStyle.indexOf("hidden") === -1 &&
            overflowXStyle.indexOf("visible") === -1
          ) {
            scrollX.value = node;
          }
        }

        if (scrollY.value && scrollX.value) {
          return;
        }
        node = node.parentNode;
      }
    };
    const getScrollRect = (element) => {
      if (element && element.getBoundingClientRect) {
        return element.getBoundingClientRect();
      }
      return {
        height: window.innerHeight,
        width: window.innerWidth,
        left: 0,
        top: 0,
      };
    };

    const calculatePosition = () => {
      updateScrollElements();
      const rect = trigger.value.getBoundingClientRect();
      nextTick(() => {
        const { height, width } = menu.value.getBoundingClientRect();
        const scrollYRect = getScrollRect(scrollY.value);
        let scrollXRect = scrollYRect;
        if (scrollY.value !== scrollX.value) {
          scrollXRect = getScrollRect(scrollX.value);
        }
        const scrollHeight = scrollYRect.height;
        const scrollWidth = scrollXRect.width;
        const adjustedRect = {
          bottom: rect.bottom - scrollYRect.top,
          top: rect.top - scrollYRect.top,
          left: rect.left - scrollXRect.left,
          right: rect.right - scrollXRect.left,
        };
        let vertical = "bottom";
        if (
          scrollHeight - adjustedRect.bottom < height &&
          adjustedRect.top >= height
        ) {
          vertical = "top";
        }
        let horizontal = props.right ? "right" : "left";

        if (
          !props.right &&
          adjustedRect.right >= width &&
          scrollWidth - adjustedRect.left < width
        ) {
          horizontal = "right";
        }
        if (
          props.right &&
          adjustedRect.right <= width &&
          scrollWidth - adjustedRect.left > width
        ) {
          horizontal = "left";
        }
        position.value = `${vertical}-${horizontal}`;
      });
    };
    const outsideElementEvent = (e) => {
      context.emit("outside-click", e);
    };
    const activateOutsideClick = useOutsideClick(root, outsideElementEvent);
    const activateResize = useResize(calculatePosition);
    const activateScrollX = useScroll(scrollX, calculatePosition);
    const activateScrollY = useScroll(scrollY, calculatePosition);

    watch(
      () => props.open,
      (v) => {
        if (v) {
          calculatePosition();
        }
        activateOutsideClick.value = v;
        activateResize.value = v;
        activateScrollX.value = v;
        activateScrollY.value = v;
      }
    );

    //set expanded on the trigger element for accessibility
    watch(
      [() => props.open, () => props.noExpand, trigger],
      ([op, noexpand, trig]) => {
        if (!noexpand && trig) {
          trig.setAttribute("aria-expanded", op ? "true" : "false");
        }
      }
    );

    watch(root, (v) => {
      trigger.value = v.querySelector("[menu-trigger]");
      trigger.value.addEventListener("click", (e) => {
        context.emit("trigger-click", e);
      });
    });
    watch(trigger, (v) => {
      if (v.id) {
        triggerId.value = v.id;
      } else {
        v.id = triggerId.value;
      }
      v.setAttribute("aria-haspopup", "true");
      v.setAttribute("aria-controls", menuId.value);
    });

    return {
      position,
      covered,
      triggerId,
      menuId,
      menu,
      root,
      trigger,
      calculatePosition,
    };
  },
};
</script>
<style lang="scss">
.feather-menu-dropdown {
  &.bottom-right {
    top: 100%;
    right: 0;
    &.covered {
      top: 0;
    }
  }
  &.bottom-left {
    top: 100%;
    left: 0;
    &.covered {
      top: 0;
    }
  }
  &.top-left {
    bottom: 100%;
    left: 0;
    &.covered {
      bottom: 0;
    }
  }
  &.top-right {
    bottom: 100%;
    right: 0;
    &.covered {
      bottom: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/variables";
.feather-menu {
  position: relative;
  display: inline-block;
}
.feather-menu-dropdown {
  @include elevation(8);
  position: absolute;
  z-index: var($zindex-dropdown);
}
</style>
