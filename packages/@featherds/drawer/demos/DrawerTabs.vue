<template>
  <div>
    <div>
      <button
        id="button"
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
      >
        Open Drawer
      </button>
      <p>Drawer Is Open: {{ visible }}</p>
    </div>

    <feather-drawer
      id="drawer"
      @shown="onShown"
      v-model="visible"
      :labels="{ close: 'close', title: 'Title of the drawer' }"
    >
      <drawer-tab-container @tab-selected="tabSelected" @input="input">
        <template v-slot:tabs>
          <drawer-tab label="Application">
            <FeatherIcon :icon="support" class="icon" />
          </drawer-tab>
          <drawer-tab label="Application">
            <FeatherIcon :icon="support" class="icon" />
          </drawer-tab>
          <drawer-tab-separator></drawer-tab-separator>
          <drawer-tab label="Application">
            <FeatherIcon :icon="support" class="icon" />
          </drawer-tab>
        </template>
        <drawer-tab-content class="first">
          <template v-slot:header>
            <span>Tab one</span>
          </template>
          <FeatherList>
            <FeatherListItem href="#" tab-index="0" title="Menu item 1">
              <template v-slot:icon>
                <FeatherIcon :icon="support" class="icon" />
              </template>
              Menu item 1
            </FeatherListItem>
            <FeatherListItem href="#" tab-index="0" title="Menu item 2"
              >Menu item 2</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 3"
              >Menu item 3</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 4"
              >Menu item 4</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 5"
              >Menu item 5</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 6"
              >Menu item 6</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 7"
              >Menu item 7</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 8"
              >Menu item 8</FeatherListItem
            >
          </FeatherList>
        </drawer-tab-content>
        <drawer-tab-content :header="header">
          <FeatherList>
            <FeatherListHeader>Menu Group 2</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 9"
              >Menu item 9</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 10"
              >Menu item 10</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 11"
              >Menu item 11</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 12"
              >Menu item 12</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group 3</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 13"
              >Menu item 13</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 14"
              >Menu item 14</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 15"
              >Menu item 15</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 16"
              >Menu item 16</FeatherListItem
            >
          </FeatherList>
        </drawer-tab-content>
        <drawer-tab-content header="Tab Three">
          <FeatherList>
            <FeatherListHeader>Menu Group 4</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 17"
              >Menu item 17</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 18"
              >Menu item 18</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 19"
              >Menu item 19</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 20"
              >Menu item 20</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group 5</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 21"
              >Menu item 21</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 22"
              >Menu item 22</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 23"
              >Menu item 23</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 24"
              >Menu item 24</FeatherListItem
            >
          </FeatherList>
        </drawer-tab-content>
      </drawer-tab-container>
    </feather-drawer>
  </div>
</template>
<script lang="ts">
import * as components from "../src";
import { FeatherIcon } from "@featherds/icon";
import Support from "@featherds/icon/action/Help";
import * as listComponents from "@featherds/list";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ...components,
    ...listComponents,
    FeatherIcon,
  },
  data: () => ({
    visible: false,
    header: "Tab Two",
    message: "On",
    support: Support,
  }),
  methods: {
    input: console.log,
    tabSelected: console.log,
    onShown() {
      console.log("shown");
    },
  },
});
</script>
<style lang="scss" scoped>
.drawer-container .drawer-tab-content[role="tabpanel"] :deep(div.header) {
  display: none;
}
.drawer-container :deep(a.closeButton) {
  display: none;
}
</style>
<style>
.fixed-width {
  width: 266px;
}
</style>
