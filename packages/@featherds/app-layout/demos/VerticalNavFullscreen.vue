<template>
  <FeatherAppLayout content-layout="full" nav-layout="vertical">
    <template v-slot:header>
      <FeatherAppHeader>
        <div class="header-section">
          <div class="right">
            <FeatherButton icon="Search">
              <FeatherIcon :icon="Search"> </FeatherIcon>
            </FeatherButton>

            <FeatherButton icon="Notifications">
              <FeatherIcon :icon="Notifications"> </FeatherIcon>
            </FeatherButton>
            <FeatherPopover :pointer-alignment="right">
              <template #trigger="{ attrs, on }">
                <FeatherButton icon="Account" v-on="on" v-bind="attrs">
                  <FeatherIcon :icon="Account"> </FeatherIcon> </FeatherButton
              ></template>
              <template #default>
                <div>
                  <h4>Welcome, Rik</h4>

                  <a href="#">Sign out</a>
                </div>
              </template>
            </FeatherPopover>
            <FeatherButton icon="Apps">
              <FeatherIcon :icon="Apps"> </FeatherIcon>
            </FeatherButton>
          </div>
        </div>
      </FeatherAppHeader>
    </template>
    <template v-slot:rail>
      <FeatherAppRail :labels="labels" :content="content">
        <template #icon>
          <IconTextAnimate>
            <template v-slot:icon>
              <FeatherIcon
                :icon="app"
                title="Awesome Product"
                class="product-icon"
              ></FeatherIcon>
            </template>

            <template v-slot:text>
              <span class="product-text">Product</span>
            </template>
          </IconTextAnimate>
        </template>
        <template #nav>
          <FeatherAppRailNavHeader title="Applications" />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App One"
          />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App Two"
          />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App Three"
          />
          <FeatherAppRailNavHeader title="Applications" />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App One"
          />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App Two"
          />
          <FeatherAppRailNavItem
            href="#/AppLayout-VerticalNavFullscreen"
            :icon="app"
            title="App Three"
          />
        </template>
      </FeatherAppRail>
    </template>

    <template v-slot:footer>
      <AppFooter />
    </template>

    <AppContent class="full-width" />
  </FeatherAppLayout>
</template>
<script lang="ts">
import * as components from "./../src";

import {
  FeatherAppRail,
  FeatherAppRailNavItem,
  FeatherAppRailNavHeader,
  IconTextAnimate,
  FeatherAppHeader,
} from "@featherds/app-rail";
import { FeatherPopover, PointerAlignment } from "@featherds/popover";
import AppFooter from "./components/AppFooter.vue";
import AppContent from "./components/AppContent.vue";
import App from "@featherds/icon/medical/Hospital";
import Apps from "@featherds/icon/navigation/Apps";
import Account from "@featherds/icon/action/AccountCircle";
import Notifications from "@featherds/icon/action/Notifications";
import Search from "@featherds/icon/action/Search";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      right: PointerAlignment.right,
      content: "test",
      Apps,
      Account,
      Notifications,
      Search,
    };
  },
  computed: {
    app() {
      return App;
    },
  },
  components: {
    ...components,
    AppFooter,
    AppContent,
    FeatherAppRail,
    FeatherAppRailNavItem,
    FeatherAppRailNavHeader,
    IconTextAnimate,
    FeatherIcon,
    FeatherAppHeader,
    FeatherButton,
    FeatherPopover,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
.header-section {
  padding: 0 0.5rem;
  display: flex;

  width: 100%;
  justify-content: flex-end;
}
.btn {
  margin-left: var($spacing-xs);
}
.country-select {
  width: 200px;
}
.product-icon {
  font-size: 18px;
}
.product-text {
  margin-left: 0.5rem;
  @include headline3;
  color: var(--feather-app-rail-text-color);
}
</style>
