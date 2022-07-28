<template>
  <section>
    <FeatherAppBar :labels="labels" :content="content" class="demo-app-bar">
      <template v-slot:right>
        <FeatherAppBarLink
          :icon="support"
          title="Support"
          url="#"
          :aria-expanded="drawerOpen"
          role="button"
          @click.prevent="drawerOpen = true"
        />
      </template>
    </FeatherAppBar>
    <FeatherDrawer
      class="demo-drawer"
      v-model="drawerOpen"
      :labels="{ close: 'close', title: 'Support' }"
      width="18.75rem"
    >
      A Support Drawer
    </FeatherDrawer>
    <div id="test">Page contents</div>
  </section>
</template>
<script lang="ts">
import { FeatherAppBar, FeatherAppBarLink } from "@featherds/app-bar";
import { FeatherDrawer } from "@featherds/drawer";
import Support from "@featherds/icon/action/Help";
import { FeatherIcon } from "@featherds/icon";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      support: Support,
      drawerOpen: false,
    };
  },
  components: {
    FeatherAppBar,
    FeatherAppBarLink,
    FeatherDrawer,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
// scss to make it all run in container
.demo-app-bar {
  position: absolute !important;
  :deep(.header) {
    position: absolute !important;
    z-index: 1 !important;
  }
}
.demo-drawer {
  :deep(.greyedOut) {
    position: absolute !important;
    left: 0 !important;
    bottom: 0 !important;
    top: 0 !important;
    right: 0 !important;
    height: auto !important;
    width: auto !important;
  }
  :deep(.content) {
    position: absolute !important;
  }
}
section {
  position: relative;
  overflow: hidden;
}
#test {
  height: 18.75rem;
}
</style>
