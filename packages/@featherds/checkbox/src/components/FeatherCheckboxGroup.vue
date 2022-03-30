<template>
  <div
    v-bind="inherittedAttrs"
    class="feather-checkbox-group-container"
    :class="{ vertical: vertical }"
  >
    <div
      v-bind="attrs"
      class="feather-checkbox-group"
      data-ref-id="feather-checkbox-group"
      role="group"
      :aria-labelledby="labelId"
      :id="groupId"
    >
      <label :for="groupId" :id="labelId" class="group-label">{{
        label
      }}</label>
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
import { computed, toRef, ref, Ref, defineComponent, PropType } from "vue";

import { useValidation } from "@featherds/input-helper";
export const props = {
  ...InputSubTextProps,

  modelValue: {
    type: [Array, Object] as PropType<unknown[] | Record<string, unknown>>,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  schema: {
    type: Object,
    required: false,
  },
} as const;
export default defineComponent({
  props,
  provide() {
    return {
      registerCheckbox: this.registerCheckbox,
    };
  },
  setup(props, context) {
    useInputSubText(props);
    const error = toRef(props, "error");

    const groupId = computed(() => {
      return getSafeId("feather-checkbox-group");
    });
    const descriptionId = computed(() => {
      return getSafeId("feather-input-description");
    });
    const labelId = computed(() => {
      return getSafeId("feather-input-label");
    });
    const attrs = computed(() => {
      const _attrs = JSON.parse(JSON.stringify(context.attrs));
      //use aria-invalid if passed in (some validation libraries will specify this)
      //otherwise base it off this.error
      if (!_attrs["aria-invalid"]) {
        _attrs["aria-invalid"] = !!error.value;
      }
      return {
        ..._attrs,
        class: "",
        "aria-describedby": descriptionId.value,
      };
    });

    const inputId = ref(groupId.value);

    //setting default
    const { validate } = useValidation(
      inputId,
      toRef(props, "modelValue"),
      props.label as string,
      props.schema as Record<string, any>,
      toRef(props, "error") as Ref<string>
    );

    const registerCheckbox = (id?: string) => {
      if (id && inputId.value === groupId.value) {
        inputId.value = id;
      }
    };

    return {
      groupId,
      inputId,
      descriptionId,
      labelId,
      attrs,
      validate,
      registerCheckbox,
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
.feather-checkbox-group-container {
  @include group-spacing;
}
</style>
