<template>
  <div>
    <FeatherTagList class="tags">
      <FeatherTooltip
        v-for="item in cell"
        :title="item.name"
        v-slot="{ attrs, on }"
        :placement="placement"
        :pointer-alignment="pointerAlignment"
      >
        <FeatherTag
          :type="item.type"
          :text="item.name"
          :emphasis="emphasis"
          v-bind="attrs"
          v-on="on"
        />
      </FeatherTooltip>
    </FeatherTagList>
    <p class="tag-demo-caption-text">
      The max width of the tag is 2em based upon current font size or 18ch.
      The tag will truncate the text if it exceeds the max width.
      Combine with FeatherTooltip to show the full text on hover.
    </p>
  </div>
</template>

<script setup lang="ts">
import { FeatherTag, FeatherTagList, TagEmphasis } from "@featherds/tag";
import {
  FeatherTooltip,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/tooltip";

const placement: PopoverPlacement = PopoverPlacement.top;
const pointerAlignment: PointerAlignment = PointerAlignment.left;

const emphasis: TagEmphasis = "high";

type CellComponent = {
  id: string;
  name: string;
  type: string;
};

const cell: CellComponent[] = [
  {
    id: "1",
    name: "Plasma Membrane",
    type: "ready",
  },
  {
    id: "2",
    name: "Cytoplasm",
    type: "ready",
  },
  {
    id: "3",
    name: "Deoxyribonucleic Acid",
    type: "offline",
  },
  {
    id: "4",
    name: "Ribosome",
    type: "error",
  },
  {
    id: "5",
    name: "Nucleus",
    type: "ready",
  },
  {
    id: "6",
    name: "Endoplasmic Reticulum",
    type: "success",
  },
  {
    id: "7",
    name: "Golgi Apparatus",
    type: "down",
  },
  {
    id: "8",
    name: "Mitochondria",
    type: "ready",
  },
];
</script>

<style lang="scss" scoped>
@use "@featherds/styles/mixins/typography" as typo;
.tag-demo-caption-text {
  @include typo.caption();
  font-style: italic;
}
</style>
