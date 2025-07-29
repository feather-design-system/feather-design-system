<template>
  <div class="wrapper">
    <FeatherDock
      id="my-dock-full-main"
      :pushedSelector="'.dock-demo-full-layout'"
      @update:dock-expanded="requestDockExpansion"
      @update:dock-collapsed="console.log('dock collapsed')"
    >
      <template #docked>
        <FeatherIcon
          class="dock-icon"
          :icon="markRaw(Certificate)"
          @click="requestDockExpansion"
        />
      </template>
    </FeatherDock>
    <div class="dock-demo-full-layout">
      <header class="header">
        <h1>Website Header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </header>

      <div class="content-wrapper">
        <aside class="aside">
          <h3>Sidebar</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul>
            <li>Navigation Item 1</li>
            <li>Navigation Item 2</li>
            <li>Navigation Item 3</li>
          </ul>
        </aside>

        <main class="main">
          <h2>Main Content Area</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </main>
      </div>

      <footer class="footer">
        <p>
          &copy; 2025 Feather Design System. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import Certificate from "@featherds/icon/communication/Certificate";
import { FeatherIcon } from "@featherds/icon";
import { FeatherDock } from "@featherds/dock";

function requestDockExpansion() {
  console.log("dock expansion requested");
}
</script>

<style lang="scss">
.feather-styles:has(.dock-demo-full-layout) {
  background-color: rgba(0, 34, 238, 0.12);
  .feather-container {
    max-width: 100vw;
    margin: 0;
  }
}
#my-dock-full-main {
  // for demo purposes, this the height of the theme picker select container.
  --feather-dock-header-offset: 44px;
}
@media (min-width: 90.0625rem) {
  .feather-styles:has(.dock-demo-full-layout) {
    .feather-container {
      padding-right: 0;
      padding-left: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;

.dock-demo-full-layout {
  // 44px is the height of the theme changer in demos
  min-height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  padding-inline: 1rem;
}

.dock-icon {
  font-size: 1.75em;
}

.header {
  background-color: utils.alpha(vars.$categorical10, 0.4);
  padding: 2rem;
}

.content-wrapper {
  display: flex;
  flex: 1;
  min-height: 0;
}

.aside {
  background-color: utils.alpha(vars.$categorical10, 0.2);
  padding: 2rem;
  width: 250px;
  flex-shrink: 0;
}

.aside h3 {
  margin: 0 0 1rem 0;
}

.aside ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.aside li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #bdc3c7;
}

.main {
  background-color: var(vars.$surface);
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

.main h2 {
  margin: 0 0 1rem 0;
}

.main p {
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.footer {
  background-color: utils.alpha(vars.$categorical10, 0.1);
  padding: 1.5rem 2rem;
  text-align: center;
}

.footer p {
  margin: 0;
}
</style>
