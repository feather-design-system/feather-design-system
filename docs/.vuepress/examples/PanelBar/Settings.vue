<template>
  <div class="settings">
    <FeatherCheckbox
      id="checkbox1"
      v-model="showPanelBarTitle"
      @change="showPanelBarTitle = !showPanelBarTitle"
    >Show Main Panel Bar Title?</FeatherCheckbox>
    <FeatherCheckbox
      id="checkbox1"
      v-model="iconOnly"
      @change="iconOnly = !iconOnly"
    >Show Icon Only?</FeatherCheckbox>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from "vue";
import { FeatherCheckbox } from "@featherds/checkbox";

const showPanelBarTitle = inject<Ref<boolean>>("showPanelBarTitle");
if (!showPanelBarTitle) {
  throw new Error("showPanelBarTitle is not provided");
}
const iconOnly = inject<Ref<boolean>>("iconOnly");
if (!iconOnly) {
  throw new Error("iconOnly is not provided");
}

</script>

<style lang="scss" scoped>

.settings {
display: flex;
flex-direction: column;
}
</style>
