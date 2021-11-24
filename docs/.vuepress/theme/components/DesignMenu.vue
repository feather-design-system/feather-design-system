<template>
  <NavMenu class="nav-links">
    <template v-for="group in groups" :key="group.name">
      <FeatherListHeader>{{ group.name }}</FeatherListHeader>
      <template v-for="item in group.items" :key="item.name">
        <FeatherListItem :href="item.url" :selected="isCurrent(item.url)">{{
          item.name
        }}</FeatherListItem>
      </template>
      <FeatherListSeparator />
    </template>
  </NavMenu>
</template>
<script>
import {
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator,
} from "@featherds/list";
import NavMenu from "./NavMenu";

export default {
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
            {
              name: "Elevation",
              url: this.$withBase("/Foundation/Styles/Elevation/"),
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
    NavMenu,
    FeatherListItem,
    FeatherListHeader,
    FeatherListSeparator,
  },
};
</script>
