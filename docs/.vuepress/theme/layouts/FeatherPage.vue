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
          <a :href="$withBase('/')">Feather Design</a>
          &nbsp;
        </div>
        <!-- Patterns -->
        <FeatherAppBarButton @click="goToDesign">Design</FeatherAppBarButton>

        <!-- Packages -->
        <FeatherAppBarButton @click="goToComponents"
          >Components</FeatherAppBarButton
        >
      </template>
      <template v-slot:right>
        <div class="right-container">
          <PageThemeChange class="theme-changer" />
          <Docsearch /></div
      ></template>
    </FeatherAppBar>
    <div id="main">
      <slot />
    </div>
  </div>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import KeyboardArrowDown from "@featherds/icon/navigation/DownChevron";
import { FeatherMegaMenu } from "@featherds/megamenu";
import {
  FeatherAppBarButton,
  FeatherAppBarLink,
  FeatherAppBar,
} from "@featherds/app-bar";
import PageThemeChange from "../global-components/PageThemeChange";

export default {
  data() {
    return {
      appbarLabels: {
        skip: "Skip to main content",
      },
      iconCaret: KeyboardArrowDown,
    };
  },
  methods: {
    goToComponents() {
      this.$router.push("/Components/");
    },
    goToDesign() {
      this.$router.push("/Design/Foundation/");
    },
  },

  components: {
    PageThemeChange,
    FeatherIcon,
    FeatherMegaMenu,
    FeatherAppBarButton,
    FeatherAppBarLink,
    FeatherAppBar,
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
  :deep(img) {
    max-width: 100%;
  }
}
.header-title {
  height: 100%;
  display: inline-block;
  margin-right: 8px;
  a {
    @include headline1();
    color: var($surface);
    line-height: 63px;
    text-decoration: none;
    &:hover,
    &:visited {
      text-decoration: none;
      color: var($surface);
    }
  }
}
.right-container {
  display: flex;
  align-items: center;
  height: 100%;
}
.theme-changer {
  margin-right: 12px;
}
</style>
<style lang="scss">
@import "../styles/global";
</style>
