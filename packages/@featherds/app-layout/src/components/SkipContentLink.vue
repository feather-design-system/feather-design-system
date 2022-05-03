<template>
  <a class="skip" :href="contentId">{{ skipLabel }}</a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export const props = {
  content: {
    type: String,
    required: true,
  },
  skipLabel: {
    type: String,
    required: true,
  },
} as const;
export default defineComponent({
  props,
  computed: {
    contentId() {
      return `#${this.content}`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
a.skip {
  width: 1px;
  height: 1px;
  overflow: hidden;
  @include elevation(2);
  @include button();

  background-color: var($surface);
  padding: 0.25rem;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid var($primary);
  &:focus {
    width: auto;
    height: auto;
    z-index: var($zindex-tooltip);
  }
}
</style>
