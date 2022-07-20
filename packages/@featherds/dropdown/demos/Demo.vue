<template>
  <section>
    <div>
      <FeatherCheckbox v-model="right">Right Aligned</FeatherCheckbox>
      <FeatherCheckbox v-model="cover">Cover</FeatherCheckbox>
      <FeatherCheckbox v-model="standard">Standard</FeatherCheckbox>
      <FeatherCheckbox v-model="long">Long List</FeatherCheckbox>
    </div>
    <FeatherDropdown
      :right="right"
      :cover="cover"
      :standard="standard"
      id="first"
    >
      <template v-slot:trigger="{ attrs, on }">
        <FeatherButton
          link
          href="#"
          v-bind="attrs"
          v-on="on"
          icon="More Options"
          id="menu-button"
        >
          <FeatherIcon :icon="menu" />
        </FeatherButton>
      </template>
      <FeatherDropdownItem @click="log">
        <template v-slot:icon><FeatherIcon :icon="search" /></template>
        View Records Records</FeatherDropdownItem
      >
      <FeatherDropdownItem @click="log"
        ><template v-slot:icon><FeatherIcon :icon="edit" /></template
        >Download</FeatherDropdownItem
      >

      <template v-if="long">
        <FeatherDropdownItem v-for="item in items" :key="item" @click="log">
          <template v-slot:icon><FeatherIcon :icon="edit" /></template>Download
          {{ item }}</FeatherDropdownItem
        >
      </template>
      <FeatherDropdownItem :disabled="true"
        ><template v-slot:icon><FeatherIcon :icon="filter" /></template>
        Duplicate</FeatherDropdownItem
      >
    </FeatherDropdown>

    <FeatherDropdown :right="right" :cover="cover" :standard="standard">
      <template v-slot:trigger="{ attrs, on }">
        <FeatherButton
          link
          href="#"
          v-bind="attrs"
          v-on="on"
          icon="No Icons Options"
        >
          <FeatherIcon :icon="menu" />
        </FeatherButton>
      </template>
      <FeatherDropdownItem @click="log">
        View Records Records</FeatherDropdownItem
      >
      <FeatherDropdownItem @click="log">Download</FeatherDropdownItem>
      <template v-if="long">
        <FeatherDropdownItem v-for="item in items" :key="item" @click="log"
          >Download {{ item }}</FeatherDropdownItem
        >
      </template>
      <FeatherDropdownItem :disabled="true"> Duplicate</FeatherDropdownItem>
    </FeatherDropdown>

    <p>{{ logText }}</p>
  </section>
</template>
<script lang="ts">
import { FeatherButton } from "@featherds/button";
import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherIcon } from "@featherds/icon";
import SearchIcon from "@featherds/icon/action/Search";
import EditIcon from "@featherds/icon/action/DownloadFile";
import FilterIcon from "@featherds/icon/action/FilterAlt";
import MenuIcon from "@featherds/icon/navigation/MoreHoriz";
import * as components from "../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      logText: "",
      search: SearchIcon,
      edit: EditIcon,
      filter: FilterIcon,
      menu: MenuIcon,
      right: false,
      cover: false,
      standard: false,
      long: false,
    };
  },
  computed: {
    items() {
      if (this.long) {
        return [0, 1, 2, 3, 4, 5, 6];
      }
      return [];
    },
  },
  methods: {
    log(e: MouseEvent) {
      this.logText = (e.target as HTMLElement).innerText;
    },
  },
  components: {
    ...components,
    FeatherButton,
    FeatherIcon,
    FeatherCheckbox,
  },
});
</script>
<style lang="scss" scoped>
section {
  text-align: center;
}
</style>
