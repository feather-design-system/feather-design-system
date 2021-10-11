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
import { computed, toRef } from "vue";
export default {
  mixins: [InputInheritAttrsMixin, InputSubTextMixin],
  props: {
    label: {
      type: String,
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
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

    return {
      groupId,
      descriptionId,
      labelId,
      attrs,
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
.feather-checkbox-group-container {
  @include group-spacing;
}
</style>
