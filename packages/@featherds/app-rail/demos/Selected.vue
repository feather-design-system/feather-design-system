<script lang="ts" setup>
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import {
  FeatherAppRailNavHeader,
  FeatherAppRail,
  FeatherAppRailNavItem,
  IconTextAnimate
} from "./../src";
import { reactive, ref } from "vue";

const labels = { skip: "Skip to main content" };
const content = ref("test");
const selectedId = ref("");
const app = reactive(App);

const clicked = async (e: Event) => {

  const target = e.target as HTMLElement;
  const item = target.closest(".feather-vertical-app-bar-item");

  if (item && !!item.id) {
    updateSelected(item.id);
  }
};

const updateSelected = (id: string) => {
  if (!!id) {
    selectedId.value = id;
  }
  console.log(selectedId);
};

const isSelected = (id: string) => {
  return selectedId.value === id;
};
</script>

<template>
  <section>
    <FeatherAppRail
      :labels="labels"
      :content="content"
    >
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
          id="AppOne"
          href="#/AppRail-Selected"
          :icon="app"
          title="App One"
          @click="clicked"
          :class="{ selected: isSelected('AppOne') }"
        />
        <FeatherAppRailNavItem
          id="AppTwo"
          href="#/AppRail-Selected"
          :icon="app"
          title="App Two"
          @click="clicked"
          :class="{ selected: isSelected('AppTwo') }"
        />
        <FeatherAppRailNavItem
          id="AppThree"
          href="#/AppRail-Selected"
          :icon="app"
          title="App Three"
          @click="clicked"
          :class="{ selected: isSelected('AppThree') }"
        />
        <FeatherAppRailNavHeader title="Settings" />
        <FeatherAppRailNavItem
          id="User"
          href="#/AppRail-Selected"
          :icon="app"
          title="User"
          @click="clicked"
          :class="{ selected: isSelected('User') }"
        />
      </template>
    </FeatherAppRail>
    <div id="test">Page contents: {{ selectedId }}</div>
  </section>
</template>

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
