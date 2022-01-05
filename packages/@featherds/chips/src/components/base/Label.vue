<template>
  <span class="label" :title="titleText" ref="container"><slot /></span>
</template>
<script>
export default {
  data() {
    return {
      titleText: false,
    };
  },
  methods: {
    ellipsisActive() {
      return (
        this.$refs["container"].offsetWidth <
        this.$refs["container"].scrollWidth
      );
    },
    updateTitle() {
      this.titleText = this.ellipsisActive()
        ? this.$slots.default()[0].text
        : false;
    },
  },
  mounted() {
    this.updateTitle();
  },
  beforeUpdate() {
    this.updateTitle();
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
.label {
  @include body-small();
  color: var($secondary-text-on-surface);
  margin-right: 12px;
  margin-left: 12px;
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
