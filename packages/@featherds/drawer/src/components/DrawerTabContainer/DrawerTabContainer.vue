<template>
  <div
    data-ref-id="feather-tab-container"
    class="tablist-container drawer-tab-container"
  >
    <ul v-bind="attrs" v-on="listeners">
      <slot name="tabs" />
    </ul>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  useTabContainer,
  model,
  stockProps,
  emits,
} from "@featherds/composables/tabs/TabContainer";

export default {
  emits: emits,
  model: model,
  props: {
    ...stockProps,
  },
  setup(props, context) {
    return useTabContainer(props, context);
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/drawer/src/scss/variables";

.drawer-tab-container {
  height: 100%;
  > ul[role="tablist"] {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    width: $tab-width;
    background-color: var($shade-1);
    float: left;
    vertical-align: top;
  }
  > .tab-content {
    vertical-align: top;
    overflow: auto;
    height: 100%;
    display: block;
    width: auto;
  }
}
</style>
