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
<script>
import { getSafeId } from "@featherds/utils/id";
import {
  InputInheritAttrsMixin,
  InputSubText,
  InputSubTextMixin,
} from "@featherds/input-helper";
import { computed, toRef, ref } from "vue";
import { useValidation } from "@featherds/input-helper";

export default {
  mixins: [InputInheritAttrsMixin, InputSubTextMixin],
  props: {
    modelValue: {
      type: [Array, Object],
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
  },
  provide() {
    return {
      registerCheckbox: this.registerCheckbox,
    };
  },
  setup(props, context) {
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
    let validate = useValidation(
      inputId,
      toRef(props, "modelValue"),
      props.label,
      props.schema,
      toRef(props, "error")
    );

    const registerCheckbox = (id) => {
      if (inputId.value === groupId.value) {
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
  min-width: 1.5rem;
}
.feather-checkbox-group-container {
  @include group-spacing;
}
</style>
