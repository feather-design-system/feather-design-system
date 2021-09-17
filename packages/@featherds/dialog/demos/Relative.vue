<template>
  <div class="center container">
    <feather-button
      primary
      @click="visible = true"
      :aria-expanded="visible ? 'true' : 'false'"
      >Open Dialog</feather-button
    >
    <p>Dialog Is Open: {{ visible }}</p>
    <div class="relative">
      <div style="height: 120vh">
        <feather-dialog v-model="visible" :relative="true" :labels="labels">
          <p class="my-content">Ich bin zufrieden</p>
          <template v-slot:icon>
            <feather-button primary @click="visible = false"
              >Save</feather-button
            >
          </template>
        </feather-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import * as components from "../src";
import { FeatherButton } from "@featherds/button";
export default {
  data: () => ({
    visible: false,
    labels: {
      title: "A Dialog",
      close: "Close",
    },
  }),
  methods: {
    onShown() {
      console.log("shown!!");
    },
  },
  components: {
    ...components,
    FeatherButton,
  },
};
</script>
<style>
.my-content {
  width: 400px;
}
.relative {
  width: 600px;
  height: 600px;
  position: relative;
  overflow-y: auto;
}
</style>
