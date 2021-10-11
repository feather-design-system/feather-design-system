<template>
  <div v-bind="attrs" class="drawer-tab-content" v-show="selected">
    <!-- changed from 'header' tag for accessibility reasons -->
    <div class="header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div class="contents" ref="contents" v-menu-focus-loop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useTabPanel, stockProps } from "@featherds/composables/tabs/TabPanel";
import { MenuFocusLoop } from "@featherds/menu";

export default {
  name: "DrawerTabContent",
  props: {
    header: {
      type: String,
    },
    ...stockProps,
  },
  setup(props) {
    return useTabPanel(props);
  },
  directives: {
    MenuFocusLoop,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.drawer-tab-content[role="tabpanel"] {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 266px;
  .contents {
    flex: 1;
    padding: 0;
    overflow: auto;
    &:deep(> *:first-child) {
      padding-top: 0px;
    }
  }
  div.header {
    display: block;
    @include headline3();
    background-color: var($surface);
    color: var($primary-text-on-surface);
    padding-left: 16px;
    padding-right: 40px;
    flex: none;

    &,
    & > span {
      height: 56px;
      line-height: 56px;
    }
  }
}
</style>
