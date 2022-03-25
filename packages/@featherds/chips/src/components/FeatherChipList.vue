<template>
  <div
    v-bind="attrs"
    data-ref-id="feather-chip-list"
    :aria-label="label"
    class="chip-list"
    :class="{ condensed: condensed, single: single }"
    @keydown="keydown"
  >
    <slot />
  </div>
</template>
<script lang="ts">
import { provide, toRef, defineComponent, ref } from "vue";
import { useRadioGroup } from "@featherds/composables/radio/RadioGroup";
export const props = {
  label: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "list",
    validator: (v: string) => {
      // The value must match either
      return ["list", "radio", "single"].indexOf(v) !== -1;
    },
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function],
  },
  condensed: {
    type: Boolean,
    default: false,
  },
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props,
  setup(props, context) {
    const format = props.mode === "list" ? "grid" : props.mode;
    provide("chipListFormat", format);
    const single = format === "single";

    if (format === "radio") {
      const modelValue = toRef(props, "modelValue");
      const attrs = {
        role: "radiogroup",
      };
      return {
        attrs,
        ...useRadioGroup(
          modelValue,
          context.emit,
          props.label as string,
          {},
          ref("")
        ),
        single,
      };
    }
    // if (format === "grid" || format === "single") {
    const attrs = {
      role: "grid",
    };
    const keydown = () => {};

    return { attrs, keydown, single };
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/mixins";
.chip-list {
  margin: 0;
  margin-top: 0.75rem;
  margin-bottom: 0.125rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  & + .chip-list {
    margin-top: 1.75rem;
  }
  &.condensed {
    :deep(.chip) {
      @include condensed-chip;
    }
  }
  &.single {
    margin: 0;
    :deep(.chip) {
      @include standalone-chip;
    }
  }
}
</style>
