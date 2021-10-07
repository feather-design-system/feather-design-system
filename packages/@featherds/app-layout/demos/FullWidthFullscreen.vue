<template>
  <section>
    <FeatherAppLayout content-layout="full">
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
<script>
import * as components from "./../src";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppContent from "./components/AppContent";
export default {
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppContent,
  },
};
</script>
