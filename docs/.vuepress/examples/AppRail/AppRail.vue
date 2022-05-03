<template>
  <section class="fake-page">
    <FeatherAppRail :labels="labels" :content="content">
      <template v-slot:icon>
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
      <template v-slot:nav>
        <FeatherAppRailNavHeader title="Applications" />
        <FeatherAppRailNavItem href="#" :icon="app" title="App One" />
        <FeatherAppRailNavItem href="#" :icon="app" title="App Two" />
        <FeatherAppRailNavItem
          href="#"
          :icon="app"
          title="App Three"
          class="selected"
        />
        <FeatherAppRailNavHeader title="Applications" />
        <FeatherAppRailNavItem href="#" :icon="app" title="App One" />
        <FeatherAppRailNavItem href="#" :icon="app" title="App Two" />
        <FeatherAppRailNavItem href="#" :icon="app" title="App Three" />
      </template>
    </FeatherAppRail>
  </section>
</template>
<script lang="ts">
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import {
  FeatherAppRail,
  FeatherAppRailNavHeader,
  FeatherAppRailNavItem,
  IconTextAnimate,
} from "@featherds/app-rail";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      app: App,
    };
  },
  components: {
    FeatherAppRail,
    FeatherAppRailNavHeader,
    FeatherAppRailNavItem,
    IconTextAnimate,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";

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
}
</style>
