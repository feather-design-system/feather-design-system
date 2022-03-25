<template>
  <div>
    <h1>Normal list wrapping followed by full width</h1>
    <FeatherChipList
      label="List of test chips, some you can delete, one is disabled"
    >
      <FeatherChip @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Portland
      </FeatherChip>
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Test one
      </FeatherChip>
      <FeatherChip @delete="onDelete">Test two</FeatherChip>
      <FeatherChip @delete="onDelete" disabled>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Test three
      </FeatherChip>
    </FeatherChipList>
    <FeatherChipList label="Second List of test chips, some you can delete">
      <FeatherChip @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Test four
      </FeatherChip>
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Test five
      </FeatherChip>
      <FeatherChip @delete="onDelete">Test six</FeatherChip>
      <FeatherChip>Test seven</FeatherChip>
    </FeatherChipList>

    <h1>Standalone</h1>
    <FeatherChipList
      mode="single"
      label="This is a description for a single selected element"
    >
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Boston
      </FeatherChip>
    </FeatherChipList>

    <FeatherChipList
      mode="single"
      label="This is a description for a second, single selected element"
    >
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Belfast
      </FeatherChip>
    </FeatherChipList>

    <h1>Clickable group</h1>
    <FeatherChipList label="List of active locations">
      <FeatherChip @click="onClick" @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Boston
      </FeatherChip>
      <FeatherChip @click="onClick" @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Belfast
      </FeatherChip>
      <FeatherChip @click="onClick" @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Madrid
      </FeatherChip>
      <FeatherChip @click="onClick" @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Moscow
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

    <h1>Condensed</h1>
    <FeatherChipList condensed label="Random list for condensed visual testing">
      <FeatherChip @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Portland
      </FeatherChip>
      <FeatherChip>
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Test one
      </FeatherChip>
      <FeatherChip @delete="onDelete">Test two</FeatherChip>
      <FeatherChip disabled>Test three</FeatherChip>
    </FeatherChipList>

    <h1>Truncation</h1>
    <FeatherChipList label="List of test chips, one is super long">
      <FeatherChip @delete="onDelete">
        <template v-slot:icon>
          <FeatherIcon :icon="map" />
        </template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </FeatherChip>
      <FeatherChip>Test one</FeatherChip>
      <FeatherChip>Test two</FeatherChip>
      <FeatherChip disabled>Test three</FeatherChip>
    </FeatherChipList>
  </div>
</template>
<script lang="ts">
import map from "@featherds/icon/action/Location";
import { FeatherIcon } from "@featherds/icon";
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      map: map,
      locations: ["Belfast", "Boston", "Madrid", "Moscow"],
      selected: undefined,
    };
  },
  methods: {
    onDelete() {
      console.log("Deleted");
    },
    onClick() {
      console.log("Clicked");
    },
  },
  components: {
    ...components,
    FeatherIcon,
  },
});
</script>
<style lang="scss">
div.chip-list:first-of-type {
  max-width: 18.75rem;
}
</style>
