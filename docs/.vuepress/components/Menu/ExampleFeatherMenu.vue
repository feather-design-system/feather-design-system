<template>
  <FeatherMenu
    ref="menu"
    :open="open"
    @trigger-click="triggerClicked"
    @outside-click="outsideClicked"
  >
    <template v-slot:trigger>
      <FeatherButton primary menu-trigger>Something</FeatherButton>
    </template>
    <p>Menu CONTENT</p>
  </FeatherMenu>
</template>
<script>
import { FeatherMenu } from "@featherds/menu";
import { FeatherButton } from "@featherds/button";
export default {
  data() {
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
};
</script>
