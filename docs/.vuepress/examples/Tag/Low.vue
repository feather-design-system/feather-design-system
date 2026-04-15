<template>
  <div>
    <FeatherTagList class="tags">
      <FeatherTag type="success" :emphasis="tagEmphasis" />
      <FeatherTag type="normal" :emphasis="tagEmphasis" />
      <FeatherTag type="error" :emphasis="tagEmphasis" />
      <FeatherTag type="critical" :emphasis="tagEmphasis" />
      <FeatherTag type="major" :emphasis="tagEmphasis" />
      <FeatherTag type="minor" :emphasis="tagEmphasis" />
      <FeatherTag type="warning" :emphasis="tagEmphasis" />
      <FeatherTag type="indeterminate" :emphasis="tagEmphasis" />
      <FeatherTag type="cleared" :emphasis="tagEmphasis" />
      <FeatherTag type="ready" :emphasis="tagEmphasis" />
      <FeatherTag type="info" :emphasis="tagEmphasis" />
      <FeatherTag type="unknown" :emphasis="tagEmphasis" />
      <FeatherTag type="allocated" :emphasis="tagEmphasis" />
      <FeatherTag type="up" :emphasis="tagEmphasis" />
      <FeatherTag type="down" :emphasis="tagEmphasis" />
      <FeatherTag type="initializing" :emphasis="tagEmphasis" />
      <FeatherTag type="expired" :emphasis="tagEmphasis" />
      <FeatherTag type="online" :emphasis="tagEmphasis" />
      <FeatherTag type="offline" :emphasis="tagEmphasis" />
    </FeatherTagList>
  </div>
</template>

<script setup lang="ts">
import {FeatherTag, FeatherTagList, type TagEmphasis} from "@featherds/tag";

const tagEmphasis: TagEmphasis = "low";

</script>

<style scoped></style>
