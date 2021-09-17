<template>
  <div class="feather-input-sub-text" :id="id" v-show="hasContent">
    <div
      class="feather-input-hint"
      v-if="hint && !error"
      data-ref-id="feather-form-element-hint"
    >
      {{ hint }}
    </div>
    <div
      class="feather-input-error"
      v-if="error"
      data-ref-id="feather-form-element-error"
      aria-live="assertive"
    >
      {{ error }}
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  computed: {
    hasContent() {
      const hasRightSlot =
        this.$slots.right &&
        this.$slots
          .right()
          .findIndex((o) => o.children && o.children.length !== 0) !== -1;
      return !!this.error || !!this.hint || hasRightSlot;
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const options = inject("subTextOptions");

    return options;
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
.feather-input-sub-text {
  display: flex;
  padding: 4px 12px 4px 16px;
}
.feather-input-hint {
  @include caption();
  color: var($secondary-text-on-surface);
}
.feather-input-error {
  @include caption();
  color: var($error);
}

.feather-input-hint,
.feather-input-error {
  flex: 1;
}
</style>
