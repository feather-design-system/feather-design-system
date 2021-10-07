<template>
  <div class="component-card focus hover" @click="handleClick">
    <span class="markup">&lt;</span>{{ component }}
    <span class="markup">/&gt;</span>
    <FeatherRipple />
  </div>
</template>
<script>
import { FeatherRipple } from "@featherds/ripple";
export default {
  props: {
    component: String,
    package: String,
  },
  computed: {
    componentUrl() {
      return `/Packages/${this.package}/Components/${this.component}.html`;
    },
  },
  methods: {
    handleClick() {
      if (this.componentUrl) {
        window.location.href = this.$withBase(this.componentUrl);
      }
    },
  },
  components: {
    FeatherRipple,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/themes/utils";
@import "~@featherds/styles/themes/variables";
.component-card {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 250px;
  min-height: 3rem;
  cursor: pointer;
  font-weight: 600;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  color: var($primary);
  font-size: 1.4rem;
  @include elevation(0);
  @include state-on-surface();
  margin: 0 32px;
  padding: 16px;
  .markup {
    color: var($secondary-text-on-surface);
    font-weight: normal;
  }
}
</style>
