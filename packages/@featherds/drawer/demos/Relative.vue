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

    <div class="relative">
      <div class="long"></div>

      <feather-drawer
        id="drawer"
        @shown="onShown"
        v-model="visible"
        :labels="{ close: 'close', title: 'Title of the drawer' }"
        width="20em"
      >
        <div class="fixed-width">
          <h1>I AM DRAWER</h1>
          <input v-model="message" placeholder="edit me" />
          <p>Tab Trap Status: {{ message }}</p>
        </div>
      </feather-drawer>
    </div>
  </div>
</template>
<script>
import * as components from "../src";

export default {
  components: {
    ...components,
  },
  data: () => ({
    visible: false,
    message: "",
  }),
  methods: {
    onShown() {
      console.log("shown");
    },
  },
};
</script>
<style>
.fixed-width {
  width: 25rem;
}
.relative {
  position: relative;
  overflow-y: auto;
  max-height: 12.5rem;
}
.long {
  height: 100vh;
}
</style>
