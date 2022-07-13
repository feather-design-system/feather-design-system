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
    <div>
      <button
        id="left-button"
        @click="leftVisible = true"
        :aria-expanded="leftVisible ? 'true' : 'false'"
      >
        Open Left Drawer
      </button>
      <p>Left Drawer Is Open: {{ leftVisible }}</p>
    </div>

    <feather-drawer
      @shown="onShown"
      v-model="visible"
      :labels="{ close: 'close', title: 'Title of the drawer' }"
      width="20em"
    >
      <div class="fixed-width">
        <h1 id="drawer">I AM DRAWER</h1>
        <input v-model="message" placeholder="edit me" />
        <p>Tab Trap Status: {{ message }}</p>
      </div>
    </feather-drawer>

    <feather-drawer
      @shown="onShown"
      :left="true"
      v-model="leftVisible"
      :labels="{ close: 'close', title: 'Title of the drawer' }"
      width="30em"
    >
      <div class="fixed-width">
        <h1 id="left-drawer">I AM LEFT DRAWER</h1>
        <input v-model="message" placeholder="edit me" />
        <p>Tab Trap Status: {{ message }}</p>
      </div>
    </feather-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "../src";

export default defineComponent({
  components: {
    ...components,
  },
  data: () => ({
    visible: false,
    leftVisible: false,
    message: "On",
  }),
  methods: {
    onShown() {
      console.log("shown");
    },
  },
});
</script>
<style>
.fixed-width {
  width: 25rem;
}
</style>
