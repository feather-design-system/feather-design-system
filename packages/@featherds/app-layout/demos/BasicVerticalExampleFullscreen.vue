<template>
  <FeatherAppLayout content-layout="full" nav-layout="vertical">
    <template v-slot:header>
      <FeatherAppHeader>
        <div class="header-section">
          <div class="right">
            <FeatherButton icon="Support">
              <FeatherIcon :icon="Support"> </FeatherIcon>
            </FeatherButton>
          </div>
        </div>
      </FeatherAppHeader>
    </template>

    <template v-slot:rail>
      <FeatherAppRail :labels="labels" :content="content">
        <template v-slot:icon>
          <a href="#/AppLayout-BasicVerticalExampleFullscreen">
            <IconTextAnimate>
              <template v-slot:icon>
                <FeatherIcon :icon="app" title="Awesome Product" class="product-icon"></FeatherIcon>
              </template>
              <template v-slot:text>
                <span class="product-text">Product</span>
              </template>
            </IconTextAnimate>
          </a>
        </template>
        <template v-slot:nav>
          <FeatherAppRailNavHeader title="Applications" />
          <FeatherAppRailNavItem href="#/AppLayout-BasicVerticalExampleFullscreen" :icon="app" title="App One" />
          <FeatherAppRailNavItem href="#/AppLayout-BasicVerticalExampleFullscreen" :icon="app" title="App Two" />
          <FeatherAppRailNavItem href="#/AppLayout-BasicVerticalExampleFullscreen" :icon="app" title="App Three" />
        </template>
      </FeatherAppRail>
    </template>

    <AppContent class="full-width" />

    <template v-slot:footer>
      <FeatherFooter :copyright="copyright">
        <template v-slot:links>
          <FeatherFooterLink href="#/AppLayout-BasicVerticalExampleFullscreen">
            App 1
          </FeatherFooterLink>
          <FeatherFooterLink href="#/AppLayout-BasicVerticalExampleFullscreen">
            App 2
          </FeatherFooterLink>
          <FeatherFooterLink href="#/AppLayout-BasicVerticalExampleFullscreen">
            App 3
          </FeatherFooterLink>
          <FeatherFooterLink href="#/AppLayout-BasicVerticalExampleFullscreen">
            Support
          </FeatherFooterLink>
        </template>
      </FeatherFooter>
    </template>
  </FeatherAppLayout>
</template>
<script lang="ts">
import { FeatherAppLayout } from "@featherds/app-layout";
import {
  FeatherAppRail,
  FeatherAppRailNavItem,
  FeatherAppRailNavHeader,
  IconTextAnimate,
  FeatherAppHeader,
} from "@featherds/app-rail";
import { FeatherFooter, FeatherFooterLink } from "@featherds/footer";
import AppContent from "./components/AppContent.vue";
import Support from "@featherds/icon/action/Help";
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      copyright: "Copyright © ${year} A COMPANY, Inc.  All Rights Reserved. ",
      Support,
    };
  },
  computed: {
    app() {
      return App;
    },
  },
  components: {
    FeatherAppLayout,
    FeatherFooter,
    FeatherFooterLink,
    AppContent,
    FeatherAppRail,
    FeatherAppRailNavItem,
    FeatherAppRailNavHeader,
    IconTextAnimate,
    FeatherIcon,
    FeatherAppHeader,
    FeatherButton,
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

.product-icon {
  font-size: 18px;
}

.product-text {
  margin-left: 0.5rem;
  @include headline3;
  color: var(--feather-app-rail-text-color);
}
</style>
