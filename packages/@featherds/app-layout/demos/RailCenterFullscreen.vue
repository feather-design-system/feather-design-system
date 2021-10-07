<template>
  <FeatherAppLayout>
    <template v-slot:header>
      <AppHeader />
    </template>
    <template v-slot:rail>
      <AppRail />
    </template>
    <AppContent />
    <template v-slot:footer>
      <AppFooter />
    </template>
  </FeatherAppLayout>
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
