<template>
  <div class="determinate-container" :class="classes">
    <svg
      class="feather-progress-circular"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="feather-progress-track"
        fill="transparent"
        :cx="axis"
        :cy="axis"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
      ></circle>
      <circle
        class="feather-progress-indicator"
        fill="transparent"
        :cx="axis"
        :cy="axis"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
        transform="rotate(-90 50 50)"
      ></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from "vue";

const props = {
  size: { type: String, required: false, default: "lg" },
  value: { type: Number, required: false },
};

export default defineComponent({
  props,
  setup(props) {
    const { size, value } = toRefs(props);
    const max = 100;
    const axis = 50;
    const radius = 44;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;

    const classes = computed(() => {
      return {
        sm: size.value === "sm",
        md: size.value === "md",
        lg: size.value === "lg",
      };
    });

    const strokeDasharray = ref(circumference * 2);

    const strokeDashoffset = computed(() => {
      if (!value.value && value.value !== 0) return undefined;
      return ((max - value.value) / max) * circumference + circumference;
    });

    return {
      axis,
      classes,
      radius,
      size,
      strokeDasharray,
      strokeDashoffset,
      strokeWidth,
      value,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

circle {
  stroke-linecap: butt;
  transition: stroke-dashoffset 0.5s ease-in-out;
  stroke: var($background);
  opacity: 0.85;
}

.feather-progress-circular {
  .feather-progress-track {
    &.completed {
      animation: done 1s ease-in-out;
    }
  }
  .feather-progress-indicator {
    stroke: var($secondary);
    &.completed {
      stroke: var($secondary);
      animation: done 1s ease-in-out;
    }
  }
}
.determinate-container {
  margin-bottom: 8px;
  &.sm {
    width: 24px;
    height: 24px;
  }
  &.md {
    width: 32px;
    height: 32px;
  }
  &.lg {
    width: 40px;
    height: 40px;
  }
}
</style>
