<template>
  <div
    class="feather-progress-container"
    :class="{ ...containerClasses }"
    :aria-busy="!completed"
  >
    <span class="reduced-motion-caption">
      {{ reducedMotionText }}
    </span>
    <template v-if="isIndeterminate">
      <CircularIndeterminate :size="size" />
    </template>
    <template v-if="isDeterminate">
      <CircularDeterminate :size="size" :value="value" />
    </template>
    <progress :max="max" :value="value" />
    <span ref="announce" class="announce" aria-live="assertive"></span>
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
  </div>
</template>

<script lang="ts">
import CircularDeterminate from "./CircularDeterminate.vue";
import CircularIndeterminate from "./CircularIndeterminate.vue";
import { _setTimeout } from "@featherds/utils/setTimeout";

import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  toRef,
  toRefs,
  watch,
} from "vue";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { useProgress } from "@featherds/composables/progress/Progress";
const LABELS = {
  reducedMotion: "Loading...",
  indeterminate: "In progress, please wait",
  units: "${value} percent",
  completed: ", progress complete",
  error: "Progress interrupted, ",
  report: "${value}${symbol}",
  symbol: "%",
};

const props = {
  error: { type: String, required: false },
  showPercentage: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: "lg" },
  value: { type: Number, required: false },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
  },
};

export default defineComponent({
  props,
  components: {
    CircularDeterminate,
    CircularIndeterminate,
  },
  setup(props) {
    const max = 100;
    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    const { error, value } = toRefs(props);
    const {
      announce,
      completed,
      containerClasses,
      hasError,
      isDeterminate,
      isIndeterminate,
      percentage,
    } = useProgress(value, error);

    const reducedMotionText = computed(() => {
      return labels.reducedMotionLabel.value;
    });

    const reportText = computed(() => {
      let reportLabel = labels.reportLabel.value || "";
      let symbolLabel = labels.symbolLabel.value || "";
      const status = reportLabel
        .replace("${symbol}", symbolLabel)
        .replace(
          "${value}",
          percentage.value ? percentage.value.toString() : ""
        );
      return status;
    });

    const statusAnnouncement = computed(() => {
      let unitsLabel = labels.unitsLabel.value || "";
      const valueString = percentage.value ? percentage.value.toString() : "";
      return unitsLabel.replace("${value}", valueString);
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

      if (isDeterminate.value) {
        if (newValue >= max) {
          announce.value.innerHTML = completedAnnouncement.value;
        } else {
          announce.value.innerHTML = statusAnnouncement.value;
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
      isDeterminate,
      isIndeterminate,
      max,
      reducedMotionText,
      reportText,
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
// @use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";

progress {
  display: none;
}
span.announce {
  display: inline-block;
  overflow: hidden;
  height: 0;
  width: 0;
}

circle {
  stroke-linecap: butt;
  transition: stroke-dashoffset 0.5s ease-in-out;
  stroke: var($background);
  opacity: 0.85;
}
.feather-progress-container {
  position: relative;
  display: grid;
  place-items: center;
  width: 160px;
  .feather-progress-circular {
    justify-items: center;
    margin-bottom: 8px;
  }
  .feather-progress-report {
    @include caption;
    text-align: center;
  }
  &.error .error-message {
    position: relative;
    @include caption;
    text-align: center;
    right: 0;
    color: var($error);
  }

  &.determinate {
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
  }
}
@keyframes done {
  0% {
    stroke: var($background);
  }
  100% {
    stroke: var($secondary);
  }
}
@keyframes indeterminate-progress {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
    }
    .determinate-container,
    .indeterminate-container {
      display: none;
      height: 0;
      opacity: 0;
    }
  }
}
</style>
