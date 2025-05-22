<template>
  <FeatherCard :title="props.cardHeader" :subtitle="props.cardSubheader">
    <FeatherIcon
      class="error-icon"
      :icon="Error"
    />
    {{ props.cardContent }}
  </FeatherCard>
</template>

<script setup lang="ts">
import { FeatherCard } from "@featherds/card";
import { FeatherIcon } from "@featherds/icon";
import Error from "@featherds/icon/notification/Error";

const props = withDefaults(
  defineProps<{
    cardHeader: string;
    cardSubheader: string;
    cardContent: string;
  }>(),
  {
    cardHeader: "My Custom Component",
    cardSubheader: "This is a custom component.",
    cardContent: "This is content from the custom componentProps.",
  }
);
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables.scss" as vars;
:deep(.feather-card-content) {
  display: flex;
  flex-direction: row;
  gap: 1em;
  .error-icon {
    width: 2em;
    height: 2em;
    fill: var(vars.$error);
  }
}
</style>
