<template>
  <FeatherNavigationRail>
    <template v-slot:header>
      <div class="user">
        <FeatherIcon :icon="account" class="user-icon" />
        <div>
          <p class="sub">Signed in as</p>
          <p class="user-name">Rik the Great</p>
        </div>
      </div>
    </template>
    <template v-slot:main>
      <FeatherRailItem
        href="#/AppBar-RailFullscreen"
        :icon="app"
        title="App One"
      />
      <FeatherRailItem
        href="#/AppBar-RailFullscreen"
        :icon="app"
        title="App Two"
      />
      <FeatherRailItem
        href="#/AppBar-RailFullscreen"
        :icon="app"
        title="App Three"
      />
    </template>
    <FeatherRailGroup label="Help Navigation">
      <FeatherRailItem
        href="#/AppBar-RailFullscreen"
        :icon="app"
        title="Feedback"
      />
      <FeatherRailItem
        href="#/AppBar-RailFullscreen"
        :icon="app"
        title="Sign out"
      />
    </FeatherRailGroup>
  </FeatherNavigationRail>
</template>
<script lang="ts">
import {
  FeatherNavigationRail,
  FeatherRailGroup,
  FeatherRailItem,
} from "@featherds/navigation-rail";
import App from "@featherds/icon/medical/Hospital";
import Account from "@featherds/icon/action/AccountCircle";
import { FeatherIcon } from "@featherds/icon";
import { defineComponent, markRaw } from "vue";

export default defineComponent({
  computed: {
    app() {
      return markRaw(App);
    },
    account() {
      return markRaw(Account);
    },
  },
  components: {
    FeatherNavigationRail,
    FeatherRailGroup,
    FeatherRailItem,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";

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
