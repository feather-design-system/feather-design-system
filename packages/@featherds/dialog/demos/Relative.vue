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
<script lang="ts">
import * as components from "../src";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";
export default defineComponent({
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
});
</script>
<style>
.my-content {
  width: 25rem;
}
.relative {
  width: 37.5rem;
  height: 37.5rem;
  position: relative;
  overflow-y: auto;
}
</style>
