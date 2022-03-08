<template>
  <section>
    <FeatherAppLayout>
      <template v-slot:header>
        <AppHeader />
      </template>
      <AppContent />
      <template v-slot:footer>
        <AppFooter />
      </template>
    </FeatherAppLayout>
  </section>
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
