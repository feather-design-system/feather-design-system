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
          <template v-slot:trigger="{ attrs, on }">
            <FeatherButton primary v-bind="attrs" v-on="on"
              >Something</FeatherButton
            >
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
<script lang="ts">
import { FeatherMenu } from "./../src";
import * as listComponents from "@featherds/list";
import { FeatherButton } from "@featherds/button";
import { FeatherCheckbox } from "@featherds/checkbox";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => {
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
    FeatherMenu,
    ...listComponents,
    FeatherButton,
    FeatherCheckbox,
  },
});
</script>
<style lang="scss" scoped>
.scroll {
  max-width: 30rem;
  max-height: 30rem;
  overflow: auto;
}
.center-content {
  width: 60rem;
  height: 60rem;
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
