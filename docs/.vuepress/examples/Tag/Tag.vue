<template>
  <div>
    <FeatherTagList class="tags">
      <FeatherTag type="success" />
      <FeatherTag type="normal" />
      <FeatherTag type="error" />
      <FeatherTag type="critical" />
      <FeatherTag type="major" />
      <FeatherTag type="minor" />
      <FeatherTag type="warning" />
      <FeatherTag type="indeterminate" />
      <FeatherTag type="cleared" />
      <FeatherTag type="ready" />
      <FeatherTag type="info" />
      <FeatherTag type="unknown" />
      <FeatherTag type="allocated" />
      <FeatherTag type="up" />
      <FeatherTag type="down" />
      <FeatherTag type="initializing" />
      <FeatherTag type="expired" />
      <FeatherTag type="online" />
      <FeatherTag type="offline" />
    </FeatherTagList>
    <p class="tag-demo-caption-text">
      Tags default to medium emphasis
    </p>

  </div>
</template>

<script setup lang="ts">
import {FeatherTag, FeatherTagList} from "@featherds/tag";

</script>

<style lang="scss" scoped>
@use "@featherds/styles/mixins/typography" as typo;
.tag-demo-caption-text {
  @include typo.caption();
  font-style: italic;
}
</style>
