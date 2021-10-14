<template>
  <div class="chip-1-example">
    <h4>Normal</h4>
    <FeatherChipList label="List of test chips, one is disabled">
      <FeatherChip>Test zero</FeatherChip>
      <FeatherChip>Test one</FeatherChip>
      <FeatherChip>Test two</FeatherChip>
      <FeatherChip disabled>Test three</FeatherChip>
    </FeatherChipList>
    <FeatherChipList label="Second List of test chips with icons">
      <FeatherChip>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Test
        four</FeatherChip
      >
      <FeatherChip>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Test
        five</FeatherChip
      >
      <FeatherChip>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Test
        six</FeatherChip
      >
      <FeatherChip disabled>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Test
        seven</FeatherChip
      >
    </FeatherChipList>

    <h4>Condensed</h4>
    <FeatherChipList condensed label="Random list for condensed visual testing">
      <FeatherChip>Test zero</FeatherChip>
      <FeatherChip>Test one</FeatherChip>
      <FeatherChip>Test two</FeatherChip>
      <FeatherChip>Test three</FeatherChip>
    </FeatherChipList>
  </div>
</template>
<script>
import map from "@featherds/icon/action/Location";
import { FeatherIcon } from "@featherds/icon";
import * as components from "@featherds/chips";
export default {
  data() {
    return {
      map: map,
    };
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
<style lang="scss">
.chip-1-example div.chip-list:first-of-type {
  max-width: 300px;
}
</style>
