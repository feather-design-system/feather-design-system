<template>
  <div
    v-bind="inherittedAttrs"
    class="feather-radio-group-container"
    :class="{ vertical: vertical }"
  >
    <label :for="groupId" class="group-label">{{ label }}</label>
    <div
      v-bind="attrs"
      class="feather-radio-group"
      data-ref-id="feather-radio-group"
      role="radiogroup"
      :id="groupId"
      @keydown="keydown"
    >
      <slot />
    </div>
    <InputSubText :id="descriptionId" />
  </div>
</template>
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import {
  InputSubText,
  useInputSubText,
  InputSubTextProps,
  useInputInheritAttrs,
} from "@featherds/input-helper";
import { computed, defineComponent, PropType, toRef, Ref } from "vue";
import { useRadioGroup } from "@featherds/composables/radio/RadioGroup";
export const props = {
  ...InputSubTextProps,
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function] as PropType<
      string | number | boolean | unknown[] | unknown | Date | Function
    >,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  schema: {
    type: Object as PropType<Record<string, any>>,
    required: false,
  },
} as const;
export const emits = {
  "update:modelValue": (_v: unknown) => true,
  blur: (_v: FocusEvent) => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props,
  emits,
  setup(props, context) {
    useInputSubText(props);
    const error = toRef(props, "error");
    const modelValue = toRef(props, "modelValue");
    const descriptionId = computed(() => {
      return getSafeId("feather-input-description");
    });
    const attrs = computed(() => {
      const _attrs = {
        ...context.attrs,
        class: "",
        "aria-describedby": descriptionId.value,
      } as Record<string, unknown>;
      //use aria-invalid if passed in (some validation libraries will specify this)
      //otherwise base it off this.error
      if (!_attrs["aria-invalid"]) {
        _attrs["aria-invalid"] = !!error.value;
      }
      return _attrs;
    });

    return {
      descriptionId,
      attrs,
      ...useRadioGroup(
        modelValue,
        context.emit,
        props.label,
        props.schema as Record<string, unknown>,
        toRef(props, "error") as Ref<string>
      ),
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
    };
  },
  components: {
    InputSubText,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/input-helper/scss/spacing";
@import "@featherds/styles/themes/variables";

.group-label {
  @include subtitle1();
  display: block;
  color: var($primary-text-on-surface);
  min-width: 1.5rem;
}
.feather-radio-group-container {
  @include group-spacing;
}
</style>
