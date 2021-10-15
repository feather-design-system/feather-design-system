<template>
  <div>
    <h4>Standalone</h4>
    <FeatherChipList
      mode="single"
      label="This is a description for a single selected element"
    >
      <FeatherChip>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Boston
      </FeatherChip>
    </FeatherChipList>

    <FeatherChipList
      mode="single"
      label="This is a description for a second, single selected element"
    >
      <FeatherChip>
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>Belfast
      </FeatherChip>
    </FeatherChipList>
  </div>
</template>
<script>
import map from "@featherds/icon/actions/Location";
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
