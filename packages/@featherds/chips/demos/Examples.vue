<template>
  <div>
    <h1>Locations</h1>
    <FeatherChipList label="List of locations">
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Boston
      </FeatherChip>
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Belfast
      </FeatherChip>
    </FeatherChipList>

    <h1>Interactive List (click and delete)</h1>
    <FeatherChipList label="List of active locations">
      <FeatherChip
        v-for="loc in locations2"
        :key="loc"
        :value="loc"
        :disabled="loc === 'Madrid'"
        @click="onClick"
        @delete="onDelete(loc)"
      >
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        {{ loc }}
      </FeatherChip>
    </FeatherChipList>

    <h1>Interactive List (just delete)</h1>
    <FeatherChipList label="List of active locations">
      <FeatherChip
        v-for="loc in locations3"
        :key="loc"
        :value="loc"
        :disabled="loc === 'Madrid'"
        @delete="onDelete3(loc)"
      >
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        {{ loc }}
      </FeatherChip>
    </FeatherChipList>

    <h1>Radio group</h1>
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
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        {{ loc }}
      </FeatherChip>
    </FeatherChipList>
  </div>
</template>
<script>
import map from "@featherds/icon/action/Location";
import { FeatherIcon } from "@featherds/icon";
import * as components from "./../src";
import { markRaw } from "vue";
export default {
  data() {
    return {
      map: markRaw(map),
      locations: ["Belfast", "Boston", "Madrid", "Moscow"],
      locations2: ["Belfast", "Boston", "Madrid", "Moscow"],
      locations3: ["Belfast", "Boston", "Madrid", "Moscow"],
      selected: undefined,
    };
  },
  methods: {
    onDelete(item) {
      const index = this.locations2.indexOf(item);
      this.locations2.splice(index, 1);
    },
    onDelete3(item) {
      const index = this.locations3.indexOf(item);
      this.locations3.splice(index, 1);
    },
    onClick() {
      alert("You clicked a location");
    },
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
<style lang="scss">
div.chip-list:first-of-type {
  max-width: 18.75rem;
}
</style>
