<template>
  <div class="feather-input-sub-text" v-show="!inline || hint || error.length">
    <div class="feather-input-spacer" v-if="!hint && !error.length">&nbsp;</div>
    <div
      class="feather-input-hint"
      v-if="hint && !error.length"
      data-ref-id="feather-form-element-hint"
    >
      {{ hint }}
    </div>
    <div
      class="feather-input-error"
      v-if="error.length > 0"
      data-ref-id="feather-form-element-error"
      aria-live="assertive"
    >
      {{ error }}
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script lang="ts">
import {
  inject,
  computed,
  defineComponent,
  ExtractPropTypes,
  Ref,
  toRef,
} from "vue";
import { InputSubTextProps } from "../composables/InputSubText";
export const props = {
  errorText: {
    type: String,
  },
};
export default defineComponent({
  props,
  setup(props) {
    const options = inject(
      "subTextOptions",
      {} as ExtractPropTypes<typeof InputSubTextProps>
    );
    const errorMessage = inject(
      "validationErrorMessage",
      false as false | Ref<string>
    );
    const errorText = toRef(props, "errorText");
    const error = computed(() => {
      if (options.error) {
        return options.error;
      }
      if (errorText.value && errorText.value) {
        return errorText.value;
      }
      if (errorMessage && errorMessage.value) {
        return errorMessage.value;
      }
      return "";
    });
    return { ...options, error };
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
.feather-input-sub-text {
  display: flex;
  min-height: 1.5rem;
  padding: 0.25rem 0.75rem 0.25rem 1rem;
}
.feather-input-hint {
  @include typo.caption();
  color: var(vars.$secondary-text-on-surface);
}
.feather-input-error {
  @include typo.caption();
  color: var(vars.$error);
}
.feather-input-spacer {
  @include typo.caption();
}

.feather-input-hint,
.feather-input-error {
  flex: 1;
}
</style>
