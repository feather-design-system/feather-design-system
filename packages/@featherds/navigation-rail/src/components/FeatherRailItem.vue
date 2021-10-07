<template>
  <FeatherListItem :href="href">
    <template v-slot:icon>
      <FeatherIcon v-if="icon" :icon="icon" :title="title" />
    </template>
    <slot>{{ title }}</slot>
  </FeatherListItem>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherListItem } from "@featherds/list";
export default {
  props: {
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
  },
  components: {
    FeatherIcon,
    FeatherListItem,
  },
};
</script>
