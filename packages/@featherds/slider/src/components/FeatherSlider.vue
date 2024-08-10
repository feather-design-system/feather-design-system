<template>
  <div class="feather-slider-container">
    <div class="label">{{ label }}</div>
    <div class="control"></div>
    <datalist :id="`${id}-ticks`">
      <option
        v-for="item in ticks"
        :value="item.tick"
        :key="item.tick"
        :label="item.label"
        :class="`feather-${item.color}-color ${
          item.tick <= sliderValue ? 'selected' : ''
        }`"
        @click="clickStep"
      />
    </datalist>

    <div
      class="feather-slider"
      tabindex="0"
      @keydown="moveSlider"
      role="slider"
      :aria-min="min"
      :aria-max="max"
      :aria-valuenow="sliderValue"
      :aria-valuetext="optionLabel"
    >
      <div class="slider-track" :style="trackStyle" @click="clickTrack" />
      <div
        class="slider-indicator"
        :style="indicatorStyle"
        @click="clickIndicator"
      />
      <div class="slider-thumb" :style="thumbStyle" />
    </div>
    <div class="slider-semantic">
      <hr />
      <input
        type="range"
        class="slider-semantic"
        :list="`${id}-ticks`"
        :step="step"
        :min="min"
        :max="max"
        v-model="sliderValue"
        @input="updateValue"
      />
      <hr />

      <p>Slider Value: {{ sliderDisplayValue }}</p>
      <p>Min: {{ min }}</p>
      <p>Max: {{ max }}</p>
      <p>Step: {{ step }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: "Slider" },
  value: { type: Number, default: 25 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  ticks: {
    type: Array<{ tick: number; label: string; color: string }>,
    default: () => [
      { tick: 25, label: "critical", color: "error" },
      { tick: 50, label: "major", color: "major" },
      { tick: 75, label: "minor", color: "minor" },
      { tick: 100, label: "warning", color: "warning" },
    ],
  },
});

const { id, label, value, min, max, ticks } = reactive(props);
const sliderValue = ref(value);
// const step = computed(() => ((max - min) / 3).toFixed(1));
// const step = undefined;
const step = ref(25);

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log("target.value: ", target.value);
  if (target.value === "0") {
    sliderValue.value = step.value;
    return;
  }
  sliderValue.value = Number(target.value);
};

const clickStep = (e: Event) => {
  if (!(e.target instanceof HTMLOptionElement)) {
    return;
  }
  sliderValue.value = Number(e.target.value);
};

const clickTrack = () => {
  sliderValue.value = sliderValue.value + step.value;
};

const clickIndicator = () => {
  if (sliderValue.value - step.value <= 0) return;
  sliderValue.value = sliderValue.value - step.value;
};

const moveSlider = (event: KeyboardEvent) => {
  if (event instanceof KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      if (sliderValue.value + step.value > 100) return;
      sliderValue.value = sliderValue.value + step.value;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      if (sliderValue.value - step.value <= 0) return;
      sliderValue.value = sliderValue.value - step.value;
    }
  }
};

// #region Accessibility

const optionLabel = computed(() => {
  const correspondingTick = ticks.find(
    (tick: any) => tick.tick === sliderValue.value
  );
  if (!correspondingTick) return;
  return `${label} ${correspondingTick.label}`;
});

// #endregion

const trackStyle = computed(() => {
  return {
    width: `100%`,
  };
});

const indicatorStyle = computed(() => {
  return {
    width: `${sliderValue.value}%`,
  };
});

const thumbStyle = computed(() => {
  return {
    left: `calc(${sliderValue.value}% - ${10}px)`,
  };
});

const sliderDisplayValue = computed(() => {
  let value = parseFloat(sliderValue.value.toString());
  return value.toFixed(0);
});

watch(sliderValue, (newValue) => {
  const correspondingTick = ticks.find((tick: any) => tick.tick === newValue);
  emit("update:value", `${id}`, correspondingTick);
  console.log("newValue: ", newValue);
  console.log("sliderValue: ", sliderValue.value);
});

console.log(id);
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/utils";

.feather-slider-container {
  .label {
    @include body-large();
  }
  background-color: var($surface);
  padding: 0.5rem;
  width: 600px;
  datalist {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    justify-content: space-around;
    margin-bottom: 0.5em;
    width: 100%; // move to javascript
    option {
      cursor: pointer;
      @include body-small();
      text-transform: capitalize;
      border-radius: 4px;
      border: 2px solid var($surface);
      background-color: var($shade-4);
      transition: background-color 1s ease, color 0.3s ease, border 0.3s ease; // Add transition
      &.selected {
        background-color: var($primary);
        color: var($primary-text-on-color);
        border: 2px solid var($primary-text-on-color);
        &.feather-error-color {
          background-color: var($error);
        }
        &.feather-major-color {
          background-color: var($major);
        }
        &.feather-minor-color {
          background-color: var($minor);
          color: var($primary-text-on-warning);
        }
        &.feather-warning-color {
          background-color: var($warning);
          color: var($primary-text-on-warning);
        }
      }
    }
  }
  .slider-semantic {
    display: none;
    width: 100%;
  }
  .feather-slider {
    position: relative;
    height: 20px;
    width: 100%;
    background-color: var($surface);
    border: 2px solid var($surface);
    border-radius: 16px;

    &:focus {
      outline: none;
      border: 2px solid var($secondary);
    }
    .slider-track {
      cursor: pointer;
      position: absolute;
      height: 100%;
      background-color: var($shade-4);
      border-radius: 16px;
    }
    .slider-indicator {
      cursor: pointer;
      position: absolute;
      height: 20px;
      margin: -1px auto;
      background-color: var($primary);
      border: 2px solid var($shade-4);
      border-radius: 16px;
      transition: width 0.625s ease;
    }
    .slider-thumb {
      position: absolute;
      top: -20px;
      height: 200%;
      width: 10px;
      border-radius: 4px;
      border: 0.25em solid var($surface);
      background-color: var($secondary);
      transition: left 0.625s ease;
    }
  }
}
</style>
