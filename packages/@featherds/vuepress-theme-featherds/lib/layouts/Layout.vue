<template>
  <FeatherPage class="layout" :class="cls">
    <template v-slot:rail>
      <NavMenu :menu="menu" v-if="menu" />
    </template>
    <div class="title-container">
      <div class="title-section center feather-container">
        <div class="content-container">
          <p class="pre-text">{{ preText }}</p>
          <h1 class="title" :id="idSafeTitle">
            <a
              class="header-anchor"
              :href="'#' + idSafeTitle"
              aria-hidden="true"
              >#</a
            >{{ title }}
          </h1>
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
        v-if="sidebarItems.length && showToc"
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
import NavMenu from "../components/NavMenu.vue";
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
    idSafeTitle() {
      return this.title.toLowerCase().replace(/ /g, "-");
    },
    title() {
      return this.$page.title;
    },
    description() {
      return this.$page.frontmatter.description;
    },
    cls() {
      return this.$page.frontmatter.class;
    },
    preText() {
      return this.$page.frontmatter.pre;
    },
    menu() {
      return this.$page.frontmatter.menu;
    },
    showToc() {
      if (!this.$page.frontmatter.toc) {
        return true;
      }
      return this.$page.frontmatter.toc;
    },
    sidebarItems() {
      if (this.$page && this.$page.headers && this.showToc) {
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
    NavMenu,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/responsive";

$contentWidth: 47.5rem;
.content-container {
  max-width: $contentWidth;
}
@include media-query-below(s) {
  .content-container {
    width: 100%;
  }
}
.all-components .content-container {
  width: 100%;
  max-width: 100%;
}
.center {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.main-content {
  margin-bottom: 3.75rem;
}
:deep(.smaller) {
  font-size: 0.6em;
  opacity: 0.8;
}

.title-container {
  margin-bottom: 2.5rem;
  padding: 2.5rem 0;
  background: var($background);
  .pre-text {
    @include overline();
    color: var($primary);
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .title-description {
    margin: 0;
  }
}
$gutterwidth: 9.375rem;
div.toc {
  padding-left: 1rem;
  position: absolute;
  left: calc(50% + 15.5rem);
  &.fixed {
    position: fixed;
    top: 84px;
    left: calc(50% + 23.6875rem);
  }
}

@include media-query-below(xl) {
  div.toc.fixed {
    left: calc(50% + 15.5rem);
  }
}
@include media-query-below(l) {
  div.toc {
    position: static;
    margin: 1rem;
    margin-top: 0px;
    margin-bottom: 3.5rem;
    width: 12.5rem;
    &.fixed {
      position: static;
      margin: 1rem;
      margin-top: 0px;
      margin-bottom: 3.5rem;
      width: 12.5rem;
    }
  }
}
</style>
