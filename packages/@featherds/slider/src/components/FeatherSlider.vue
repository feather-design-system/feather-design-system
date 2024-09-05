<template>
  <div :id="`${id}`" class="feather-slider-container">
    <div class="control">
      <div :id="`${id}-label`" class="label">
        {{ label }}
      </div>

      <div class="slider-semantic-container">
        <input
          type="range"
          class="slider-semantic"
          :list="`${id}-ticks`"
          :step="step"
          :min="min"
          :max="max"
          :aria-labeledby="`${id}-label`"
          :aria-valuemin="0"
          :aria-valuemax="max"
          :aria-valuenow="sliderValue"
          :style="sliderSemanticStyle"
          v-model="sliderValue"
          @focus="announceValue"
          @input="updateValue"
          @change="updateValue"
        />
      </div>
      <div aria-live="polite" class="sr-only" id="liveRegion"></div>

      <datalist :id="`${id}-ticks`" class="option-list">
        <option
          v-for="item in ticks"
          :value="item.tick"
          :key="item.tick"
          :label="item.label"
          :class="`feather-${item.color}-color ${item.tick! <= sliderValue ? 'selected' : ''}`"
          @click="clickOption"
        />
      </datalist>

      <div class="option-list">
        <template v-for="item in ticks" :key="item.tick">
          <span
            v-if="item.tick !== 0"
            :value="item.tick"
            :label="item.label"
            :class="`slider-option feather-${item.color}-color ${item.tick! <= sliderValue ? 'selected' : ''}`"
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

const tickLabels = ticks.map((tick: SliderTick) => tick.label);

const min = 0;
const max = ticks.length ? ticks.length - 1 : 0;

// Initialize tick values
// ticks.forEach((tick: SliderTick, index: number) => {
//   tick.tick = index + 1;
// });

const sliderValue = ref(value);

const sliderLabel = computed(() => {
  const label = tickLabels.filter((item: string, index) => {
    if (index <= sliderValue.value) {
      return item;
    }
    return;
  });
  return label.length >= 1 ? label : ["none"];
});

const step = ref(max / (ticks.length - 1));

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let targetValue = Number(target.value);
  floor = floor ?? 0;
  if (targetValue <= floor) {
    sliderValue.value = floor;
    announceValue();
    return;
  }
  sliderValue.value = targetValue;
  announceValue();
};

const clickLabel = (tick: SliderTick) => {
  if (tick.tick === undefined) return;
  floor = floor ?? 0;

  if (tick.tick <= floor) {
    sliderValue.value = floor;
    announceValue();
    return;
  }
  sliderValue.value = tick.tick;
  announceValue();
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

const lockedStyle = computed(() => {
  floor = floor ?? 0;
  return {
    left: `${optionWidth.value * floor}px`,
    top: "-4.5em",
  };
});

const sliderSemanticStyle = computed(() => {
  // Damn you, mozilla (-moz-range-track is unreliable), hence the gradient hack
  let gradient = ticks.map((tick: SliderTick, index: number) => {
    if (!tick.tick) tick.tick = 0;

    let firstpart = `${
      tick.tick <= sliderValue.value // <= instead of <
        ? "var(--feather-primary)"
        : "var(--feather-shade-4)"
    } ${(tick.tick / max) * 100}%`;

    // start and end of gradient
    if (index === 0 || index === max) return `${firstpart}`;

    // middle of gradient
    let secondpart = `${
      tick.tick < sliderValue.value // < instead of <=
        ? "var(--feather-primary)"
        : "var(--feather-shade-4)"
    } ${(tick.tick / max) * 100 + 1}%`; // +1 to avoid overlap

    return `${firstpart}, ${secondpart}`;
  });

  return {
    background: `linear-gradient(
      to right,
      ${gradient.join(", ")}
      )`,
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

// #region accessibility
const announceValue = () => {
  const liveRegion = document.getElementById("liveRegion");
  if (liveRegion) {
    liveRegion.textContent = `${sliderLabel.value.join(" ")} selected`;
  }
};
// #endregion

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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.feather-slider-container {
  width: 671px;

  .label {
    @include body-large();
  }
  .control {
    datalist {
      > option {
        display: none;
      }
    }
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
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin: 0 0.5em;
      writing-mode: horizontal-tb;
      option {
        position: absolute;
        left: -2000px;
      }
      .slider-option {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
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
        margin: 0.25em 0.25em;
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
        display: none;
        font-size: 0.5em;
        margin: 0.25em;
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
      height: 0.25em;
      margin: 0.25em;
      border-radius: 50px;
      transition: all 1s ease;
      &:focus-visible {
        outline: none;
      }
      &::-webkit-slider-runnable-track {
        height: 0.25em;
      }
      &::-moz-range-track {
        height: 0.25em;
        // background-color: var($primary);
        // background: linear-gradient(
        //   to right,
        //   var($primary) 50%,
        //   var($shade-4) 50%
        // );
        // border-radius: 50px;
      }

      &::-webkit-slider-thumb {
        transform: translateY(-0.5em);
        height: 1em;
        width: 1em;
        border-radius: 50%;
        background: var($primary);
        cursor: pointer;
        transition: all 1s ease;
      }
      &::-moz-range-thumb {
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background: var($primary);
        cursor: pointer;
        transition: all 1s ease;
      }
    }
  }
}
</style>
