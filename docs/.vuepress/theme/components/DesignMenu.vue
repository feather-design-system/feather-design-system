<template>
  <div class="nav-list-container">
    <div class="nav-list">
      <div class="fake-header"><a href="/">FEATHER DS</a></div>
      <FeatherList class="nav-links">
        <template v-for="group in groups" :key="group.name">
          <FeatherListHeader>{{ group.name }}</FeatherListHeader>
          <template v-for="item in group.items" :key="item.name">
            <FeatherListItem :href="item.url" :selected="isCurrent(item.url)">{{
              item.name
            }}</FeatherListItem>
          </template>
          <FeatherListSeparator />
        </template>
      </FeatherList>
    </div>
  </div>
</template>
<script>
import {
  FeatherList,
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator,
} from "@featherds/list";
import { inject } from "vue";

export default {
  setup() {
    const register = inject("feather-app-layout-expanded", false);
    if (register) {
      register();
    }
  },
  data() {
    return {
      groups: [
        {
          name: "Styles",
          items: [
            { name: "Color", url: this.$withBase("/Foundation/Styles/Color/") },
            {
              name: "Typography",
              url: this.$withBase("/Foundation/Styles/Typography/"),
            },
          ],
        },
      ],
    };
  },
  methods: {
    isCurrent(url) {
      return this.$router.currentRoute.value.path === url;
    },
  },
  components: {
    FeatherList,
    FeatherListItem,
    FeatherListHeader,
    FeatherListSeparator,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
$width: 264px;
.fake-header {
  display: flex;
  align-items: center;
  height: var($header-height);
  padding-left: 16px;
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
    :deep(.feather-list-item-text) {
      @include body-large;
    }
    :deep(.feather-list-item) {
      height: 48px !important;
    }
  }
}
</style>
