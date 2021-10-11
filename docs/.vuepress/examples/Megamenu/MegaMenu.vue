<template>
  <section>
    <FeatherAppBar :labels="labels" :content="content" class="demo-app-bar">
      <template v-slot:left>
        <FeatherMegaMenu name="Management" close-text="Close" id="management">
          <template v-slot:button>
            Management
            <FeatherIcon :icon="iconCaret" class="icon" />
          </template>
          <div class="feather-row">
            <div
              class="
                feather-col-xl-4
                feather-col-l-4
                feather-col-m-4
                feather-col-s-4
                feather-col-xs-4
              "
            >
              <FeatherListItem href="#Regimen">Regimen Search</FeatherListItem>
            </div>
            <div
              class="
                feather-col-xl-4
                feather-col-l-4
                feather-col-m-4
                feather-col-s-4
                feather-col-xs-4
              "
            >
              <FeatherListItem href="#Disease"
                >Disease Management</FeatherListItem
              >
              <FeatherListItem href="#SDisease"
                >Sub-disease Management</FeatherListItem
              >
              <FeatherListItem href="#LoT"
                >Line of Treatment Management</FeatherListItem
              >
            </div>
            <div
              class="
                feather-col-xl-4
                feather-col-l-4
                feather-col-m-4
                feather-col-s-4
                feather-col-xs-4
              "
            >
              <FeatherListItem href="#Templates"
                >Create New Template</FeatherListItem
              >
            </div>
          </div>
        </FeatherMegaMenu>
      </template>
    </FeatherAppBar>
    <div id="test">Page contents</div>
  </section>
</template>
<script>
import { FeatherAppBar } from "@featherds/app-bar";
import { FeatherListHeader, FeatherListItem } from "@featherds/list";
import { FeatherIcon } from "@featherds/icon";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import { FeatherMegaMenu } from "@featherds/megamenu";
import { markRaw } from "vue";
export default {
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      iconCaret: markRaw(KeyboardArrowDown),
    };
  },
  components: {
    FeatherAppBar,
    FeatherListItem,
    FeatherMegaMenu,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
.demo-app-bar {
  position: absolute !important;

  :deep(header) {
    position: absolute !important;
    z-index: 1 !important;
  }
}
section {
  height: 200px;
  position: relative;
}
#test {
  height: 300px;
}
</style>
