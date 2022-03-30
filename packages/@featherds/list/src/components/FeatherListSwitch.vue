<template>
  <FeatherListItem
    :disabled="disabled"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    :aria-labelledby="labelId"
    @click="click"
    @keydown="keydown"
    role="switch"
    class="feather-menu-switch"
    ref="input"
  >
    <template v-slot:icon>
      <slot name="icon" />
    </template>
    <span :id="labelId">
      <slot />
    </span>
    <template v-slot:post>
      <SwitchRender :checked="modelValue" :disabled="disabled" />
    </template>
  </FeatherListItem>
</template>
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import { SwitchRender } from "@featherds/switch";
import FeatherListItem from "./FeatherListItem.vue";
import { defineComponent, ComponentPublicInstance } from "vue";

export const emits = {
  "update:modelValue": (value: boolean) => true,
  click: (e: MouseEvent) => true,
  keydown: (e: KeyboardEvent) => true,
};
export const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
} as const;
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  computed: {
    labelId() {
      return getSafeId("switch-label");
    },
  },
  methods: {
    focus() {
      (this.$refs.input as ComponentPublicInstance).$el.focus();
    },
    updateValue() {
      if (!this.disabled) {
        this.$emit("update:modelValue", !this.modelValue);
      }
    },
    click(e: MouseEvent) {
      this.focus();
      this.updateValue();
      this.$emit("click", e);
    },
    keydown(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.SPACE || e.keyCode === KEYCODES.ENTER) {
        this.updateValue();
      }
      //stop page scrolling
      if (e.keyCode === KEYCODES.SPACE) {
        e.preventDefault();
      }
      this.$emit("keydown", e);
    },
  },
  components: { SwitchRender, FeatherListItem },
});
</script>
