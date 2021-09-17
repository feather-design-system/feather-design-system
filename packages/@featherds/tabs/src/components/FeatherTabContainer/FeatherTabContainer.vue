<template>
  <div class="feather-tab-container">
    <div
      ref="slider"
      class="feather-tab-slider"
      :style="{
        transform: transform,
        'transition-duration': duration,
        width: width,
      }"
    ></div>
    <ul v-bind="attrs" v-on="listeners">
      <slot name="tabs"></slot>
    </ul>
    <div class="tab-panels">
      <!-- tab content should be placed here. i.e. `tab-content` elements. **ORDER IS IMPORTANT** it should match the tab order in `tabs` slot. -->
      <slot />
    </div>
  </div>
</template>
<script>
import {
  useTabContainer,
  model,
  stockProps,
  emits,
} from "@featherds/composables/tabs/TabContainer";
export default {
  model: model,
  emits: emits,
  props: {
    ...stockProps,
  },
  setup(props, context) {
    return useTabContainer(props, context);
  },
  data() {
    return {
      transform: "",
      durationNumber: 250,
      width: "1px",
    };
  },
  watch: {
    selected() {
      this.updateSlider();
    },
    pairs: {
      handler(v) {
        if (v && v.length && this.ro) {
          v.forEach((pair) => {
            if (pair.tab) {
              this.ro.observe(pair.tab.el);
            }
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    duration() {
      return `${this.durationNumber}ms`;
    },
  },
  methods: {
    updateSlider() {
      if (this.$refs.slider.getBoundingClientRect().width < 5) {
        this.durationNumber = 0;
      } else {
        this.durationNumber = 250;
      }
      this.$nextTick(() => {
        const start = this.$el.getBoundingClientRect();
        const end = this.$el
          .querySelector("[aria-selected='true']")
          .getBoundingClientRect();
        const x = end.left - start.left;
        const y = end.height - (this.raised ? 4 : 2);
        this.width = `${end.width}px`;
        this.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    },
  },
  mounted() {
    this.updateSlider();
    this.ro = new ResizeObserver(() => {
      this.updateSlider();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.feather-tab-container {
  position: relative;
  .feather-tab-slider {
    height: 2px;
    transition: transform 280ms;

    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
    transform-origin: left;
  }
  ul[role="tablist"] {
    list-style: none;
    padding: 0;
    margin: 0;
    :deep(li) {
      display: inline-block;
      margin: 0;
    }
    :deep(li:last-child) {
      margin-right: 0;
    }
  }
  :deep(.tablist-container > .tab-content) {
    overflow: auto;
    height: 100%;
  }
}
</style>
<style lang="scss">
@import "~@featherds/styles/themes/variables";
.feather-tab-slider {
  background-color: var($primary);
}
</style>
