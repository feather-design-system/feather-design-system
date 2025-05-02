<template>
  <a class="skip" :href="contentId" @click="scrollTo">{{ skipLabel }}</a>
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
  methods: {
    scrollTo(e: MouseEvent) {
      e.preventDefault();
      const scrollEl = document.getElementById(this.content);
      if (scrollEl) {
        scrollEl.scrollIntoView({ behavior: "smooth" });
        scrollEl.tabIndex = -1;
        scrollEl.focus();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/elevation" as elev;
@use "@featherds/styles/mixins/typography" as typo;

a.skip {
  width: 1px;
  height: 1px;
  overflow: hidden;
  @include elev.elevation(2);
  @include typo.button();

  background-color: var(vars.$surface);
  padding: 0.25rem;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid var(vars.$primary);

  &:focus {
    width: auto;
    height: auto;
    z-index: var(vars.$zindex-tooltip);
  }
}
</style>
