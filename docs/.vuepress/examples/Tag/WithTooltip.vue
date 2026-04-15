<template>
  <div>
    <FeatherTagList class="tags">
      <FeatherTooltip
        title="Node is ready."
        v-slot="{ attrs, on }"
        :placement="placement"
        :pointer-alignment="pointerAlignment"
      >
        <FeatherTag type="ready" v-bind="attrs" v-on="on" />
      </FeatherTooltip>
    </FeatherTagList>
    <p class="tag-demo-caption-text">
      The tooltip is triggered on tag hover and shows the message "Node is
      ready."
    </p>
  </div>
</template>

<script setup lang="ts">
import { FeatherTag, FeatherTagList } from "@featherds/tag";
import {
  FeatherTooltip,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/tooltip";

const placement: PopoverPlacement = PopoverPlacement.top;
const pointerAlignment: PointerAlignment = PointerAlignment.left;
</script>

<style lang="scss" scoped>
@use "@featherds/styles/mixins/typography" as typo;
.tag-demo-caption-text {
  @include typo.caption();
  font-style: italic;
}
</style>
