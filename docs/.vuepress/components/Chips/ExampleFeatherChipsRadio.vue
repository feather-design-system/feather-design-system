<template>
  <div>
    <h4>Radio group</h4>
    <FeatherChipList
      mode="radio"
      v-model="selected"
      label="Please select your preferred location"
    >
      <FeatherChip
        v-for="(loc, index) in locations"
        :key="loc"
        :value="loc"
        :disabled="index === 2"
      >
        <template v-slot:icon> <FeatherIcon :icon="map" /> </template>{{ loc }}
      </FeatherChip>
    </FeatherChipList>
  </div>
</template>
<script>
import map from "@featherds/icon/actions/Location";
import { FeatherIcon } from "@featherds/icon";
import * as components from "@featherds/chips";
import { markRaw } from "vue";
export default {
  data() {
    return {
      map: markRaw(map),
      locations: ["Belfast", "Boston", "Madrid", "Moscow"],
      selected: undefined,
    };
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
