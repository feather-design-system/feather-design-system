<template>
  <FeatherPage class="layout">
    <ComponentMenu></ComponentMenu>
    <div class="center content feather-container">
      <h1 class="title">{{title}}</h1>
      <div class="toc" v-if="sidebarItems.length">
        <Sidebar :items="sidebarItems" title="Contents" />
      </div>
      <main class="main-content">
        <Content />
      </main>
    </div>
  </FeatherPage>
</template>
<script>
import FeatherPage from "./FeatherPage";
import Sidebar from "../components/Sidebar.vue";
import ComponentMenu from "../components/ComponentMenu.vue";
export default {
  computed: {
    title(){
      return this.$page.title
    },
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
    Sidebar,ComponentMenu
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
  div.toc {
    width: $gutterwidth;
    padding-left: 16px;
    position: fixed;
    left: calc(50% + 720px);
  }
}
@media only screen and (max-width: 1780px) {
  .center.content {
    div.toc {
      position: static;
      margin: 16px;
    }
  }
}
</style>
