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
<script>
import { getSafeId } from "@featherds/utils/id";
import {
  InputInheritAttrsMixin,
  InputSubText,
  InputSubTextMixin,
} from "@featherds/input-helper";
import { computed, toRef } from "vue";
import { useRadioGroup } from "@featherds/composables/radio/RadioGroup";
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  mixins: [InputInheritAttrsMixin, InputSubTextMixin],
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function],
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const error = toRef(props, "error");
    const modelValue = toRef(props, "modelValue");
    const groupId = computed(() => {
      return getSafeId("feather-radio-group");
    });
    const descriptionId = computed(() => {
      return getSafeId("feather-input-description");
    });
    const attrs = computed(() => {
      const _attrs = {
        ...context.attrs,
        class: "",
        "aria-describedby": descriptionId.value,
      };
      //use aria-invalid if passed in (some validation libraries will specify this)
      //otherwise base it off this.error
      if (!_attrs["aria-invalid"]) {
        _attrs["aria-invalid"] = !!error.value;
      }
      return _attrs;
    });

    return {
      groupId,
      descriptionId,
      attrs,
      ...useRadioGroup(modelValue, context.emit),
    };
  },
  components: {
    InputSubText,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/input-helper/scss/spacing";
@import "@featherds/styles/themes/variables";

.group-label {
  @include subtitle1();
  display: block;
  color: var($primary-text-on-surface);
  min-width: 24px;
}
.feather-radio-group-container {
  @include group-spacing;
}
</style>
