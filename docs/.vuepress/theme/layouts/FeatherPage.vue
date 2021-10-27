<template>
  <div class="feather-styles">
    <FeatherAppBar
      class="header-with-search"
      :labels="appbarLabels"
      content="main"
      full-width
    >
      <template v-slot:left>
        <div class="header-title">
          <a :href="$withBase('/')"><FeatherIcon :icon="LogoFull" title="Feather DS"></FeatherIcon></a>
          &nbsp;
        </div>
      </template>
      <template v-slot:center>
        <!-- Patterns -->
        <AppBarLink title="Foundation" url="/Design/Foundation/">Foundation</AppBarLink>
        <!-- Packages -->
        <AppBarLink title="Components" url="/Components/">Components</AppBarLink>
      </template>
      <template v-slot:right>
        <div class="right-container">
          <PageThemeChange class="theme-changer" />
          <DocSearch />
        </div>
      </template>
    </FeatherAppBar>
    <div id="main">
      <slot />
    </div>
    <Footer />
  </div>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import FeatherLogoFull from "@featherds/icon/branding/FeatherLogoFull";
import { FeatherMegaMenu } from "@featherds/megamenu";
import {
  FeatherAppBarLink,
  FeatherAppBar,
} from "@featherds/app-bar";
import AppBarLink from "../components/AppBarLink.vue";
import PageThemeChange from "../global-components/PageThemeChange";
import Footer from "../global-components/Footer";

export default {
  data() {
    return {
      appbarLabels: {
        skip: "Skip to main content",
      },
      iconCaret: KeyboardArrowDown,
      LogoFull: FeatherLogoFull
    };
  },
  components: {
    PageThemeChange,
    FeatherIcon,
    FeatherMegaMenu,
    FeatherAppBarLink,
    FeatherAppBar,
    AppBarLink,
    Footer
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/lib/grid";
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
#main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  :deep(img) {
    max-width: 100%;
  }
  ::v-deep(.main-content) {
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
  &, & a {
    display: inline-flex;
    align-items: center;
  }
  .feather-icon {
    height: inherit;
    width: inherit;
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
::v-deep(div.header-content) {
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
@media all and (max-width: 760px) {
  ::v-deep(div.header-content) {
    flex-wrap: wrap;
    height: 120px;

    div.center-horiz {
      height: 60px;
      &.left, &.right {
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
</style>
<style lang="scss">
@import "../styles/global";
</style>
