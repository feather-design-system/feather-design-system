<template>
  <FeatherDropdown right>
    <template v-slot:trigger>
      <FeatherButton link href="#" menu-trigger icon="More Options">
        <FeatherIcon :icon="menu" />
      </FeatherButton>
    </template>
    <FeatherDropdownItem>
      <template v-slot:icon><FeatherIcon :icon="search" /></template>
      View Records
    </FeatherDropdownItem>
    <FeatherDropdownItem disabled>
      <template v-slot:icon><FeatherIcon :icon="edit" /></template>
      Edit
    </FeatherDropdownItem>
  </FeatherDropdown>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import { FeatherIcon } from "@featherds/icon";
import { markRaw } from "vue";

import MenuIcon from "@featherds/icon/navigation/MoreHoriz";
import SearchIcon from "@featherds/icon/actions/Search";
import EditIcon from "@featherds/icon/actions/Download";
export default {
  data() {
    return {
      menu: markRaw(MenuIcon),
      search: markRaw(SearchIcon),
      edit: markRaw(EditIcon),
    };
  },
  components: {
    FeatherDropdownItem,
    FeatherDropdown,
    FeatherButton,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
section {
  text-align: center;
}
</style>
