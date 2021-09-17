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
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/themes/utils";
a.round {
  display: flex;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(
      alpha($state-color-on-neutral, var($state-opacity-hover-on-neutral)),
      alpha($state-color-on-neutral, var($state-opacity-hover-on-neutral))
    );
    &:focus {
      background: linear-gradient(
          alpha($state-color-on-neutral, var($state-opacity-hover-on-neutral)),
          alpha($state-color-on-neutral, var($state-opacity-hover-on-neutral))
        ),
        linear-gradient(
          alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral)),
          alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral))
        );
    }
  }
  &:focus {
    background: linear-gradient(
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral)),
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral))
    );
    border: 1px solid var($surface);
    outline: 0;
  }
  svg.feather-icon {
    color: var($surface);

    height: 24px;
    width: auto;
  }
  .ripple {
    background-color: var($state-color-on-color);
    opacity: var($state-opacity-pressed-on-color);
    border-radius: 100%;
  }
  + a.round {
    margin-left: $spacing-xs;
  }
}

a.home {
  height: auto;
  padding: 4px;
  &:focus {
    background: linear-gradient(
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral)),
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral))
    );
  }
  :deep(svg.feather-icon) {
    color: var($surface);

    height: 32px;
    width: auto;
  }
}
</style>
