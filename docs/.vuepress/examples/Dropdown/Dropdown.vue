<template>
  <FeatherDropdown>
    <template v-slot:trigger="{ attrs, on }">
      <FeatherButton link href="#" v-bind="attrs" v-on="on" icon="More Options">
        <FeatherIcon :icon="menu" />
      </FeatherButton>
    </template>
    <FeatherDropdownItem> View Records</FeatherDropdownItem>
    <FeatherDropdownItem>Edit</FeatherDropdownItem>
  </FeatherDropdown>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import { FeatherIcon } from "@featherds/icon";
import { markRaw } from "vue";

import MenuIcon from "@featherds/icon/navigation/MoreHoriz";
export default {
  data() {
    return { menu: markRaw(MenuIcon) };
  },
  components: {
    FeatherDropdown,
    FeatherDropdownItem,
    FeatherButton,
    FeatherIcon,
  },
};
</script>
