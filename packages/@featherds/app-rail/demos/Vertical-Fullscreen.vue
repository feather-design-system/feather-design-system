<template>
  <section>
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
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App Three"
          class="selected"
        />
        <FeatherAppRailNavHeader title="Applications" />
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-VerticalFullscreen"
          :icon="app"
          title="App Three"
        />
      </template>
    </FeatherAppRail>
    <div id="test">Page contents</div>
  </section>
</template>
<script lang="ts">
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import * as components from "./../src";
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
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
#test {
  height: 120vh;
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
