<template>
  <section>
    <FeatherVerticalAppBar :labels="labels" :content="content">
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

          <span class="product-text">Product</span>
        </IconTextAnimate>
      </template>
      <template v-slot:nav>
        <FeatherVerticalNavHeader title="Applications" />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Three"
        />
        <FeatherVerticalNavHeader title="Applications" />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App One"
        />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Two"
        />
        <FeatherVerticalNavItem
          href="#/AppRail-DemoFullscreen"
          :icon="app"
          title="App Three"
        />
      </template>
    </FeatherVerticalAppBar>
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
}
</style>
