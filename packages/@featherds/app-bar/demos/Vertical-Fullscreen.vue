<template>
  <section>
    <FeatherAppRail :labels="labels" :content="content">
      <template v-slot:header>
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

          <!-- <span class="product-text">Product</span> -->
        </IconTextAnimate>
      </template>
      <template v-slot:nav>
        <FeatherAppRailNavHeader title="" />
        <FeatherAppRailNavHeader title="Applications" />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Three"
        />
        <FeatherAppRailNavHeader title="Settings" />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Three"
        />
      </template>
    </FeatherAppRail>
    <FeatherAppBar :labels="labels" :content="content" scroll-hide>
      <template v-slot:left>
        <FeatherIcon :icon="app" title="Awesome Product" class="product-icon">
        </FeatherIcon>
      </template>
    </FeatherAppBar>
    <div id="test" class="main-content">Page contents</div>
  </section>
</template>
<script lang="ts">
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import * as components from "./../src";
import * as appRailComponents from "./../../app-rail/src";
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
    ...components,
    ...appRailComponents,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/mixins/typography" as typo;
#test {
  height: 120vh;
}

.product-icon {
  font-size: 18px;
}
.product-text {
  margin-left: 0.5rem;
  @include typo.headline3;
}
.main-content {
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
}
</style>
