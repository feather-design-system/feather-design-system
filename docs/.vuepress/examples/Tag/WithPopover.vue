<template>
  <div>
    <FeatherTagList class="tags">
      <FeatherPopover
        :placement="placement"
        :pointer-alignment="pointerAlignment"
      >
        <template #default>
          {{ popoverText }}
        </template>
        <template #trigger="{ attrs, on }">
          <FeatherTag type="ready" v-bind="attrs" v-on="on" />
        </template>
      </FeatherPopover>
    </FeatherTagList>
    <p class="tag-demo-caption-text">
      The popover is triggered on tag click and shows the message
    </p>
    <pre class="tag-demo-caption-text">
      {{ popoverText }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { FeatherTag, FeatherTagList } from "@featherds/tag";
import {
  FeatherPopover,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/popover";

const placement: PopoverPlacement = PopoverPlacement.top;
const pointerAlignment: PointerAlignment = PointerAlignment.left;

const popoverText = `
This node is ready for action.
NODE: BOS-DB-002
STATUS: Ready
`;
</script>

<style lang="scss" scoped>
@use "@featherds/styles/mixins/typography" as typo;
.tag-demo-caption-text {
  @include typo.caption();
  font-style: italic;
}
</style>
