<template>
  <FeatherList>
    <FeatherListHeader>Group A</FeatherListHeader>
    <FeatherListItem>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
    <FeatherListSeparator />
    <FeatherListHeader>Group B</FeatherListHeader>
    <FeatherListItem selected>Item 1</FeatherListItem>
    <FeatherListItem>Item 2</FeatherListItem>
  </FeatherList>
</template>

<script>
import * as components from "./../src";
export default {
  components: {
    ...components,
  },
};
</script>
