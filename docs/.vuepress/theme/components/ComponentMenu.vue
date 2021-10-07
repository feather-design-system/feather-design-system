<template>
  <div class="fake-rail">
    <aside class="nav-rail">
      <div class="rail-title">Components</div>
      <FeatherList class="rail-list">
        <FeatherListItem
          :selected="isCurrent($withBase('/Components/'))"
          :href="$withBase('/Components/')"
          >Getting Started</FeatherListItem
        >
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
    </aside>
  </div>
</template>
<script>
import {
  FeatherList,
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator
} from "@featherds/list";
export default {
  data() {
    return {
      groups: [
        {
          name: "Style",
          items: [
            { name: "Themes", url: this.$withBase("/Components/Themes/") },
            {
              name: "Elevation",
              url: this.$withBase("/Components/Elevation/"),
            },
            {
              name: "Typography",
              url: this.$withBase("/Components/Typography/"),
            },{
              name: "Variables",
              url: this.$withBase("/Components/Variables/"),
            },
          ],
        },
        {
          name: "Layout",
          items: [
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
          ],
        },
        {
          name: "Form",
          items: [
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
          ],
        },
        {
          name: "Overlay",
          items: [
            { name: "Drawer", url: this.$withBase("/Components/Drawer/") },
            { name: "Dialog", url: this.$withBase("/Components/Dialog/") },
            {
              name: "Dropdown",
              url: this.$withBase("/Components/Dropdown/"),
            },
            { name: "Mega Menu", url: this.$withBase("/Components/Megamenu/") },
          ],
        },
        {
          name: "Data Display",
          items: [
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
          ],
        },
        {
          name: "Display",
          items: [
            { name: "Tabs", url: this.$withBase("/Components/Table/") },
            {
              name: "List",
              url: this.$withBase("/Components/List/"),
            },
            {
              name: "Expansion",
              url: this.$withBase("/Components/PdfViewer/"),
            },
          ],
        },
        {
          name: "Visual",
          items: [
            { name: "Progress", url: this.$withBase("/Components/Progress/") },
            { name: "Icon", url: this.$withBase("/Components/Icon/") },
            { name: "Icon Button", url: this.$withBase("/Components/IconButton/") },

            { name: "Badge", url: this.$withBase("/Components/Badge/") },
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
    FeatherListSeparator
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/flex";
@import "~@featherds/styles/themes/utils";
$width: 264px;
.nav-rail {
  transition: width 280ms ease-in-out;
  position: fixed;
  width: $width;
  left: 0;
  top: 60px;
  height: calc(100vh - 60px);
  background: var($background);
  color: var($primary-text-on-surface);
  overflow: auto;
}
.fake-rail {
  width: $width;
  height: calc(100vh - 60px);
}
.rail-title {
  border-bottom: 1px solid var($border-on-surface);
  padding: 8px 6px 8px 12px;
  @include headline4;
}
.rail-list{
  overflow-y: hidden;
}
</style>
