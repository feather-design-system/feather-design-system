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
<script>
import {
  FeatherNavigationRail,
  FeatherRailGroup,
  FeatherRailItem,
} from "@featherds/navigation-rail";
import App from "@featherds/icon/medical/Hospital";
import Account from "@featherds/icon/action/AccountCircle";
import { FeatherIcon } from "@featherds/icon";
import { markRaw } from "vue";

export default {
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
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";

.user {
  display: flex;
  align-items: center;

  .user-icon {
    height: 32px;
    width: 32px;
    color: var($primary);
    margin-right: 16px;
  }
  .user-name {
    @include subtitle1;
  }
  .sub {
    @include caption;
  }
}
</style>
