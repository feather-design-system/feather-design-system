// Example usage with custom content
<template>
  <FeatherDock
    id="my-dock"
    @update:dock-expanded="requestDockExpansion"
    @update:dock-collapsed="console.log('dock collapsed')"
  />
</template>

<script setup>
import { inject } from "vue";
import { FeatherDock } from "@featherds/dock";

// Components that need to request expansion can do so
const requestDockExpansion = inject("requestDockExpansion", () => {
  // fallback
  console.log("dock expanded");
  // feather components like PanelBar can request dock expansion when they are opened
  // by calling this function.  This function is overridden in panel-bar to open the dock
  // when any panel is opened.  Other components can override this function to open the dock
  // as well.
  // requestDockExpansion();
});
</script>
