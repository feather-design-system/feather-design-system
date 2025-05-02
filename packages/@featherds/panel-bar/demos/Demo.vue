<template>
  <div class="demo">
    <FeatherPanelBar
      id="panels-demo"
      :mode="demoMode"
      :title="demoTitle"
      :items="panels"
      @toggle="handleToggle"
      :header="showHeader"
      :headingLevel="headingLevel"
      :footer="showFooter"
      :panelHeadingLevel="panelHeadingLevel"
    ></FeatherPanelBar>
    <div class="controls">
      <div>
        <label for="selectionMode">Mode</label>
        <select id="selectionMode" v-model="demoMode">
          <option value="single">single</option>
          <option value="multi">multi</option>
        </select>
      </div>
      <div>
        <label for="showHeader">Show Header</label>
        <input type="checkbox" id="showHeader" v-model="showHeader" />
      </div>
      <div v-if="showHeader">
        <label for="demoTitle">Title:&nbsp;</label>
        <input
          type="text"
          id="demoTitle"
          v-model="demoTitle"
          placeholder="Title"
          style="width: 10em"
        />
      </div>
      <div>
        <label for="showFooter">Show Footer</label>
        <input type="checkbox" id="showFooter" v-model="showFooter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue";
import FeatherPanelBar from "../src/components/FeatherPanelBar.vue";
import { FeatherIcon } from "@featherds/icon";

import AccountCircle from "@featherds/icon/action/AccountCircle";
import Help from "@featherds/icon/action/Help";
import { Panel } from "../src/components/types";

import MyAccount from "./components/MyAccount.vue";

const panels = ref<Panel[]>([
  {
    id: "myaccount",
    icon: AccountCircle as typeof FeatherIcon,
    title: "My Account",
    component: markRaw(MyAccount),
    content:
      "This is the default content for the My Account panel.  It will appear below any custom component provided by the user.",
    open: false,
  },
  {
    id: "panel4",
    icon: Help as typeof FeatherIcon,
    title: "Panel Four",
    content: "This is the content for panel four. lorem ipsum dolor sit amet",
    open: false,
  },
  {
    id: "panel5",
    title: "Panel 5",
    content: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia illum hic natus obcaecati
    mollitia molestias. Quos vero quibusdam quis, quam fugit, animi mollitia quidem sapiente
    iure unde tempora. Ipsam, repellendus!`,
  },
  {
    id: "panel6",
    title: "Panel 6",
    content: "This is the content for panel six",
  },
]);

const handleToggle = (e: ToggleEvent) => {
  if (!e.target) {
    return;
  }
};

// demo controls
const showHeader = ref(true);
const headingLevel = ref(2);
const panelHeadingLevel = ref(undefined);
const showFooter = ref(true);
const demoTitle = ref("Feather Panel Bar Demo");
const demoMode = ref<"single" | "multi">("single");
</script>

<style lang="scss">
// .feather-panel-bar {
//   // override variables exposed by the feather-panel-bar-details component
//   --feather-panel-bar-title-font-size: 1.25em;
//   --feather-panel-bar-title-font-weight: 400;
//   --feather-panel-bar-title-line-height: 1.5rem;

//   --feather-panel-bar-panel-title-font-size: 1.25em;
//   --feather-panel-bar-panel-title-font-weight: 400;
//   --feather-panel-bar-panel-title-line-height: 1rem;
// }
</style>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.demo {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    color: var(vars.$primary-text-on-surface);
    border-radius: 0.25rem;
    div:has(input[id="demoTitle"]) {
      display: inline-flex;
    }
  }
}
</style>
