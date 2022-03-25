<template>
  <div class="feather-menu" ref="root">
    <slot name="trigger"></slot>
    <Teleport to="body">
      <div
        class="feather-menu-dropdown"
        :class="{ hidden: calculating }"
        ref="menu"
        v-show="open"
        :id="menuId"
        :style="{ transform: position, width: menuWidth }"
      >
        <div tabindex="0" @focus="handleFocusOut"></div>
        <slot v-bind:labelId="triggerId" />
        <div tabindex="0" @focus="handleFocusOut"></div>
      </div>
    </Teleport>
  </div>
</template>
<script>
import { getSafeId } from "@featherds/utils/id";
import { ref, watch, nextTick, computed } from "vue";
import { useResize } from "@featherds/composables/events/Resize";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
import { useScroll } from "@featherds/composables/events/Scroll";
import {
  addLayer,
  getElements,
  removeLayer,
} from "@featherds/composables/modal/Layers";

export default {
  emits: ["trigger-click", "close", "outside-click"],

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
    hasFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const root = ref(null);
    const trigger = ref(null);
    const menu = ref(null);
    const menuWidth = ref("auto");
    const windowRef = ref(window);
    const triggerId = ref(getSafeId("feather-menu-trigger"));
    const menuId = ref(getSafeId("feather-menu-dropdown"));
    const position = ref("");
    const scrollTop = () => {
      if (!document) return 0;
      return (document.documentElement || document.body).scrollTop;
    };
    const scrollLeft = () => {
      if (!document) return 0;
      return (document.documentElement || document.body).scrollLeft;
    };
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

      nextTick(() => {
        let { height, width } = menu.value.getBoundingClientRect();
        const windowRect = getScrollRect();
        const scrollHeight = windowRect.height;
        const scrollWidth = windowRect.width;

        if (width < containerRect.width) {
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
        top += scrollTop();
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
        left += scrollLeft();
        position.value = `translate(${left}px, ${top}px)`;
        calculating.value = false;
      });
    };
    const close = (e) => {
      //dont close if we are scrolling a layer itself
      if (layers.value.some((el) => el.contains(e.target))) {
        return;
      }
      context.emit("close", false);
    };
    const outsideElementEvent = (e) => {
      context.emit("outside-click", e);
    };
    const layer = ref(null);
    const layers = computed(() => {
      if (layer.value) {
        return [root.value, ...getElements(layer.value).value];
      }
      return [root.value];
    });
    const activateOutsideClick = useOutsideClick(layers, outsideElementEvent);
    const activateResize = useResize(close);
    const activateScrollY = useScroll(windowRef, close);
    watch([() => props.open, menu], ([v, m]) => {
      if (v && m && !layer.value) {
        calculatePosition();
        layer.value = addLayer(menu, "dropdown");
      } else if (!v && layer.value) {
        removeLayer(layer.value);
        layer.value = null;
      }
      activateOutsideClick.value = v;
      activateResize.value = v;
      activateScrollY.value = v;
    });

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

    const handleFocusOut = () => {
      context.emit("close");
    };

    return {
      position,
      triggerId,
      menuId,
      menu,
      menuWidth,
      root,
      trigger,
      calculatePosition,
      handleFocusOut,
      calculating,
    };
  },
};
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
  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--feather-current-zindex, var($zindex-dropdown));
}
.hidden {
  position: fixed;
}
</style>
