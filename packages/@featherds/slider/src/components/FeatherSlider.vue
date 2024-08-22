<template>
  <div :id="`${id}`" class="feather-slider-container">
    <div class="label">{{ label }}</div>
    <div class="control">
      <div class="slider-semantic-container">
        <input
          type="range"
          class="slider-semantic"
          :list="`${id}-ticks`"
          :step="step"
          :min="min"
          :max="max"
          v-model="sliderValue"
          :style="semanticSliderStyle"
          @input="updateValue"
        />
      </div>

      <datalist :id="`${id}-ticks`" :style="datalistStyle" class="option-list">
        <option
          v-for="item in ticks"
          :value="item.tick"
          :key="item.tick"
          :label="item.label"
          :class="`feather-${item.color}-color ${item.tick! <= sliderValue ? 'selected' : ''}`"
          :style="optionStyle"
          @click="clickOption"
        />
        <span class="locked" :style="lockedStyle">
          <FeatherIcon :icon="Lock" />
        </span>
      </datalist>

      <div class="option-list">
        <span
          v-for="item in ticks"
          :value="item.tick"
          :key="item.tick"
          :label="item.label"
          :class="`feather-${item.color}-color ${item.tick! <= sliderValue ? 'selected' : ''}`"
          :style="optionStyle"
          @click="clickOption"
        >
          <template v-if="item.icon">
            <svg><use :href="`#${item.icon}`" class="option-icon" /></svg>
            {{ item.label }}
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </span>
      </div>

      <!-- <div
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
      </div> -->
      <div class="slider-debug">
        <p>Slider Value: {{ sliderDisplayValue }}</p>
        <p>Floor: {{ floor }}</p>
        <p>Min: {{ min }}</p>
        <p>Max: {{ max }}</p>
        <p>Step: {{ step }}</p>
        <p>Option Width: {{ optionWidth }}</p>
        <p>1st Option X: {{ firstOptionX }}</p>
        <p>Slider X: {{ sliderX }}</p>
        <p>Lock X: {{ lockX }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SliderTick, FeatherSliderProps } from "../types/Types";

import { computed, onMounted, reactive, ref, watch } from "vue";

import { FeatherIcon } from "@featherds/icon";
import Lock from "@featherds/icon/action/Lock";

const props: FeatherSliderProps = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: "Slider" },
  value: { type: Number, default: 1 },
  floor: { type: Number, default: 0 },
  ticks: {
    type: Array<SliderTick>,
    default: () => [
      { tick: 0, label: "critical", color: "error" },
      { tick: 1, label: "major", color: "major" },
      { tick: 2, label: "minor", color: "minor" },
      { tick: 3, label: "warning", color: "warning" },
    ],
    required: false,
  },
});

const { id, label, value, ticks } = reactive(props);
let { floor } = reactive(props);

floor = floor ?? 0;
const min = 0;
const max = ticks.length ? ticks.length - 1 : 0;
let optionWidth = ref(0);
let firstOptionX = ref(0);
let sliderX = ref(0);
let lockX = ref(0);

// Initialize tick values
// ticks.forEach((tick: SliderTick, index: number) => {
//   tick.tick = index + 1;
// });

const sliderValue = ref(value);

const step = ref(max / (ticks.length - 1));

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log("target.value: ", target.value);
  // if (target.value === "0") {
  //   sliderValue.value = step.value;
  //   return;
  // }
  sliderValue.value = Number(target.value);
};

const clickOption = (e: MouseEvent) => {
  if (!(e.target instanceof HTMLOptionElement)) {
    return;
  }
  floor = floor ?? 0;
  if (!ticks) return;
  const currentTick = ticks.find((item: SliderTick) => {
    return item.tick === Number((e.target as HTMLInputElement)?.value);
  });
  if (!currentTick || typeof currentTick.tick !== "number") return;
  const firstTick = ticks[0]?.tick ?? 0;

  if (currentTick.tick <= floor) {
    sliderValue.value = floor;
    return;
  }
  if (currentTick.tick === firstTick) {
    if (sliderValue.value !== firstTick) {
      sliderValue.value = step.value;
    } else {
      sliderValue.value = 0;
    }
    return;
  }
  if (currentTick.tick >= floor) {
    sliderValue.value = currentTick.tick;
    return;
  }
};

// const clickTrack = () => {
//   sliderValue.value = sliderValue.value + step.value;
// };

// const clickIndicator = () => {
//   floor = floor ?? 0;
//   if (sliderValue.value - floor <= 0) return;
//   sliderValue.value = sliderValue.value - step.value;
// };

// const moveSlider = (event: KeyboardEvent) => {
//   if (event instanceof KeyboardEvent) {
//     if (event.key === "ArrowRight" || event.key === "ArrowUp") {
//       if (sliderValue.value + step.value > max) return;
//       sliderValue.value = sliderValue.value + step.value;
//       event.preventDefault();
//     } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
//       floor = floor ?? 0;
//       if (sliderValue.value - floor <= 0) return;
//       event.preventDefault();
//       sliderValue.value = sliderValue.value - step.value;
//     }
//   }
// };

// #region Accessibility

// const optionLabel = computed(() => {
//   const correspondingTick = ticks.find(
//     (tick: SliderTick) => tick.tick === sliderValue.value
//   );
//   if (!correspondingTick) return;
//   return `${label} ${correspondingTick.label}`;
// });

// #endregion

// #region Styles

const datalistStyle = computed(() => {
  return {
    // display: "grid",
    // gridTemplateColumns: `repeat(${ticks.length}, 1fr)`,
    // // justifyContent: "space-evenly",
    // width: "100%",
  };
});

// const trackStyle = computed(() => {
//   return {
//     width: `100%`,
//   };
// });

// const indicatorStyle = computed(() => {
//   return {
//     width: `${(sliderValue.value * 100) / ticks.length}%`,
//   };
// });

const lockedStyle = computed(() => {
  floor = floor ?? 0;
  return {
    // left: `calc(${(floor * 100) / max}% - ${24}px)`,
    // left: `calc(${(100 / ticks.length) * floor}% + ${width / 2}px)`,
    left: `calc(${51 * floor}px)`,
    top: "-2.1em",
    zIndex: 1,
    content: "locked",
    // visibility: `${floor === 0 ? hidden : visible}` as CSSStyleValue,
    // color: "var(--feather-error)",
  };
});

const optionStyle = computed(() => {
  return {
    width: `${100 / ticks.length + 1}%`,
  };
});

const semanticSliderStyle = computed(() => {
  return {
    width: `${100 - (100 / ticks.length + 1)}%`,
  };
});
// const thumbStyle = computed(() => {
//   return {
//     left: `calc(${(sliderValue.value * 100) / ticks.length}% - ${6}px)`,
//   };
// });

// #endregion

// const optionWidth = computed(() => {
//   return document.querySelector(`#${id}-ticks>option`)?.clientWidth;
// });

// const datalistWidth = computed(() => {
//   if (optionWidth.value == undefined || isNaN(optionWidth.value))
//     return undefined;
//   return optionWidth.value * ticks.length;
// });

const sliderDisplayValue = computed(() => {
  let value = parseFloat(sliderValue.value.toString());
  return value;
});

watch(sliderValue, (newValue) => {
  const correspondingTick = ticks.find(
    (tick: SliderTick) => tick.tick === newValue
  );
  if (!correspondingTick) {
    const undefinedTick: SliderTick = { tick: 0, label: "", color: "" };
    emit("update:value", `${id}`, undefinedTick);
    return;
  }
  emit("update:value", `${id}`, correspondingTick);
});

onMounted(() => {
  optionWidth.value = document.querySelector(
    `#${id}-ticks>option`
  )?.clientWidth!;

  firstOptionX.value = (
    document.querySelector(`#${id}-ticks>option`) as HTMLOptionElement
  )?.offsetLeft!;

  sliderX.value = (
    document.querySelector(`#${id} .control>input`) as HTMLOptionElement
  )?.offsetLeft!;
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/utils";

// input[type="range"] {
//   width: 200px;
//   margin: 0;
// }
.feather-slider-container {
  width: 600px;

  .label {
    @include body-large();
  }
  .control {
    &:focus-within {
      border: 2px solid var($shade-3);
    }
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: var($surface);
    padding: 0.5rem;
    .slider-debug {
      display: none;
    }
    .option-list {
      display: flex;
      // display: none;
      justify-content: space-around;
      position: relative;
      // text-align: center;
      writing-mode: horizontal-tb;
      // width: 100%;
      span,
      option {
        height: 100%;
        cursor: pointer;
        @include body-small();
        overflow: visible;
        text-align: center;
        text-transform: capitalize;
        border-radius: 4px;
        border: 2px solid var($surface);
        background-color: var($shade-4);
        margin: 0.25em 0.25em;
        transition: background-color 1s ease, color 0.3s ease, border 0.3s ease;
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
        svg {
          width: 2em;
          height: 2em;
          fill: var($primary-text-on-color);
          padding: 0.25em;
        }
      }
      span.locked {
        position: absolute;
        display: none;
        color: var($primary-text-on-color);
        color: purple;
        font-size: 1.2em;
        width: auto;
        top: 0.125em;
        pointer-events: none;
      }
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
        // NOTE: Style choice to make the track rounded
        border-radius: 0 0 16px 16px;
        border-radius: 16px;
      }
      .slider-track {
        cursor: pointer;
        position: absolute;
        height: 100%;
        background-color: var($success);
        background-color: rgba(
          var(--feather-success-r),
          var(--feather-success-g),
          var(--feather-success-b),
          0.8
        );
        // NOTE: Style choice to make the track rounded
        // border-radius: 0 0 16px 16px;
        border-radius: 16px;
      }
      .slider-indicator {
        cursor: pointer;
        position: absolute;
        height: 20px;
        margin: -1px auto;
        background-color: var($error);
        background-color: rgba(
          var(--feather-error-r),
          var(--feather-error-g),
          var(--feather-error-b),
          0.9
        );

        border: 2px solid var($shade-4);
        // NOTE: Style choice to make the indicator rounded
        border-radius: 0 0 0 16px;
        border-radius: 16px;
        transition: width 0.5s ease;
        span.locked {
          position: absolute;
          color: var($primary-text-on-color);
          font-size: 1.2em;
          width: auto;
          top: 0.125em;
          user-select: none;
          cursor: pointer;
        }
      }
      .slider-thumb {
        position: absolute;
        top: -34px;
        height: 340%;
        width: 12px;
        border-radius: 8px;
        border: 0.25em solid var($surface);
        background-color: var($secondary);
        transition: left 0.5s ease;
      }
    }
  }
  .slider-semantic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    accent-color: var($primary);
    .slider-semantic {
      width: auto;
      height: auto;
      background-color: var($success);
      color: purple;
      transition: background-color 1s ease, color 1s ease;
    }
  }
}
</style>
