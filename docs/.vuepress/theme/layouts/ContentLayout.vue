<template>
  <FeatherPage class="layout" :class="class">
    <template v-slot:rail>
      <slot name="rail"></slot>
    </template>
    <div class="title-container">
      <div class="title-section center feather-container">
        <div class="content-container">
          <p class="pre-text">{{ preText }}</p>
          <h1 class="title">{{ title }}</h1>
          <p class="title-description">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
    <div class="feather-container center">
      <div
        class="toc"
        :class="{ fixed: fixed }"
        v-if="sidebarItems.length"
        ref="toc"
      >
        <Sidebar :items="sidebarItems" title="Contents" />
      </div>
      <main class="main-content content-container">
        <Content />
      </main>
    </div>
  </FeatherPage>
</template>
<script>
import FeatherPage from "./FeatherPage";
import Sidebar from "../components/Sidebar.vue";
import { useScroll } from "@featherds/composables/events/Scroll";
import { ref, watch, onMounted } from "vue";
export default {
  setup() {
    const toc = ref();
    const fixed = ref(false);
    let tocTop = 0;
    const onScroll = () => {
      const scrollPos = document.documentElement.scrollTop;

      fixed.value = scrollPos >= tocTop;
    };

    onMounted(() => {
      const activate = useScroll(ref(document), onScroll);
      activate.value = true;
    });

    watch(toc, (nv) => {
      tocTop = nv.getBoundingClientRect().top - 60;
    });

    return { toc, fixed };
  },
  computed: {
    title() {
      return this.$page.title;
    },
    description() {
      return this.$page.frontmatter.description;
    },
    class() {
      return this.$page.frontmatter.class;
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
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/responsive";

$contentWidth: 760px;
.content-container {
  width: $contentWidth;
}
@include media-query-below(s) {
  .content-container {
    width: 100%;
  }
}
.all-components .content-container {
  width: 100%;
}
.center {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.main-content {
  margin-bottom: 60px;
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
div.toc {
  padding-left: 16px;
  position: absolute;
  left: calc(50% + 248px);
  &.fixed {
    position: fixed;
    top: 84px;
    left: calc(50% + 379px);
  }
}

@include media-query-below(xl) {
  div.toc.fixed {
    left: calc(50% + 184px);
  }
}
@include media-query-below(l) {
  div.toc {
    position: static;
    margin: 16px;
    margin-top: 0px;
    margin-bottom: 56px;
    width: 200px;
    &.fixed {
      position: static;
      margin: 16px;
      margin-top: 0px;
      margin-bottom: 56px;
      width: 200px;
    }
  }
}
</style>
