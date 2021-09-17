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
<script>
import * as components from "./../src";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppRail from "./components/AppRail";
import AppContent from "./components/AppContent";
export default {
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppRail,
    AppContent,
  },
};
</script>
