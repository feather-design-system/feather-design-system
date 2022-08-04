<template>
  <FeatherAppLayout
    content-layout="full"
    nav-layout="vertical"
    class="fake-page"
  >
    <template v-slot:header>
      <FeatherAppHeader>
        <div class="header-section">
          <div class="left">
            <FeatherSelect
              inline
              label="Country"
              :options="countries"
              v-model="country"
              class="country-select"
            >
            </FeatherSelect>
          </div>
          <div class="right">
            <FeatherButton icon="Search">
              <FeatherIcon :icon="Search"> </FeatherIcon>
            </FeatherButton>

            <FeatherButton icon="Notifications">
              <FeatherIcon :icon="Notifications"> </FeatherIcon>
            </FeatherButton>
            <FeatherButton icon="Account">
              <FeatherIcon :icon="Account"> </FeatherIcon>
            </FeatherButton>
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
                :icon="App"
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
          <FeatherAppRailNavItem href="#" :icon="App" title="App One" />
          <FeatherAppRailNavItem href="#" :icon="App" title="App Two" />
          <FeatherAppRailNavItem
            href="#"
            :icon="App"
            title="App Three"
            class="selected"
          />
          <FeatherAppRailNavHeader title="Applications" />
          <FeatherAppRailNavItem href="#" :icon="App" title="App One" />
          <FeatherAppRailNavItem href="#" :icon="App" title="App Two" />
          <FeatherAppRailNavItem href="#" :icon="App" title="App Three" />
        </template>
      </FeatherAppRail>
    </template>

    <div>Content</div>
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
import countries from "@featherds/select/demos/countries";
import { FeatherSelect } from "@featherds/select";
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
      countries,
      country: undefined,
      content: "test",
      App,
      Apps,
      Account,
      Notifications,
      Search,
    };
  },
  components: {
    FeatherAppLayout,
    FeatherAppRail,
    FeatherAppRailNavItem,
    FeatherAppRailNavHeader,
    IconTextAnimate,
    FeatherIcon,
    FeatherAppHeader,
    FeatherSelect,
    FeatherButton,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.header-section {
  padding: 0 0.5rem;
  display: flex;

  width: 100%;
  justify-content: space-between;
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

// For demo only

:deep(.feather-app-rail) {
  position: absolute !important;
  height: 100% !important;
}

.fake-page {
  height: 450px;
  height: 450px !important;
  min-height: 450px !important;
  margin: 0 -1.25rem;
}
</style>
