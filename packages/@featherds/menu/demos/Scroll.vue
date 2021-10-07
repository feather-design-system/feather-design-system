<template>
  <section :class="{ pageScroll: pageScroll }">
    <FeatherCheckbox v-model="right">Right aligned</FeatherCheckbox>
    <FeatherCheckbox v-model="pageScroll">Scroll Page</FeatherCheckbox>
    <div class="scroll">
      <div class="center-content">
        <FeatherMenu
          ref="menu"
          :open="open"
          @trigger-click="triggerClicked"
          @outside-click="outsideClicked"
          :right="right"
        >
          <template v-slot:trigger>
            <FeatherButton primary menu-trigger>Something</FeatherButton>
          </template>
          <FeatherList>
            <FeatherListItem>Test</FeatherListItem>
            <FeatherListHeader>Test</FeatherListHeader>
            <FeatherListItem>Test</FeatherListItem>
          </FeatherList>
        </FeatherMenu>
      </div>
    </div>
  </section>
</template>
<script>
import * as components from "./../src";
import * as listComponents from "@featherds/list";
import { FeatherButton } from "@featherds/button";
import { FeatherCheckbox } from "@featherds/checkbox";
export default {
  data() {
    return { open: false, right: false, pageScroll: false };
  },
  methods: {
    triggerClicked() {
      this.open = !this.open;
    },
    outsideClicked() {
      this.open = false;
    },
  },
  components: {
    ...components,
    ...listComponents,
    FeatherButton,
    FeatherCheckbox,
  },
};
</script>
<style lang="scss" scoped>
.scroll {
  max-width: 500px;
  max-height: 500px;
  overflow: auto;
}
.center-content {
  width: 1000px;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pageScroll {
  .scroll {
    max-width: unset;
    max-height: unset;
    overflow: unset;
  }
  .center-content {
    width: 200vw;
    height: 160vh;
  }
}
</style>
