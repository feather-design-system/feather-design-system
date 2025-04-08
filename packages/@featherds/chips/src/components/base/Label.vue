<template>
  <span
    class="label"
    :title="titleText"
    ref="container"
    data-ref-id="feather-chip-label"
    ><slot
  /></span>
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
      const container = this.$refs["container"] as HTMLElement | undefined;
      const offsetWidth = container?.offsetWidth ?? 0;
      const scrollWidth = container?.scrollWidth ?? 0;

      return offsetWidth < scrollWidth;
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
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
.label {
  @include typo.body-small();
  color: var(vars.$secondary-text-on-surface);
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
