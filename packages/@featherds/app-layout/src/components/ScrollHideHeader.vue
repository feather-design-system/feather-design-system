<template>
  <div
    class="header-wrapper"
    ref="wrapper"
    :class="{ 'scroll-hide': scrollHide }"
  >
    <slot name="pre"></slot>
    <header class="banner" :class="[displayClass, transitionClass]">
      <slot />
    </header>
  </div>
</template>
<script lang="ts">
import { useScroll } from "@featherds/composables/events/Scroll";
import { ref, onMounted, defineComponent } from "vue";

export const props = {
  scrollHide: {
    type: Boolean,
    default: false,
  },
} as const;

export default defineComponent({
  props,
  setup: (props) => {
    //scroll hiding
    const transitionClass = ref("no-transition");
    const displayClass = ref("show");
    const wrapper = ref();

    if (props.scrollHide) {
      let previousScrollPosition = 0;
      let height = 60;
      const onScroll = () => {
        height = parseInt(
          getComputedStyle(wrapper.value).getPropertyValue(
            "--feather-header-height"
          ),
          10
        );
        const scrollTop = document.documentElement.scrollTop;
        const scrollingDown = scrollTop >= previousScrollPosition;
        previousScrollPosition = scrollTop;
        if (scrollTop > height && scrollingDown) {
          displayClass.value = "hide";
          return;
        }
        if (scrollTop > height && !scrollingDown) {
          displayClass.value = "show";
          return;
        }
        displayClass.value = "show";
      };

      onMounted(() => {
        const documentRef = ref(document);
        const activate = useScroll(documentRef, onScroll);
        activate.value = true;
        onScroll();
        transitionClass.value = "";
      });
    }

    return {
      transitionClass,
      displayClass,
      wrapper,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

.header-wrapper,
.banner {
  width: 100%;
  height: var($header-height);
}

.scroll-hide header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var($zindex-fixed);
  transition: transform 280ms ease-in-out;
  &.show {
    transform: translateY(0px);
  }
  &.hide {
    transform: translateY(-100%);
  }
  &.no-transition {
    transition: none;
  }
}
</style>
