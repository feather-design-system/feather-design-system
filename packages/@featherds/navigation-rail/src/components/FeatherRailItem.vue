<template>
  <FeatherListItem :href="href">
    <template v-slot:icon>
      <FeatherIcon v-if="hasIcon" :icon="icon" :title="title" />
    </template>
    <slot>{{ title }}</slot>
  </FeatherListItem>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherListItem } from "@featherds/list";
import { defineComponent } from "vue";
export const props = {
  icon: {
    type: Object,
  },
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
} as const;
export default defineComponent({
  props,
  computed: {
    hasIcon() {
      return !!this.icon;
    },
  },
  components: {
    FeatherIcon,
    FeatherListItem,
  },
});
</script>
