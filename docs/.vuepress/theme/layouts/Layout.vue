<template>
  <FeatherPage class="layout">
    <div class="center content feather-container">
      <aside v-if="sidebarItems.length">
        <Sidebar :items="sidebarItems" title="Contents" />
      </aside>
      <div class="main-content">
        <Content />
      </div>
    </div>
  </FeatherPage>
</template>
<script>
import FeatherPage from "./FeatherPage";
import Sidebar from "../components/Sidebar.vue";
export default {
  computed: {
    sidebarItems() {
      if (this.$page && this.$page.headers) {
        return this.$page.headers
          .filter((h) => h.level === 2)
          .map((h) => ({
            href: "#" + h.slug,
            title: h.title,
          }));
      }
      return [];
    },
  },
  components: {
    FeatherPage,
    Sidebar,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/typography";
.center.content {
  padding-top: 24px;
}
.center {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  margin: 0 auto;
}
.main-content {
  padding-bottom: 60px;
}
:deep(.smaller) {
  font-size: 0.6em;
  opacity: 0.8;
}
$gutterwidth: 150px;
.center.content {
  position: relative;
  .main-content,
  .title-content {
    width: 100%;
  }
  aside {
    width: $gutterwidth;
    padding-left: 16px;
    position: fixed;
    left: calc(50% + 600px);
  }
}
@media only screen and (max-width: 1200px + (2*$gutterwidth)) {
  .center.content {
    aside {
      position: static;
      margin: 16px;
    }
  }
}
</style>
