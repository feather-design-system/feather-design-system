<template>
  <span class="label" :title="titleText" ref="container"><slot /></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      titleText: undefined as string | undefined,
    };
  },
  methods: {
    ellipsisActive() {
      return (
        (this.$refs["container"] as HTMLElement).offsetWidth <
        (this.$refs["container"] as HTMLElement).scrollWidth
      );
    },
    updateTitle() {
      this.titleText = this.ellipsisActive()
        ? ((this.$refs["container"] as HTMLElement).textContent as string)
        : undefined;
    },
  },
  mounted() {
    this.updateTitle();
  },
  beforeUpdate() {
    this.updateTitle();
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
.label {
  @include body-small();
  color: var($secondary-text-on-surface);
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}
</style>
