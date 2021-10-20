<template>
  <FeatherList>
    <FeatherListHeader>Group A</FeatherListHeader>
    <FeatherListItem>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
    <FeatherListSeparator />
    <FeatherListHeader>Group B</FeatherListHeader>
    <FeatherListItem selected>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
    <FeatherListSwitch v-model="checked">Switch Option</FeatherListSwitch>
  </FeatherList>
</template>
<script>
import {
  FeatherListItem,
  FeatherListSwitch,
  FeatherListHeader,
  FeatherListSeparator,
  FeatherList,
} from "@featherds/list";
export default {
  data() {
    return {
      checked: false,
    };
  },
  components: {
    FeatherListItem,
    FeatherListSwitch,
    FeatherListHeader,
    FeatherListSeparator,
    FeatherList,
  },
};
</script>
