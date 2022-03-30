<template>
  <section>
    <feather-menu
      ref="menu"
      :open="open"
      @trigger-click="triggerClicked"
      @outside-click="outsideClicked"
    >
      <template v-slot:trigger>
        <feather-button style="margin: 0" primary menu-trigger
          >Something</feather-button
        >
      </template>
      <p>Menu CONTENT</p>
    </feather-menu>
  </section>
</template>
<script lang="ts">
import { FeatherMenu } from "./../src";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => {
    return { open: false };
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
    FeatherButton,
  },
});
</script>
