<template>
  <section class="tooltips-demo">
    <div class="configuration">
      <div>
        Placement
        <select name="placement" id="placement" v-model="placement">
          <option v-for="item in placements" :key="item">{{ item }}</option>
        </select>
      </div>
      <div>
        Pointer Alignment
        <select name="alignment" id="alignment" v-model="alignment">
          <option v-for="item in alignments" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
    <FeatherTooltip
      title="Example tooltip"
      v-slot="{ attrs, on }"
      :pointer-alignment="alignment"
      :placement="placement"
    >
      <FeatherButton secondary v-bind="attrs" v-on="on"
        >Find out more</FeatherButton
      >
    </FeatherTooltip>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
import { PointerAlignment, PopoverPlacement } from "@featherds/popover";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const placement = ref(PopoverPlacement.top);
    const placements = [
      PopoverPlacement.top,
      PopoverPlacement.bottom,
      PopoverPlacement.left,
      PopoverPlacement.right,
    ];
    const alignment = ref(PointerAlignment.center);
    const alignments = [
      PointerAlignment.center,
      PointerAlignment.left,
      PointerAlignment.right,
    ];

    return { placement, placements, alignment, alignments };
  },
  components: {
    ...components,
    FeatherButton,
  },
});
</script>
<style lang="scss" scoped>
.tooltips-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  .configuration {
    margin-bottom: 24px;
  }
}
</style>
