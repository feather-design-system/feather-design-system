<template>
  <div
    class="feather-progress-container"
    :class="{ ...containerClasses }"
    :aria-busy="!completed"
  >
    <span class="reduced-motion-caption">
      {{ reducedMotionText }}
    </span>
    <div class="feather-progress-linear">
      <span class="feather-progress-track" />
      <span class="feather-progress-indicator" :style="indicatorStyle" />
      <span class="feather-progress-indicator2" />
    </div>
    <div v-if="hasError" class="error-message">
      <slot name="error">{{ error }}</slot>
    </div>
    <template v-else>
      <div
        v-if="showPercentage && isDeterminate"
        class="feather-progress-report"
        aria-live="off"
      >
        {{ reportText }}
      </div>
    </template>
    <span class="announce" ref="announce" aria-live="assertive"></span>
    <progress max="100" :value="value" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRef,
  toRefs,
  watch,
} from "vue";
import { _setTimeout } from "@featherds/utils/setTimeout";
import { useProgress } from "@featherds/composables/progress/Progress";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
const LABELS = {
  reducedMotion: "Loading...",
  indeterminate: "In progress, please wait",
  units: "${value} percent",
  completed: ", progress complete",
  error: "Progress interrupted, ",
  report: "${value}${symbol}",
  symbol: "%",
};
export const props = {
  value: { type: Number, required: false },
  error: { type: String, required: false },
  showPercentage: { type: Boolean, required: false, default: false },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
  },
};
export default defineComponent({
  props,
  setup(props) {
    const { error, showPercentage, value } = toRefs(props);
    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    const {
      announce,
      completed,
      containerClasses,
      hasError,
      isDeterminate,
      isIndeterminate,
      percentage,
    } = useProgress(value, error);
    const indicatorStyle = computed(() => {
      if (isIndeterminate.value) return;
      return { width: percentage.value + "%" };
    });

    const reducedMotionText = computed(() => {
      return labels.reducedMotionLabel.value;
    });

    const reportText = computed(() => {
      const status = labels.reportLabel.value
        .replace("${symbol}", labels.symbolLabel.value)
        .replace(
          "${value}",
          percentage.value ? percentage.value.toString() : ""
        );
      return status;
    });

    const statusAnnouncement = computed(() => {
      const valueString = percentage.value ? percentage.value.toString() : "";
      return labels.unitsLabel.value.replace("${value}", valueString);
    });

    const completedAnnouncement = computed(() => {
      return statusAnnouncement.value + labels.completedLabel.value;
    });

    watch(error, (newValue) => {
      announce.value.innerHTML = newValue
        ? labels.errorLabel.value + newValue
        : "";
    });

    watch(value, (newValue, oldValue) => {
      if (newValue === oldValue) return;
      newValue = newValue ? newValue : 0;
      if (isDeterminate.value && newValue !== null) {
        if (announce.value) {
          if (percentage.value && +percentage.value >= 100) {
            announce.value.innerHTML = `${completedAnnouncement.value}`;
          } else {
            announce.value.innerHTML = `${statusAnnouncement.value}`;
          }
        }
      }
    });

    onMounted(() => {
      if (isIndeterminate.value) {
        _setTimeout(() => {
          // NOTE: chrome does not announce without the delay; nextTick has no effect.
          announce.value.innerHTML = labels.indeterminateLabel.value;
        }, 250);
      }
    });

    return {
      announce,
      completed,
      containerClasses,
      error,
      hasError,
      indicatorStyle,
      isDeterminate,
      isIndeterminate,
      percentage,
      reducedMotionText,
      reportText,
      showPercentage,
      ...labels,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
progress {
  display: none;
}
.feather-progress-container {
  position: relative;
  width: 300px;

  .feather-progress-linear {
    position: relative;
    width: inherit;
    border-radius: 8px;
    height: 8px;
    margin-bottom: 8px;
    overflow: hidden;

    span {
      position: absolute;
      height: 8px;
    }
    .feather-progress-track {
      background: var($background);
      border-radius: 8px;
      width: 100%;
    }
  }

  &.determinate {
    .feather-progress-linear {
      .feather-progress-indicator {
        background: var($secondary);
        border-radius: 8px 0 0 8px;
        transition: width 375ms ease-in-out 50ms;
      }
    }
  }

  &.indeterminate {
    .feather-progress-linear {
      .feather-progress-indicator {
        animation: indeterminate-animation 1.625s infinite linear 625ms;
        width: 40%;
        opacity: 1;
        left: -40%;
        background: linear-gradient(
          to right,
          var($background),
          var($secondary)
        );
        border-radius: 8px;
      }
      .feather-progress-indicator2 {
        animation: indeterminate-animation 1.625s infinite linear;
        width: 40%;
        opacity: 0;
        left: -40%;
        background: linear-gradient(
          to right,
          var($background),
          var($secondary)
        );
        border-radius: 8px;
        opacity: 1;
      }
    }
  }
  &.indeterminate.completed {
    .feather-progress-linear {
      .feather-progress-indicator,
      .feather-progress-indicator2 {
        animation: indeterminate-complete 875ms ease forwards;
        width: inherit;
        left: 0;
      }
    }
  }

  &.error.completed {
    .feather-progress-linear {
      .feather-progress-indicator,
      .feather-progress-indicator2 {
        animation: error-complete 875ms ease forwards;
        width: inherit;
      }
    }
    .error-message {
      position: relative;
      @include caption;
      text-align: right;
      right: 0;
      height: 8px;
      color: var($error);
    }
  }
  .feather-progress-report {
    position: relative;
    @include caption;
    text-align: right;
    right: 8px;
    height: 8px;
  }

  span.announce {
    display: inline-block;
    overflow: hidden;
    height: 0;
    width: 0;
  }
}

@keyframes indeterminate-animation {
  0% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(600%);
  }
}

@keyframes indeterminate-complete {
  from {
    background: var($background);
    width: 100%;
  }
  to {
    background: var($secondary);
    width: 100%;
  }
}
@keyframes error-complete {
  from {
    background: var($secondary);
  }
  to {
    background: var($background);
  }
}
@media screen {
  .feather-progress-container {
    .reduced-motion-caption {
      display: none;
    }
  }
}
@media (prefers-reduced-motion) {
  .feather-progress-container {
    .reduced-motion-caption {
      @include caption;
      position: relative;
      display: block;
      text-align: center;
    }
    .feather-progress-linear {
      display: none;
      height: 0;
      opacity: 0;
    }
    .feather-progress-report {
      text-align: center;
      right: 0;
    }
    &.error.completed {
      .error-message {
        text-align: center;
        right: 0;
      }
    }
  }
}
</style>
