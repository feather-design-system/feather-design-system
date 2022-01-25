<template>
  <div class="nav-list-container">
    <div class="nav-list">
      <div class="fake-header">
        <a href="/">{{ title }}</a>
      </div>
      <FeatherList class="nav-links">
        <template v-for="group in groups" :key="group.name">
          <FeatherListHeader>{{ group.name }}</FeatherListHeader>
          <template v-for="item in group.items" :key="item.name">
            <FeatherListItem
              :href="$withBase(item.url)"
              :selected="isCurrent($withBase(item.url))"
              >{{ item.name }}</FeatherListItem
            >
          </template>
          <FeatherListSeparator />
        </template>
      </FeatherList>
    </div>
  </div>
</template>
<script>
import { inject, toRef, computed } from "vue";
import {
  FeatherList,
  FeatherListHeader,
  FeatherListItem,
  FeatherListSeparator,
} from "@featherds/list";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
import { useSiteLocaleData } from "@vuepress/client";
export default {
  props: {
    menu: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const register = inject("feather-app-layout-expanded", false);
    if (register) {
      register();
    }

    const menu = toRef(props, "menu");
    const title = computed(() => useSiteLocaleData().value.title);
    const groups = computed(() => useThemeLocaleData().value.menus[menu.value]);

    return { groups, title };
  },
  methods: {
    isCurrent(url) {
      return this.$router.currentRoute.value.path === url;
    },
  },

  components: {
    FeatherList,
    FeatherListHeader,
    FeatherListItem,
    FeatherListSeparator,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
$width: 16.5rem;
.fake-header {
  display: flex;
  align-items: center;
  height: var($header-height);
  padding-left: 1rem;
  flex: none;
  border-bottom: 1px solid var($border-on-surface);
  a {
    @include headline4;
    color: var($primary-text-on-surface);
    &:hover,
    &:visited,
    &:active {
      color: var($primary-text-on-surface);
    }
  }
}
.nav-list-container {
  display: flex;
  width: $width;
}

.nav-list {
  height: calc(100vh);
  background: var($background);
  color: var($primary-text-on-surface);
  @include elevation(2);
  position: fixed;
  width: $width;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  .nav-links {
    overflow-y: auto;
    flex: 1;
    :deep(.feather-list-item-text) {
      @include body-large;
    }
    :deep(.feather-list-item) {
      height: 3rem !important;
    }
  }
}
</style>
