<template>
  <FeatherAppLayout content-layout="full">
    <template v-slot:header>
      <AppHeader scroll-hide />
    </template>
    <template v-slot:rail>
      <AppNavList />
    </template>

    <template v-slot:footer>
      <AppFooter />
    </template>

    <AppContent class="content full-width" />
  </FeatherAppLayout>
</template>
<script lang="ts">
import * as components from "./../src";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppNavList from "./components/AppNavList.vue";
import AppContent from "./components/AppContent.vue";

import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppNavList,
    AppContent,
  },
});
</script>
<style lang="scss" scoped>
.content {
  height: 200vh;
}
</style>
