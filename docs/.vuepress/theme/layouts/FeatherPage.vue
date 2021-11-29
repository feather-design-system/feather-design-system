<template>
  <FeatherAppLayout class="feather-styles" content-layout="full">
    <template v-slot:header>
      <FeatherAppBar
        class="header-with-search"
        :labels="appbarLabels"
        content="main"
        full-width
        scroll-hide
      >
        <template v-slot:left>
          <div class="header-title">
            <a :href="$withBase('/')"
              ><FeatherLogoFull
                class="full-header-icon"
              /><FeatherLogoMotif
                class="small-header-icon"
              />
            </a>
            &nbsp;
          </div>
        </template>
        <template v-slot:center>
          <!-- Patterns -->
          <AppBarLink title="Foundation" :url="$withBase('/Foundation/Styles/Color')"
            >Foundation</AppBarLink
          >
          <!-- Packages -->
          <AppBarLink title="Components" :url="$withBase('/Components/')"
            >Components</AppBarLink
          >
        </template>
        <template v-slot:right>
          <div class="right-container">
            <PageThemeChange class="theme-changer" />
            <DocSearch />
          </div>
        </template> </FeatherAppBar
    ></template>
    <template v-slot:rail><slot name="rail" /></template>
    <div id="main">
      <slot />
    </div>
    <Footer />
  </FeatherAppLayout>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import FeatherLogoFull from "../components/FeatherLogoFull.vue";
import FeatherLogoMotif from "../components/FeatherLogoMotif.vue";
import { FeatherMegaMenu } from "@featherds/megamenu";
import { FeatherAppBarLink, FeatherAppBar } from "@featherds/app-bar";
import { FeatherAppLayout } from "@featherds/app-layout";
import AppBarLink from "../components/AppBarLink.vue";
import PageThemeChange from "../components/PageThemeChange";
import Footer from "../components/Footer";
import DocSearch from "../components/DocSearch";

export default {
  data() {
    return {
      appbarLabels: {
        skip: "Skip to main content",
        expand: "Click to expand side navigation",
      },
      iconCaret: KeyboardArrowDown,
    };
  },
  components: {
    PageThemeChange,
    FeatherIcon,
    FeatherMegaMenu,
    FeatherAppBarLink,
    FeatherAppBar,
    AppBarLink,
    Footer,
    FeatherAppLayout,
    DocSearch,
    FeatherLogoFull,
    FeatherLogoMotif
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/lib/grid";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/responsive";
@import "@featherds/styles/themes/variables";
#main {
  flex: 1;
  display: flex;
  flex-direction: column;
  :deep(img) {
    max-width: 100%;
  }
  :deep(.main-content) {
    padding-bottom: 0;
  }
}
.header-title {
  height: 100%;
  display: inline-block;
  margin-right: 24px;
  a {
    @include headline4();
    color: var($surface);
    line-height: 63px;
    text-decoration: none;
    text-transform: uppercase;
    &:hover,
    &:visited {
      text-decoration: none;
      color: var($surface);
    }
  }
  &,
  a {
    display: inline-flex;
    align-items: center;
  }
  .feather-icon {
    height: inherit;
    width: inherit;
  }
}
.feather-styles {
  :deep(.app-content-container) {
    display: flex;
    flex-direction: column;
  }
  :deep(footer) {
    flex: none;
  }
}
.right-container {
  display: flex;
  align-items: center;
  height: 100%;

  & .search-container {
    & .search-icon {
      color: var($secondary-text-on-color);
      font-size: 24px;
      position: relative;
      top: 3px;
      left: 45px;
      margin-left: -24px;
    }
  }
}
.theme-changer {
  margin-right: 12px;
}
:deep(div.header-content) {
  div.center-horiz {
    &.left {
      order: 1;
    }
    &.center {
      order: 2;
      margin-left: auto;
    }
    &.right {
      order: 3;
      padding-left: 0;
      flex: 0;
    }
  }
}
.small-header-icon {
  display: none;
}
.full-header-icon {
  display: block;
}

@include media-query-below(m) {
  .small-header-icon {
    display: block;
  }
  .full-header-icon {
    display: none;
  }
}
@include media-query-below(s) {
  :deep(div.feather-app-bar-wrapper) {
    --feather-header-height: 120px;
    .header-content {
      flex-wrap: wrap;
    }
    div.center-horiz {
      height: 60px;
      &.left,
      &.right {
        flex-grow: 0;
        flex-basis: 50%;
      }
      &.center {
        order: 4;
        margin-left: 0;
        flex: 1;
        justify-content: center;
      }
    }
  }
}
//need this for SSR to hide the menu by default render when small enough
@include media-query-below(xl) {
  .feather-styles :deep(.app-rail) {
    .app-rail-content {
      position: fixed;
      left: 0;
      top: 0;
      z-index: var($zindex-modal);
      transform: translateX(-100%);
    }
  }
}
</style>
<style lang="scss">
@import "../styles/global";
</style>
