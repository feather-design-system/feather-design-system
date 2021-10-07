<template>
  <section>
    <FeatherAppBar :labels="labels" :content="content" full-width>
    </FeatherAppBar>
    <div class="main-content">
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
      <div class="feather-container">
        <div class="content">Page contents</div>
      </div>
    </div>
  </section>
</template>
<script>
import * as components from "./../src";
import { FeatherAppBar, FeatherAppBarLink } from "@featherds/app-bar";
import App from "@featherds/icon/medical/LineOfBusiness";
import Account from "@featherds/icon/actions/Account";
import { FeatherIcon } from "@featherds/icon";
import { markRaw } from "vue";

export default {
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
    };
  },
  computed: {
    app() {
      return markRaw(App);
    },
    account() {
      return markRaw(Account);
    },
  },
  components: {
    ...components,
    FeatherIcon,
    FeatherAppBar,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
#test {
  height: 120vh;
}
.main-content {
  display: flex;
}
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
