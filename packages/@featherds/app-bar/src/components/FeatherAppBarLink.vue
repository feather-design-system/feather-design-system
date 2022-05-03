<template>
  <a :href="url" :aria-label="title" :class="type" class="hover focus">
    <FeatherIcon :icon="icon" ref="icon" />
    <FeatherRipple v-if="type === 'round'" center />
  </a>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherRipple } from "@featherds/ripple";
import { defineComponent, onMounted, ref, ComponentPublicInstance } from "vue";
export const props = {
  icon: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "round",
    validator: (v: string) => {
      return ["round", "home"].indexOf(v) > -1;
    },
  },
} as const;
export default defineComponent({
  props,
  setup(props) {
    const icon = ref<ComponentPublicInstance<HTMLElement>>();
    onMounted(() => {
      if (props.type === "home" && icon.value) {
        const svg = icon.value.$el;
        const svgHeight = parseInt(svg.getAttribute("height"), 10);
        const svgWidth = parseInt(svg.getAttribute("width"), 10);
        const computedHeight = parseInt(
          window.getComputedStyle(svg).height,
          10
        );
        const computedWidth = Math.ceil(
          1 + (svgWidth / svgHeight) * computedHeight
        );
        svg.style.width = `${computedWidth}px`;
      }
    });
  },

  components: {
    FeatherIcon,
    FeatherRipple,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
a.round {
  @include state-on-surface-dark();
  display: flex;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg.feather-icon {
    height: 1.5rem;
    width: auto;
  }

  + a.round {
    margin-left: var($spacing-xs);
  }
}

a.home {
  height: auto;
  padding: 0.25rem;
  &:focus {
    background: linear-gradient(
      alpha($state-color-on-color, var($state-opacity-focus-on-color)),
      alpha($state-color-on-color, var($state-opacity-focus-on-color))
    );
  }
  :deep(svg.feather-icon) {
    color: var($surface);

    height: 2rem;
    width: auto;
  }
}
</style>
