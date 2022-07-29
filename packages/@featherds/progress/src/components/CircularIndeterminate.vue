<template>
  <div class="indeterminate-container" :class="classes">
    <svg viewBox="0 0 100 100">
      <clipPath id="clip">
        <path
          d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 1 -100 v 10 a 22 22 0 0 0 0 80 22 22 0 0 0 1 -80"
        />
      </clipPath>
      <foreignObject
        x="0"
        y="0"
        width="100"
        height="100"
        clip-path="url(#clip)"
      >
        <div class="track" />
      </foreignObject>
      <g class="indicator">
        <foreignObject
          x="0"
          y="0"
          width="100"
          height="100"
          clip-path="url(#clip)"
        >
          <div class="gradient" />
        </foreignObject>
        <!-- <circle class="tip" r="5.15" cx="51" cy="5"></circle> -->
        <rect class="tip" x="50" width="3" height="10"></rect>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

const props = {
  size: { type: String, required: false, default: "lg" },
};

export default defineComponent({
  props,
  setup(props) {
    const { size } = toRefs(props);

    const classes = computed(() => {
      return {
        sm: size.value === "sm",
        md: size.value === "md",
        lg: size.value === "lg",
      };
    });

    return {
      classes,
      size,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

svg {
  max-width: 100px;
}

.feather-progress-container {
  .indicator {
    display: inline-block;
  }
  &.error {
    .indicator {
      display: none;
    }
  }
}
.indeterminate-container {
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
.track {
  width: inherit;
  height: inherit;
  background: var($background);
}
.indicator {
  animation: indeterminate-circular 750ms ease-in-out infinite 250ms;
  transform-origin: center;
}
.gradient {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background: conic-gradient(
    from 360deg,
    transparent 50%,
    var($secondary) 100%
  );
}
.tip {
  fill: var($secondary);
}

@keyframes indeterminate-circular {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
