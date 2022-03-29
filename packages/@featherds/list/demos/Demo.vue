<template>
  <FeatherList>
    <FeatherListHeader>Group A</FeatherListHeader>
    <FeatherListItem>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
    <FeatherListSeparator />
    <FeatherListHeader>Group B</FeatherListHeader>
    <FeatherListItem selected>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
    <FeatherListSwitch v-model="checked">Item 2</FeatherListSwitch>
  </FeatherList>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  data: () => {
    return { checked: true };
  },
  components: {
    ...components,
  },
});
</script>
