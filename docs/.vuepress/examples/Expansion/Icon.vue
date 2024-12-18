<template>
  <div>
    <FeatherExpansionPanel :title="title1">
      <template #icon>
        <FeatherIcon :icon="FeedbackAlt" />
      </template>
      <ul>
        <li>Optional icon slot now available for Expansion Panel</li>
      </ul>
    </FeatherExpansionPanel>
    <FeatherExpansionPanel :title="title2" :icon="iconInfo">
      <ul>
        <li>Optional icon attribute now available for Expansion Panel</li>
      </ul>
    </FeatherExpansionPanel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherIcon } from "@featherds/icon";
import FeedbackAlt from "@featherds/icon/action/FeedbackAlt";
import Info from "@featherds/icon/action/Info";

const title1 = ref("New Optional Slot Feature");
const title2 = ref("Or Optional Attribute Feature");

const iconInfo = Info as typeof FeatherIcon;
// const iconInfo = ref(Info as typeof FeatherIcon);

</script>

<style scoped></style>
