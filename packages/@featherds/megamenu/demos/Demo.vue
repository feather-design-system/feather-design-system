<template>
  <section>
    <FeatherMegaMenu name="Test" close-text="close">
      <template v-slot:button> Management </template>
      <div class="feather-row">
        <div
          class="feather-col-xl-4 feather-col-l-4 feather-col-m-4 feather-col-s-4 feather-col-xs-4"
        >
          <FeatherListItem href="#Regimen">Regimen Search</FeatherListItem>
        </div>
        <div
          class="feather-col-xl-4 feather-col-l-4 feather-col-m-4 feather-col-s-4 feather-col-xs-4"
        >
          <FeatherListItem href="#Disease">Disease Management</FeatherListItem>
          <FeatherListItem href="#SDisease"
            >Sub-disease Management</FeatherListItem
          >
          <FeatherListItem href="#LoT"
            >Line of Treatment Management</FeatherListItem
          >
        </div>
        <div
          class="feather-col-xl-4 feather-col-l-4 feather-col-m-4 feather-col-s-4 feather-col-xs-4"
        >
          <FeatherListItem href="#Templates"
            >Create New Template</FeatherListItem
          >
        </div>
      </div>
    </FeatherMegaMenu>
  </section>
</template>
<script lang="ts">
import * as components from "../src";
import { FeatherListItem } from "@featherds/list";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
    FeatherListItem,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/lib/grid";
#test {
  height: 120vh;
}
</style>
