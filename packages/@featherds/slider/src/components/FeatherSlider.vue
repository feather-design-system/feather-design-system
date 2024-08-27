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
      </datalist>

      <div class="option-list" :style="optionListStyle">
        <template v-for="item in ticks" :key="item.tick">
          <!-- TODO:  Consider skipping first option instead of checking for item.tick = 0 -->
          <span
            v-if="item.tick !== 0"
            :value="item.tick"
            :label="item.label"
            :class="`slider-option feather-${item.color}-color ${item.tick! <= sliderValue ? 'selected' : ''}`"
            :style="optionStyle"
            @click="clickLabel(item as SliderTick)"
          >
            <template v-if="item.tick === floor">
              <FeatherIcon :icon="Lock" :style="lockedStyle" class="locked" />
            </template>
            <template v-if="item.icon">
              <svg><use :href="`#${item.icon}`" class="option-icon" /></svg>
              {{ item.label }}
            </template>
            <template v-else>
              {{ item.label }}
            </template>
          </span>
        </template>
      </div>
      <div class="slider-debug">
        <p>Slider Value: {{ sliderDisplayValue }}</p>
        <p>Floor: {{ floor }}</p>
        <p>Min: {{ min }}</p>
        <p>Max: {{ max }}</p>
        <p>Step: {{ step }}</p>
        <p>Option Width: {{ optionWidth }}</p>
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

// TODO:  Consider skipping first option instead of checking for item.tick = 0
const props: FeatherSliderProps = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: "Slider" },
  value: { type: Number, default: 1 },
  floor: { type: Number, default: 0 },
  ticks: {
    type: Array<SliderTick>,
    default: () => [
      { tick: 0, label: "", color: "" },
      { tick: 1, label: "critical", color: "error" },
      { tick: 2, label: "major", color: "major" },
      { tick: 3, label: "minor", color: "minor" },
      { tick: 4, label: "warning", color: "warning" },
    ],
    required: false,
  },
});

const { id, label, value, ticks } = reactive(props);
let { floor } = reactive(props);

floor = floor ?? 0;
let optionWidth = ref(0);
let lockX = ref(0);

if (!ticks.find((tick: SliderTick) => tick.tick === 0)) {
  ticks.unshift({ tick: 0, label: "", color: "" });
}

const min = 0;
const max = ticks.length ? ticks.length - 1 : 0;

// Initialize tick values
// ticks.forEach((tick: SliderTick, index: number) => {
//   tick.tick = index + 1;
// });

const sliderValue = ref(value);

const step = ref(max / (ticks.length - 1));

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let targetValue = Number(target.value);
  floor = floor ?? 0;
  if (targetValue <= floor) {
    sliderValue.value = floor;
    return;
  }
  sliderValue.value = targetValue;
};

const clickLabel = (tick: SliderTick) => {
  if (tick.tick === undefined) return;
  floor = floor ?? 0;

  if (tick.tick <= floor) {
    sliderValue.value = floor;
    return;
  }
  sliderValue.value = tick.tick;
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

// #region Styles

const datalistStyle = computed(() => {
  return {};
});

const lockedStyle = computed(() => {
  floor = floor ?? 0;
  return {
    left: `${optionWidth.value * floor}px`,
    top: "-4.5em",
  };
});

const optionListStyle = computed(() => {
  return {};
});

const optionStyle = computed(() => {
  return {
    width: "100%",
  };
});

// #endregion

const sliderDisplayValue = computed(() => {
  let value = parseFloat(sliderValue.value.toString());
  if (isNaN(value)) {
    value = 0;
  }
  return value;
});

watch(sliderValue, (newValue) => {
  if (!Array.isArray(ticks)) {
    console.error("Ticks is not an array");
    return;
  }
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
  optionWidth.value = (
    document.querySelector(
      `#${id} > .control > .option-list > .slider-option`
    ) as HTMLElement
  )?.offsetWidth!;
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/utils";

@mixin iconAndBackground($color) {
  svg > * {
    fill: var($color);
    color: var($color);
  }
  background-color: alpha($color, 0.2);
  color: var($color);
}

.feather-slider-container {
  width: 671px;

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
      margin: 0 0.5em;
      flex-direction: row;
      justify-content: space-evenly;
      position: relative;
      writing-mode: horizontal-tb;
      option {
        position: absolute;
        left: -2000px;
      }
      .slider-option {
        display: flex;
        justify-content: center;
        height: 100%;
        cursor: pointer;
        @include body-small();
        overflow: visible;
        text-align: center;
        text-transform: capitalize;
        border-radius: 4px;
        border: 2px solid var($surface);
        // background-color: rgba(217, 221, 189, 0.2); TODO: #d9ddbd in figma; also Kendo variables in Figma.
        // background-color: alpha($background, 0.2);
        background-color: var($background);
        color: var($shade-2);
        margin: 0.125em 0.125em;
        transition: background-color 1s ease, color 0.3s ease, border 0.3s ease;
        &.selected {
          // &:has(.locked) {
          //   border: 2px solid var($primary);
          // }
          background-color: var($primary);
          color: var($primary-text-on-color);
          border: 2px solid var($primary-text-on-color);
          &.feather-error-color {
            @include iconAndBackground($error);
          }
          &.feather-major-color {
            @include iconAndBackground($major);
          }
          &.feather-minor-color {
            @include iconAndBackground($minor);
            color: var($primary-text-on-surface);
          }
          &.feather-warning-color {
            @include iconAndBackground($warning);
            color: var($primary-text-on-surface);
          }
        }
        svg {
          width: 1.75em;
          height: 1.75em;
          color: var($primary-text-on-color);
          padding: 0.25em;
          use {
            color: var($shade-2);
          }
        }
      }
      .locked {
        position: absolute;
        fill: var($primary);
        top: -2.1em;
        // display: none;
        font-size: 0.5em;
        pointer-events: none;
      }
    }
  }
  .slider-semantic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .slider-semantic {
      accent-color: var($primary);
      width: 100%;
      height: auto;
      transition: all 1s ease;
    }
  }
}
</style>
