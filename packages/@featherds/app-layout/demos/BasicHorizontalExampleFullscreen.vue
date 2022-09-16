<template>
  <FeatherAppLayout content-layout="full">
    <template v-slot:header>
      <FeatherAppBar :labels="labels" :content="content" full-width>
        <template v-slot:left>
          <a href="#/AppLayout-BasicVerticalExampleFullscreen" class="product">
            <FeatherIcon :icon="App" title="Awesome Product" class="product-icon"></FeatherIcon>
            <span class="product-text">Product</span>
          </a>

          <a href="#/AppLayout-BasicVerticalExampleFullscreen" class="app-bar-link">App One</a>
          <a href="#/AppLayout-BasicVerticalExampleFullscreen" class="app-bar-link">App Two</a>
          <a href="#/AppLayout-BasicVerticalExampleFullscreen" class="app-bar-link">App Three</a>

        </template>
        <template v-slot:right>
          <FeatherAppBarLink :icon="Support" title="Support" url="#/AppLayout-BasicHorizontalExampleFullscreen" />
        </template>
      </FeatherAppBar>
    </template>

    <template v-slot:rail>
      <FeatherNavigationRail>
        <template v-slot:header>
          <div class="user">
            <FeatherIcon :icon="Account" class="user-icon" />
            <div>
              <p class="sub">Signed in as</p>
              <p class="user-name">Username</p>
            </div>
          </div>
        </template>
        <template v-slot:main>
          <FeatherRailItem href="#/AppLayout-BasicVerticalExampleFullscreen" :icon="App" title="Feedback" />
          <FeatherRailItem href="#/AppLayout-BasicVerticalExampleFullscreen" :icon="App" title="Sign out" />
        </template>
      </FeatherNavigationRail>
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
import { FeatherAppBar, FeatherAppBarLink } from "@featherds/app-bar";
import {
  FeatherNavigationRail,
  FeatherRailItem,
} from "@featherds/navigation-rail";
import { FeatherIcon } from "@featherds/icon";
import { FeatherFooter, FeatherFooterLink } from "@featherds/footer";
import AppContent from "./components/AppContent.vue";
import Support from "@featherds/icon/action/Help";
import App from "@featherds/icon/medical/Hospital";
import Account from "@featherds/icon/action/AccountCircle";
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
      App,
      Account,
    };
  },
  components: {
    FeatherAppLayout,
    FeatherNavigationRail,
    FeatherRailItem,
    FeatherAppBar,
    FeatherAppBarLink,
    FeatherIcon,
    FeatherFooter,
    FeatherFooterLink,
    AppContent,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";

.product {
  margin-right: 18px;

  &,
  &:hover {
    text-decoration: none;
  }
}

.app-bar-link {
  @include header();
  height: 100%;
  padding: 0.5rem;
  margin: 0 0.75rem;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  &,
  &:active,
  &:hover,
  &:visited {
    color: var($state-text-color-on-surface-dark);
    text-decoration: none;
  }
}

.product-icon {
  font-size: 18px;
  color: var($state-text-color-on-surface-dark);
}

.product-text {
  margin-left: 0.5rem;
  @include headline3;
  color: var($state-text-color-on-surface-dark);
}

.user {
  display: flex;
  align-items: center;

  .user-icon {
    height: 2rem;
    width: 2rem;
    color: var($primary);
    margin-right: 1rem;
  }

  .user-name {
    @include subtitle1;
  }

  .sub {
    @include caption;
  }
}
</style>
