<template>
  <section>
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

      <AppContent class="content" />
    </FeatherAppLayout>
  </section>
</template>
<script>
import * as components from "./../src";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppNavList from "./components/AppNavList";
import AppContent from "./components/AppContent";

export default {
  components: {
    ...components,
    AppFooter,
    AppHeader,
    AppNavList,
    AppContent,
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 200vh;
}
</style>
