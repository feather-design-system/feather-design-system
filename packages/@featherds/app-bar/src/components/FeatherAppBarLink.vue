<template>
  <a :href="url" :aria-label="title" :class="type">
    <FeatherIcon :icon="icon" ref="icon" />
    <FeatherRipple v-if="type === 'round'" center />
  </a>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherRipple } from "@featherds/ripple";
export default {
  props: {
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
      validator(v) {
        return ["round", "home"].indexOf(v) > -1;
      },
    },
  },
  mounted() {
    if (this.type === "home" && this.$refs.icon) {
      const svg = this.$refs.icon.$el;
      const svgHeight = parseInt(svg.getAttribute("height"), 10);
      const svgWidth = parseInt(svg.getAttribute("width"), 10);
      const computedHeight = parseInt(window.getComputedStyle(svg).height, 10);
      const computedWidth = Math.ceil(
        1 + (svgWidth / svgHeight) * computedHeight
      );
      svg.style.width = `${computedWidth}px`;
    }
  },
  components: {
    FeatherIcon,
    FeatherRipple,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
a.round {
  display: flex;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(
      alpha($state-color-on-color, var($state-opacity-hover-on-color)),
      alpha($state-color-on-color, var($state-opacity-hover-on-color))
    );
    &:focus {
      background: linear-gradient(
          alpha($state-color-on-color, var($state-opacity-hover-on-color)),
          alpha($state-color-on-color, var($state-opacity-hover-on-color))
        ),
        linear-gradient(
          alpha($state-color-on-color, var($state-opacity-focus-on-color)),
          alpha($state-color-on-color, var($state-opacity-focus-on-color))
        );
    }
  }
  &:focus {
    background: linear-gradient(
      alpha($state-color-on-color, var($state-opacity-focus-on-color)),
      alpha($state-color-on-color, var($state-opacity-focus-on-color))
    );
    border: 1px solid var($surface);
    outline: 0;
  }
  svg.feather-icon {
    color: var($surface);

    height: 1.5rem;
    width: auto;
  }
  .ripple {
    background-color: var($state-color-on-color);
    opacity: var($state-opacity-pressed-on-color);
    border-radius: 100%;
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
