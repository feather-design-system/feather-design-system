<template>
  <FeatherDropdown>
    <template v-slot:trigger="{ attrs, on }">
      <FeatherButton link href="#" v-bind="attrs" v-on="on" icon="More Options">
        <FeatherIcon :icon="menu" />
      </FeatherButton>
    </template>
    <FeatherDropdownItem>
      <template v-slot:icon><FeatherIcon :icon="search" /></template>
      View Records
    </FeatherDropdownItem>
    <FeatherDropdownItem disabled>
      <template v-slot:icon><FeatherIcon :icon="edit" /></template>
      Download
    </FeatherDropdownItem>
  </FeatherDropdown>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import { FeatherIcon } from "@featherds/icon";
import { markRaw } from "vue";

import MenuIcon from "@featherds/icon/navigation/MoreHoriz";
import SearchIcon from "@featherds/icon/action/Search";
import EditIcon from "@featherds/icon/action/DownloadFile";
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
