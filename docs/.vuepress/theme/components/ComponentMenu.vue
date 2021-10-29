<template>
  <div class="nav-list-container">
    <div class="nav-list">
      <div class="fake-header"><a href="/">FEATHER DS</a></div>
      <FeatherList class="nav-links">
        <FeatherListItem
          :selected="isCurrent($withBase('/Components/GettingStarted'))"
          :href="$withBase('/Components/GettingStarted')"
          focus-first
          >Getting Started</FeatherListItem
        >
        <FeatherListSeparator />

        <FeatherListItem
          :selected="isCurrent($withBase('/Components/'))"
          :href="$withBase('/Components/')"
          first-focus
          >All Components</FeatherListItem
        >

        <template v-for="item in items" :key="item.name">
          <FeatherListItem :href="item.url" :selected="isCurrent(item.url)">{{
            item.name
          }}</FeatherListItem>
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
      items: [
        { name: "Themes", url: this.$withBase("/Components/Themes/") },
        {
          name: "Elevation",
          url: this.$withBase("/Components/Elevation/"),
        },
        {
          name: "Typography",
          url: this.$withBase("/Components/Typography/"),
        },
        {
          name: "Variables",
          url: this.$withBase("/Components/Variables/"),
        },

        {
          name: "App Layout",
          url: this.$withBase("/Components/AppLayout/"),
        },
        { name: "App Bar", url: this.$withBase("/Components/AppBar/") },
        {
          name: "Navigation Rail",
          url: this.$withBase("/Components/NavigationRail/"),
        },
        { name: "Grid", url: this.$withBase("/Components/Grid/") },
        { name: "Footer", url: this.$withBase("/Components/Footer/") },

        { name: "Button", url: this.$withBase("/Components/Button/") },
        { name: "Input", url: this.$withBase("/Components/Input/") },
        { name: "Textarea", url: this.$withBase("/Components/Textarea/") },
        { name: "Checkbox", url: this.$withBase("/Components/Checkbox/") },
        { name: "Radio Button", url: this.$withBase("/Components/Radio/") },
        {
          name: "Autocomplete",
          url: this.$withBase("/Components/Autocomplete/"),
        },
        {
          name: "Date Input",
          url: this.$withBase("/Components/DateInput/"),
        },
        {
          name: "Protected Input",
          url: this.$withBase("/Components/ProtectedInput/"),
        },
        { name: "Select", url: this.$withBase("/Components/Select/") },

        { name: "Drawer", url: this.$withBase("/Components/Drawer/") },
        { name: "Dialog", url: this.$withBase("/Components/Dialog/") },
        {
          name: "Dropdown",
          url: this.$withBase("/Components/Dropdown/"),
        },
        { name: "Mega Menu", url: this.$withBase("/Components/Megamenu/") },

        { name: "Table", url: this.$withBase("/Components/Table/") },
        {
          name: "Pagination",
          url: this.$withBase("/Components/Pagination/"),
        },
        {
          name: "Pdf Viewer",
          url: this.$withBase("/Components/PdfViewer/"),
        },
        { name: "Chips", url: this.$withBase("/Components/Chips/") },

        { name: "Tabs", url: this.$withBase("/Components/Tabs/") },
        {
          name: "List",
          url: this.$withBase("/Components/List/"),
        },
        {
          name: "Expansion",
          url: this.$withBase("/Components/Expansion/"),
        },

        { name: "Progress", url: this.$withBase("/Components/Progress/") },
        { name: "Icon", url: this.$withBase("/Components/Icon/") },
        {
          name: "Icon Button",
          url: this.$withBase("/Components/IconButton/"),
        },

        { name: "Badge", url: this.$withBase("/Components/Badge/") },
      ].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }),
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
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/typography";
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
  }
}
</style>
