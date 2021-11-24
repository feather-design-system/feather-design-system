<template>
  <NavMenu class="nav-links">
    <FeatherListHeader>Guides</FeatherListHeader>
    <FeatherListItem
      :selected="isCurrent($withBase('/Components/GettingStarted'))"
      :href="$withBase('/Components/GettingStarted')"
      focus-first
      >Getting Started</FeatherListItem
    >
    <template v-for="item in guides" :key="item.name">
      <FeatherListItem :href="item.url" :selected="isCurrent(item.url)">{{
        item.name
      }}</FeatherListItem>
    </template>
    <FeatherListSeparator />

    <FeatherListHeader>Components</FeatherListHeader>

    <FeatherListItem
      :selected="isCurrent($withBase('/Components/'))"
      :href="$withBase('/Components/')"
      first-focus
      >Overview</FeatherListItem
    >

    <template v-for="item in items" :key="item.name">
      <FeatherListItem
        :href="$withBase(item.url)"
        :selected="isCurrent(item.url)"
        >{{ item.name }}</FeatherListItem
      >
    </template>
  </NavMenu>
</template>
<script>
import {
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator,
} from "@featherds/list";
import components from "./components";
import NavMenu from "./NavMenu";
export default {
  data() {
    return {
      guides: [
        { name: "Themes", url: this.$withBase("/Components/Themes/") },
        {
          name: "Typography",
          url: this.$withBase("/Components/Typography/"),
        },
        {
          name: "Variables",
          url: this.$withBase("/Components/Variables/"),
        },
      ].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }),
      items: components,
    };
  },
  methods: {
    isCurrent(url) {
      return this.$router.currentRoute.value.path === url;
    },
  },
  components: {
    FeatherListItem,
    FeatherListHeader,
    FeatherListSeparator,
    NavMenu,
  },
};
</script>
