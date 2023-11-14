<template>
  <div
    class="toggle-btn-container"
    :class="isMutedColor()"
    :id="id"
    aria-label="button group"
    role="group"
    tabindex="0"
  >
    <button
      type="button"
      v-for="(item, index) in buttons"
      :key="index"
      :id="`${id}${index}`"
      :class="`toggle-btn focus hover ${classes(item, index)}`"
      :aria-pressed="index === 0 ? 'true' : 'false'"
      aria-live="polite"
      @click="toggle"
      :disabled="item.disabled"
    >
      <span
        v-if="index != 0"
        class="toggle-divider"
        aria-hidden="true"
      >|</span>
      <FeatherIcon
        v-if="showIcon(item)"
        :icon="item.icon"
      ></FeatherIcon>
      <span
        v-else-if="showLabel(item)"
        class="toggle-label"
      >
        {{ item.label }}
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { FeatherIcon } from "@featherds/icon"
import { ToggleButton } from "./types";
import { PropType, computed, reactive } from "vue";

const emit = defineEmits(["toggle-button-click"]);

const props = defineProps({
  id: { type: String, required: true },
  buttons: { type: Object as PropType<Array<ToggleButton>>, required: true },
  selected: { type: Number, required: false },
  muted: { type: Boolean, default: false },
});

const { id } = reactive(props);

const toggle = (e: Event) => {
  const selected = document.querySelector(`#${id} button.toggle-btn.selected`);
  selected?.classList.remove("selected");
  selected?.setAttribute("aria-pressed", "false");

  const element = e.target as HTMLButtonElement;
  element.classList.add("selected");
  element.setAttribute("aria-pressed", "true");

  const label = element.querySelector(".toggle-label")?.innerHTML;
  emit("toggle-button-click", `${id}`, element!.id, label);
};

const showLabel = (button: ToggleButton) => {
  return !!button.label;
};

const showIcon = (button: ToggleButton) => {
  return !!button.icon;
};

const defaultSelection = (index: number) => {
  return props.selected === index ? ' selected' : '';
};

const isMutedColor = () => {
  return props.muted === true ? ' muted' : '';
};

const classes = (button: ToggleButton, index: number) => {

  let tbType: string;
  if (!!button.icon) {
    tbType = 'icon-only';
  }
  else {
    tbType = 'label-only';
  }

  return `${tbType}${defaultSelection(index)}${!!button.disabled && button.disabled ? ' disabled' : ''}`;
}

const maxWidth = computed(() => {
  const buttons = [...props.buttons] as ToggleButton[];
  const maxLen = buttons.map((btn) => {
    if (btn.label) {
      const withLabels = buttons.filter(btn => btn.label !== null);
      console.log("withLabels: ", withLabels);
      const max = Math.max(...withLabels.map(v => {
        return !!v.label ? v.label.length : 0;
      }));
      console.log("max:", max);
      return max;
    }
  })[0];
  return !!maxLen ? maxLen : 0;
});

</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/utils";

.toggle-btn-container {
  @include state-on-color();
  display: inline-flex;
  padding: 4px;
  align-items: flex-start;
  border-radius: 4px;
  z-index: 0;

  background-color: var($shade-4);
  pointer-events: none;


  .toggle-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;

    border-radius: 2px;
    color: var($primary-text-on-surface);

    border: 0;
    background-color: transparent;
    pointer-events: auto;

    &.disabled {
      @include state-disabled();
      color: var($shade-2);
      pointer-events: none;
    }

    .label-only {
      padding: 4px 0 4px 8px;
    }

    .icon-only {
      padding: 4px 8px;
    }

    &:hover,
    &:focus,
    &:active,
    &:visited {
      text-decoration: none;
    }

    &:hover {
      background-color: var($shade-4);
    }

    &.focus.hover.selected,
    &.focus.hover.selected:hover,
    &.focus.hover.selected:focus {
      background-color: var($primary);
      color: var($primary-text-on-color);
      font-weight: bolder;
      letter-spacing: -0.5px;
    }

    & .toggle-divider {
      position: absolute;
      left: -1.75px;
      color: var($shade-4);
      overflow: visible;
      pointer-events: none;
      width: 1px;
      height: 15px;

    }

    & .toggle-label {
      display: flex;
      width: 108px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      text-align: left;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      pointer-events: none;
    }

    & svg {
      display: flex;
      align-items: center;
      pointer-events: none;
      gap: 16px;
      width: 24px;
      height: 24px;
    }
  }

  &.muted {
    .toggle-btn {

      &.focus.hover.selected,
      &.focus.hover.selected:hover,
      &.focus.hover.selected:focus {
        background-color: var($primary-text-on-color);
        color: var($primary-text-on-surface);
      }
    }
  }

}
</style>
