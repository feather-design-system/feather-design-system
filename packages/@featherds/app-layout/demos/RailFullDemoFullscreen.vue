<template>
  <section>
    <FeatherAppLayout content-layout="full">
      <template v-slot:header>
        <AppHeader />
      </template>
      <template v-slot:rail>
        <AppRail />
      </template>

      <template v-slot:footer>
        <AppFooter />
      </template>

      <AppContent />
    </FeatherAppLayout>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppRail from "./components/AppRail.vue";
import AppContent from "./components/AppContent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppRail,
    AppContent,
  },
});
</script>
