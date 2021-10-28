<template>
  <FeatherPage class="layout">
    <template v-slot:rail>
      <ComponentMenu></ComponentMenu>
    </template>
    <div class="title-container">
      <div class="title-section center feather-container">
        <p class="pre-text">{{ preText }}</p>
        <h1 class="title">{{ title }}</h1>
        <p class="title-description">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="center content feather-container">
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
    title() {
      return this.$page.title;
    },
    description() {
      return this.$page.frontmatter.description;
    },
    preText() {
      return this.$page.frontmatter.pre;
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
    Sidebar,
    ComponentMenu,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/typography";

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

.title-container {
  margin-bottom: 40px;
  padding: 40px 0;
  background: var($background);
  .pre-text {
    @include overline();
    color: var($primary);
    margin: 0;
    margin-bottom: 8px;
  }
  .title-description {
    margin: 0;
  }
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
      margin-top: 0px;
      margin-bottom: 56px;
      width: 200px;
    }
  }
}
</style>
