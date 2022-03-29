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

<script lang="ts">
import { useTabPanel, stockProps } from "@featherds/composables/tabs/TabPanel";
import { MenuFocusLoop } from "@featherds/menu";
import { defineComponent } from "vue";
export const props = {
  header: {
    type: String,
  },
  ...stockProps,
};
export default defineComponent({
  name: "DrawerTabContent",
  props,
  setup(props) {
    return useTabPanel(props);
  },
  directives: {
    MenuFocusLoop,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.drawer-tab-content[role="tabpanel"] {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 16.625rem;
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
    padding-left: 1rem;
    padding-right: 2.5rem;
    flex: none;

    &,
    & > span {
      height: 3.5rem;
      line-height: 3.5rem;
    }
  }
}
</style>
