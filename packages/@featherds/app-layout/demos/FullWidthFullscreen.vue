<template>
  <FeatherAppLayout content-layout="full">
    <template v-slot:header>
      <AppHeader />
    </template>
    <AppContent class="full-width" />
    <template v-slot:footer>
      <AppFooter />
    </template>
  </FeatherAppLayout>
</template>
<script lang="ts">
import * as components from "./../src";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppContent from "./components/AppContent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppContent,
  },
});
</script>
